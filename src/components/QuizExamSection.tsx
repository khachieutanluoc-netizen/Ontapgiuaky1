import React, { useState, useEffect, useRef, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { LessonContent, Student, QuizQuestion } from '../types';
import { calculateQuizScore } from '../utils/evaluation';
import { useProctoring } from '../hooks/useProctoring';
import { sendStudentLessonReport } from '../utils/mailer';
import { 
  Clock, 
  ShieldAlert, 
  CheckCircle2, 
  XCircle, 
  Flag, 
  ArrowLeft, 
  ArrowRight, 
  Send, 
  RotateCcw, 
  Mail, 
  Award, 
  FileText,
  AlertTriangle,
  EyeOff
} from 'lucide-react';

interface QuizExamSectionProps {
  lesson: LessonContent;
  student: Student;
  onFinishQuiz: (score: number, correctCount: number, timeSpent: number, violations: number) => void;
  onBackToLessons: () => void;
  onViewEmailModal: () => void;
}

const TOTAL_TIME_SECONDS = 15 * 60; // 15 phút = 900 giây

export const QuizExamSection: React.FC<QuizExamSectionProps> = ({
  lesson,
  student,
  onFinishQuiz,
  onBackToLessons,
  onViewEmailModal,
}) => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<string, boolean>>({});
  const [timeLeft, setTimeLeft] = useState<number>(TOTAL_TIME_SECONDS);
  const [isTestActive, setIsTestActive] = useState<boolean>(true);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [showDisqualifiedModal, setShowDisqualifiedModal] = useState<boolean>(false);
  const [disqualifiedReason, setDisqualifiedReason] = useState<string>('');
  const [emailSentNotice, setEmailSentNotice] = useState<boolean>(false);

  const [finalResult, setFinalResult] = useState<{
    scoreOutOf10: number;
    correctCount: number;
    totalQuestions: number;
    percentage: number;
    rank: string;
  } | null>(null);

  const timerRef = useRef<any>(null);

  // Anti-cheating proctoring hook
  const handleDisqualified = useCallback((reason: string) => {
    setIsTestActive(false);
    setShowDisqualifiedModal(true);
    setDisqualifiedReason(reason);
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  const {
    violationsCount,
    violationLogs,
    lastWarning,
    clearWarningModal,
    resetViolations,
    maxAllowed,
  } = useProctoring({
    isActive: isTestActive && !isSubmitted,
    onDisqualified: handleDisqualified,
  });

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Countdown timer
  useEffect(() => {
    if (isTestActive && !isSubmitted) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            handleSubmitQuiz(true); // Auto submit on timeout
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTestActive, isSubmitted]);

  const handleSelectAnswer = (qId: string, optIdx: number) => {
    if (isSubmitted || !isTestActive) return;
    setUserAnswers((prev) => ({ ...prev, [qId]: optIdx }));
  };

  const handleToggleFlag = (qId: string) => {
    setFlaggedQuestions((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  const handleSubmitQuiz = useCallback(
    (isAutoSubmit: boolean = false) => {
      setIsTestActive(false);
      setShowConfirmModal(false);
      setIsSubmitted(true);
      if (timerRef.current) clearInterval(timerRef.current);

      const timeSpent = TOTAL_TIME_SECONDS - timeLeft;
      const result = calculateQuizScore(userAnswers, lesson.quizQuestions);
      setFinalResult(result);

      if (result.scoreOutOf10 >= 8.0) {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 },
        });
      }

      // Automatically dispatch student email report
      sendStudentLessonReport({
        student,
        lesson,
        theoryScore: 100, // already verified >= 80%
        quizScore: result.scoreOutOf10,
        correctAnswersCount: result.correctCount,
        totalQuestions: result.totalQuestions,
        violationsCount,
        timeSpentSeconds: timeSpent,
      });

      setEmailSentNotice(true);
      onFinishQuiz(result.scoreOutOf10, result.correctCount, timeSpent, violationsCount);
    },
    [lesson, student, timeLeft, userAnswers, violationsCount, onFinishQuiz]
  );

  const handleRestartAfterDisqualified = () => {
    setShowDisqualifiedModal(false);
    setUserAnswers({});
    setFlaggedQuestions({});
    setTimeLeft(TOTAL_TIME_SECONDS);
    resetViolations();
    setCurrentIdx(0);
    setIsTestActive(true);
    setIsSubmitted(false);
    setFinalResult(null);
  };

  const handleRetakeQuiz = () => {
    setUserAnswers({});
    setFlaggedQuestions({});
    setTimeLeft(TOTAL_TIME_SECONDS);
    resetViolations();
    setCurrentIdx(0);
    setIsTestActive(true);
    setIsSubmitted(false);
    setFinalResult(null);
    setEmailSentNotice(false);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const isTimeLow = timeLeft < 120; // Under 2 mins

  const currentQ = lesson.quizQuestions[currentIdx];
  const answeredCount = Object.keys(userAnswers).length;

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-16 animate-in fade-in duration-200">
      
      {/* Top Floating / Fixed Exam Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <span className="px-2.5 py-0.5 text-xs font-extrabold rounded-md bg-blue-100 text-blue-800">
            {lesson.chapter}
          </span>
          <h2 className="text-xl font-black text-slate-900 mt-1">
            {lesson.title} - Bài Tập Kiểm Tra (20 Câu)
          </h2>
          <p className="text-xs text-slate-500">
            Học sinh: <strong className="text-slate-800">{student.fullName}</strong> • Lớp {student.class}
          </p>
        </div>

        {/* Proctoring & Countdown Clock */}
        <div className="flex items-center space-x-3 w-full md:w-auto justify-between md:justify-end">
          
          {/* Proctoring Strike Badge */}
          <div className="flex items-center space-x-2 bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-xs">
            <ShieldAlert className={`w-4 h-4 ${violationsCount === 0 ? 'text-emerald-500' : 'text-rose-500 animate-pulse'}`} />
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-bold">Giám sát</div>
              <div className="font-extrabold text-slate-800">
                Vi phạm: <span className={violationsCount >= 3 ? 'text-rose-600' : 'text-amber-600'}>{violationsCount}</span> / {maxAllowed}
              </div>
            </div>
          </div>

          {/* Timer Clock */}
          {!isSubmitted && (
            <div className={`flex items-center space-x-2 px-4 py-2 rounded-xl border text-sm font-black transition ${
              isTimeLow 
                ? 'bg-rose-50 border-rose-300 text-rose-600 animate-pulse' 
                : 'bg-blue-50 border-blue-200 text-blue-700'
            }`}>
              <Clock className="w-5 h-5 shrink-0" />
              <span className="font-mono text-lg">
                {minutes < 10 ? '0' : ''}{minutes}:{seconds < 10 ? '0' : ''}{seconds}
              </span>
            </div>
          )}

          {!isSubmitted && (
            <button
              onClick={() => setShowConfirmModal(true)}
              className="py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/20 flex items-center space-x-1.5 transition cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Nộp Bài</span>
            </button>
          )}
        </div>
      </div>

      {/* Proctoring Warning Modal (When student switches tab / presses screenshot key) */}
      {lastWarning && !showDisqualifiedModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full border-2 border-rose-500 shadow-2xl text-center space-y-4 animate-in zoom-in-95">
            <div className="w-14 h-14 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900">CẢNH BÁO GIÁM SÁT THI!</h3>
              <p className="text-sm text-slate-600 mt-1 font-medium">{lastWarning}</p>
            </div>
            <div className="bg-rose-50 rounded-xl p-3 text-xs text-rose-800 font-bold">
              Vi phạm lần: {violationsCount} / {maxAllowed} lần cho phép.
              <br />
              Nếu vi phạm quá {maxAllowed} lần, bài làm sẽ bị hủy bỏ và bắt buộc làm lại từ đầu!
            </div>
            <button
              onClick={clearWarningModal}
              className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs shadow-md transition cursor-pointer"
            >
              Tôi Đã Hiểu Và Tiếp Tục Làm Bài
            </button>
          </div>
        </div>
      )}

      {/* Disqualified Modal (If violations >= 5) */}
      {showDisqualifiedModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-8 max-w-lg w-full border-2 border-rose-600 shadow-2xl text-center space-y-5 animate-in zoom-in-95">
            <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto">
              <EyeOff className="w-10 h-10" />
            </div>
            <div>
              <h3 className="text-xl font-black text-rose-700">BÀI LÀM ĐÃ BỊ HỦY BỎ!</h3>
              <p className="text-sm text-slate-700 mt-2 font-medium leading-relaxed">
                {disqualifiedReason}
              </p>
            </div>
            <div className="p-4 bg-slate-100 rounded-xl text-xs text-slate-600 text-left space-y-1">
              <div className="font-bold text-slate-800">Nhật ký vi phạm đã ghi nhận:</div>
              <ul className="list-disc pl-4 space-y-0.5 text-[11px] text-rose-700">
                {violationLogs.map((log, i) => (
                  <li key={i}>{log}</li>
                ))}
              </ul>
            </div>
            <button
              onClick={handleRestartAfterDisqualified}
              className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white font-black rounded-xl text-sm shadow-lg shadow-rose-600/30 flex items-center justify-center space-x-2 transition cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Bắt Đầu Làm Lại Bài Kiểm Tra Từ Đầu</span>
            </button>
          </div>
        </div>
      )}

      {/* Confirm Submit Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl text-center space-y-4 border border-slate-100">
            <h3 className="text-lg font-bold text-slate-900">Xác Nhận Nộp Bài Kiểm Tra?</h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Em đã hoàn thành <strong className="text-blue-600">{answeredCount}/20 câu hỏi</strong>.
              {answeredCount < 20 && (
                <span className="text-amber-600 block mt-1 font-semibold">
                  (Còn {20 - answeredCount} câu chưa chọn đáp án!)
                </span>
              )}
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-100 transition cursor-pointer"
              >
                Tiếp tục làm bài
              </button>
              <button
                onClick={() => handleSubmitQuiz(false)}
                className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition cursor-pointer"
              >
                Xác nhận nộp bài
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main View: In-Progress vs Submitted Results */}
      {!isSubmitted ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Left Column: Question Content (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
              
              {/* Question Index & Flag */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <span className="text-xs font-black px-3 py-1 bg-blue-100 text-blue-800 rounded-lg">
                  Câu hỏi {currentIdx + 1} / 20
                </span>

                <button
                  type="button"
                  onClick={() => handleToggleFlag(currentQ.id)}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    flaggedQuestions[currentQ.id]
                      ? 'bg-amber-100 text-amber-800 border border-amber-300'
                      : 'text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  <Flag className={`w-3.5 h-3.5 ${flaggedQuestions[currentQ.id] ? 'fill-amber-500 text-amber-600' : ''}`} />
                  <span>{flaggedQuestions[currentQ.id] ? 'Đã đánh dấu' : 'Đánh dấu xem lại'}</span>
                </button>
              </div>

              {/* Question Prompt */}
              <div className="space-y-3">
                <p className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                  {currentQ.prompt}
                </p>

                {currentQ.codeSnippet && (
                  <pre className="p-4 bg-slate-900 text-emerald-300 rounded-xl font-mono text-xs sm:text-sm overflow-x-auto border border-slate-800">
                    <code>{currentQ.codeSnippet}</code>
                  </pre>
                )}
              </div>

              {/* Options */}
              <div className="space-y-3 pt-2">
                {currentQ.options.map((opt, optIdx) => {
                  const isSelected = userAnswers[currentQ.id] === optIdx;
                  return (
                    <button
                      key={optIdx}
                      type="button"
                      onClick={() => handleSelectAnswer(currentQ.id, optIdx)}
                      className={`w-full text-left p-4 rounded-xl text-xs sm:text-sm font-medium border flex items-center space-x-3 transition cursor-pointer ${
                        isSelected
                          ? 'bg-blue-50 border-blue-500 text-blue-900 font-bold ring-2 ring-blue-500/20'
                          : 'bg-slate-50/70 hover:bg-slate-100 border-slate-200 text-slate-700'
                      }`}
                    >
                      <span className={`w-7 h-7 rounded-full border flex items-center justify-center font-bold text-xs shrink-0 ${
                        isSelected
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white border-slate-300 text-slate-700'
                      }`}>
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span className="flex-1">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Navigation Arrows */}
              <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                <button
                  type="button"
                  disabled={currentIdx === 0}
                  onClick={() => setCurrentIdx((i) => Math.max(0, i - 1))}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 flex items-center space-x-1 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Câu trước</span>
                </button>

                {currentIdx < 19 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentIdx((i) => Math.min(19, i + 1))}
                    className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 flex items-center space-x-1 cursor-pointer"
                  >
                    <span>Câu tiếp theo</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowConfirmModal(true)}
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md shadow-emerald-500/20 flex items-center space-x-1 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Nộp bài thi</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: 20 Question Grid (1 col) */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                  Bảng 20 câu hỏi
                </h4>
                <span className="text-xs font-semibold text-blue-600">
                  {answeredCount}/20 đã chọn
                </span>
              </div>

              {/* Grid 4 x 5 */}
              <div className="grid grid-cols-5 gap-2">
                {lesson.quizQuestions.map((q, idx) => {
                  const isCurrent = idx === currentIdx;
                  const isAnswered = userAnswers[q.id] !== undefined;
                  const isFlagged = flaggedQuestions[q.id];

                  return (
                    <button
                      key={q.id}
                      type="button"
                      onClick={() => setCurrentIdx(idx)}
                      className={`h-9 rounded-lg font-bold text-xs relative flex items-center justify-center transition cursor-pointer ${
                        isCurrent
                          ? 'ring-2 ring-blue-600 ring-offset-1 bg-blue-600 text-white'
                          : isFlagged
                          ? 'bg-amber-100 text-amber-900 border border-amber-400'
                          : isAnswered
                          ? 'bg-blue-100 text-blue-800 border border-blue-300'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
                      }`}
                    >
                      <span>{idx + 1}</span>
                      {isFlagged && (
                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-500 rounded-full" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Legends */}
              <div className="pt-3 border-t border-slate-100 space-y-1.5 text-[11px] text-slate-500">
                <div className="flex items-center space-x-2">
                  <span className="w-3.5 h-3.5 rounded bg-blue-600 inline-block" />
                  <span>Đang chọn</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-3.5 h-3.5 rounded bg-blue-100 border border-blue-300 inline-block" />
                  <span>Đã trả lời</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-3.5 h-3.5 rounded bg-amber-100 border border-amber-400 inline-block" />
                  <span>Đánh dấu xem lại</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-3.5 h-3.5 rounded bg-slate-100 border border-slate-200 inline-block" />
                  <span>Chưa trả lời</span>
                </div>
              </div>
            </div>

            {/* Anti-cheating rule reminder */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-600 space-y-2">
              <div className="font-bold text-slate-800 flex items-center space-x-1.5">
                <ShieldAlert className="w-4 h-4 text-blue-600" />
                <span>Quy chế giám sát thi</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                • Không chuyển tab hoặc mở ứng dụng khác.<br />
                • Cấm chụp màn hình (PrintScreen, Snipping tool).<br />
                • Cấm chuột phải và sao chép câu hỏi.<br />
                • Vi phạm quá 5 lần: Bị đình chỉ làm lại!
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* Results View after Submission */
        <div className="space-y-8 animate-in fade-in duration-300">
          
          {/* Score Summary Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm text-center relative overflow-hidden">
            <div className="inline-flex p-3 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-600 text-white mb-4 shadow-lg shadow-blue-500/25">
              <Award className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-black text-slate-900">
              KẾT QUẢ KIỂM TRA BÀI TẬP: {lesson.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Học sinh: <strong className="text-slate-800">{student.fullName}</strong> • Lớp {student.class}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto my-6">
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                <div className="text-xs text-blue-700 font-bold uppercase">Điểm Số</div>
                <div className="text-3xl font-black text-blue-800 mt-1">
                  {finalResult?.scoreOutOf10} <span className="text-sm font-semibold">/ 10</span>
                </div>
              </div>

              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                <div className="text-xs text-emerald-700 font-bold uppercase">Số Câu Đúng</div>
                <div className="text-3xl font-black text-emerald-800 mt-1">
                  {finalResult?.correctCount} <span className="text-sm font-semibold">/ 20</span>
                </div>
              </div>

              <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
                <div className="text-xs text-purple-700 font-bold uppercase">Xếp Loại</div>
                <div className="text-xl font-black text-purple-800 mt-2">
                  {finalResult?.rank}
                </div>
              </div>

              <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                <div className="text-xs text-amber-700 font-bold uppercase">Vi Phạm Giám Sát</div>
                <div className="text-2xl font-black text-amber-800 mt-1">
                  {violationsCount} / 5
                </div>
              </div>
            </div>

            {/* Email Dispatch Notification Banner */}
            {emailSentNotice && (
              <div className="max-w-xl mx-auto p-4 bg-emerald-50 border border-emerald-300 rounded-xl flex items-center justify-between text-left text-xs sm:text-sm text-emerald-900 mb-6">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <strong>Đã tự động gửi email báo cáo chi tiết đến:</strong>
                    <div className="text-xs text-emerald-700 font-mono">{student.email}</div>
                  </div>
                </div>
                <button
                  onClick={onViewEmailModal}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold shrink-0 transition cursor-pointer"
                >
                  Xem thư
                </button>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={handleRetakeQuiz}
                className="py-2.5 px-5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs flex items-center space-x-1.5 transition cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Làm lại bài kiểm tra</span>
              </button>

              <button
                onClick={onViewEmailModal}
                className="py-2.5 px-5 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 font-bold text-xs flex items-center space-x-1.5 transition cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>Xem Phiếu Báo Cáo Email</span>
              </button>

              <button
                onClick={onBackToLessons}
                className="py-2.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 flex items-center space-x-1.5 transition cursor-pointer"
              >
                <span>Trở Về Danh Mục Bài Ôn Tập</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Full Review of 20 Questions */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <h4 className="text-lg font-black text-slate-900 border-b border-slate-100 pb-3 flex items-center space-x-2">
              <FileText className="w-5 h-5 text-blue-600" />
              <span>Xem Lại Chi Tiết 20 Câu Hỏi & Giải Thích Đáp Án</span>
            </h4>

            <div className="space-y-6">
              {lesson.quizQuestions.map((q, idx) => {
                const userChoice = userAnswers[q.id];
                const isCorrect = userChoice === q.correctAnswer;

                return (
                  <div
                    key={q.id}
                    className={`p-5 rounded-xl border text-xs sm:text-sm ${
                      isCorrect
                        ? 'bg-emerald-50/40 border-emerald-200'
                        : 'bg-rose-50/40 border-rose-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-extrabold text-slate-800">
                        Câu {idx + 1}:
                      </span>
                      <span className={`font-bold flex items-center space-x-1 ${
                        isCorrect ? 'text-emerald-700' : 'text-rose-700'
                      }`}>
                        {isCorrect ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>Đúng (+0.5đ)</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-4 h-4 text-rose-600" />
                            <span>Chưa đúng (0đ)</span>
                          </>
                        )}
                      </span>
                    </div>

                    <p className="font-semibold text-slate-900 mb-2">{q.prompt}</p>

                    {q.codeSnippet && (
                      <pre className="p-3 bg-slate-900 text-emerald-300 rounded-lg font-mono text-xs overflow-x-auto mb-3">
                        <code>{q.codeSnippet}</code>
                      </pre>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                      {q.options.map((opt, oIdx) => {
                        const isChosen = userChoice === oIdx;
                        const isTarget = q.correctAnswer === oIdx;

                        return (
                          <div
                            key={oIdx}
                            className={`p-2.5 rounded-lg border text-xs flex items-center space-x-2 ${
                              isTarget
                                ? 'bg-emerald-100 border-emerald-400 text-emerald-950 font-bold'
                                : isChosen
                                ? 'bg-rose-100 border-rose-400 text-rose-950 font-medium'
                                : 'bg-white border-slate-200 text-slate-500 opacity-70'
                            }`}
                          >
                            <span className="font-bold">{String.fromCharCode(65 + oIdx)}.</span>
                            <span>{opt}</span>
                            {isTarget && <span className="ml-auto text-emerald-700 font-extrabold">✓ Đáp án đúng</span>}
                            {isChosen && !isTarget && <span className="ml-auto text-rose-700 font-semibold">✗ Bạn chọn</span>}
                          </div>
                        );
                      })}
                    </div>

                    <div className="p-3 bg-white/80 border border-slate-200 rounded-lg text-xs text-slate-700">
                      <strong className="text-blue-700">Giải thích: </strong>
                      {q.explanation}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
