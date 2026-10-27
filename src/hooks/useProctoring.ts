import { useState, useEffect, useCallback, useRef } from 'react';
import { MAX_VIOLATIONS_ALLOWED } from '../utils/evaluation';

interface UseProctoringOptions {
  isActive: boolean;
  onDisqualified: (reason: string) => void;
  onViolationWarning?: (count: number, reason: string) => void;
}

export function useProctoring({
  isActive,
  onDisqualified,
  onViolationWarning,
}: UseProctoringOptions) {
  const [violationsCount, setViolationsCount] = useState<number>(0);
  const [violationLogs, setViolationLogs] = useState<string[]>([]);
  const [lastWarning, setLastWarning] = useState<string | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const isDisqualifiedRef = useRef(false);

  // Play a soft warning beep using Web Audio API
  const playAlertBeep = useCallback(() => {
    try {
      if (!audioContextRef.current) {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtx) {
          audioContextRef.current = new AudioCtx();
        }
      }
      if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }
      if (audioContextRef.current) {
        const osc = audioContextRef.current.createOscillator();
        const gain = audioContextRef.current.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, audioContextRef.current.currentTime); // D5
        osc.frequency.exponentialRampToValueAtTime(329.63, audioContextRef.current.currentTime + 0.25); // E4
        gain.gain.setValueAtTime(0.15, audioContextRef.current.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + 0.25);
        osc.connect(gain);
        gain.connect(audioContextRef.current.destination);
        osc.start();
        osc.stop(audioContextRef.current.currentTime + 0.25);
      }
    } catch {
      // Ignore audio context errors if blocked by browser policy
    }
  }, []);

  const recordViolation = useCallback(
    (reason: string) => {
      if (!isActive || isDisqualifiedRef.current) return;

      playAlertBeep();
      const timeStr = new Date().toLocaleTimeString('vi-VN');
      const logEntry = `[${timeStr}] ${reason}`;

      setViolationsCount((prev) => {
        const nextCount = prev + 1;
        setViolationLogs((logs) => [...logs, logEntry]);
        setLastWarning(reason);

        if (onViolationWarning) {
          onViolationWarning(nextCount, reason);
        }

        if (nextCount >= MAX_VIOLATIONS_ALLOWED) {
          isDisqualifiedRef.current = true;
          setTimeout(() => {
            onDisqualified(
              `Bạn đã vi phạm quy chế thi ${nextCount}/${MAX_VIOLATIONS_ALLOWED} lần (${reason}). Toàn bộ bài làm đã bị đình chỉ và bắt buộc phải làm lại từ đầu!`
            );
          }, 300);
        }
        return nextCount;
      });
    },
    [isActive, onDisqualified, onViolationWarning, playAlertBeep]
  );

  const resetViolations = useCallback(() => {
    setViolationsCount(0);
    setViolationLogs([]);
    setLastWarning(null);
    isDisqualifiedRef.current = false;
  }, []);

  const clearWarningModal = useCallback(() => {
    setLastWarning(null);
  }, []);

  useEffect(() => {
    if (!isActive) return;

    // 1. Detect tab switch & minimization
    const handleVisibilityChange = () => {
      if (document.hidden) {
        recordViolation('Chuyển sang tab khác hoặc thu nhỏ cửa sổ trình duyệt');
      }
    };

    // 2. Detect window blur (switching to another window/app)
    const handleBlur = () => {
      recordViolation('Rời khỏi cửa sổ bài thi (mất tiêu điểm màn hình)');
    };

    // 3. Detect prohibited keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // PrintScreen key
      if (e.key === 'PrintScreen') {
        e.preventDefault();
        recordViolation('Phát hiện cố gắng chụp màn hình (Phím PrintScreen)');
        return;
      }

      // Windows + Shift + S or Meta + Shift + 4 / Command + Shift + 3 / 4
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && (e.key === 'S' || e.key === 's' || e.key === '4' || e.key === '3')) {
        e.preventDefault();
        recordViolation('Phát hiện phím tắt công cụ chụp ảnh màn hình Snipping Tool');
        return;
      }

      // Prohibit copy & paste during quiz
      if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'C')) {
        e.preventDefault();
        recordViolation('Cấm sao chép nội dung câu hỏi (Ctrl+C)');
        return;
      }

      if ((e.ctrlKey || e.metaKey) && (e.key === 'v' || e.key === 'V')) {
        e.preventDefault();
        recordViolation('Cấm dán nội dung từ bên ngoài (Ctrl+V)');
        return;
      }

      // Prohibit inspect devtools
      if (e.key === 'F12' || ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j'))) {
        e.preventDefault();
        recordViolation('Cấm mở công cụ Developer Tools / Inspect');
        return;
      }

      // Prohibit Print
      if ((e.ctrlKey || e.metaKey) && (e.key === 'p' || e.key === 'P')) {
        e.preventDefault();
        recordViolation('Cấm lệnh in tài liệu (Ctrl+P)');
        return;
      }
    };

    // 4. Disable context menu (right click)
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      recordViolation('Cấm nhấp chuột phải (Context Menu) trong lúc làm bài');
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleBlur);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('contextmenu', handleContextMenu);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('contextmenu', handleContextMenu);
    };
  }, [isActive, recordViolation]);

  return {
    violationsCount,
    violationLogs,
    lastWarning,
    clearWarningModal,
    resetViolations,
    maxAllowed: MAX_VIOLATIONS_ALLOWED,
  };
}
