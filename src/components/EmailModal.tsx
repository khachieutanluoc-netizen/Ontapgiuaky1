import React, { useState } from 'react';
import { EmailLog } from '../types';
import { 
  Mail, 
  X, 
  CheckCircle2, 
  Clock, 
  Printer, 
  Eye, 
  Calendar, 
  User, 
  ShieldCheck, 
  Award 
} from 'lucide-react';

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  emailLogs: EmailLog[];
  currentStudentEmail?: string;
}

export const EmailModal: React.FC<EmailModalProps> = ({
  isOpen,
  onClose,
  emailLogs,
  currentStudentEmail,
}) => {
  const [selectedLogId, setSelectedLogId] = useState<string | null>(
    emailLogs.length > 0 ? emailLogs[0].id : null
  );

  if (!isOpen) return null;

  const activeLog = emailLogs.find((l) => l.id === selectedLogId) || emailLogs[0];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-100 animate-in zoom-in-95">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <Mail className="w-5 h-5 text-white" />
            <div>
              <h3 className="font-bold text-base">Hộp Thư Thông Báo Tiến Độ Học Tập</h3>
              <p className="text-xs text-blue-100">
                Toàn bộ phiếu điểm và nhận xét sư phạm được tự động gửi về email học sinh sau mỗi bài học
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content area: Sidebar + Main Letter Preview */}
        {emailLogs.length === 0 ? (
          <div className="p-12 text-center text-slate-500 space-y-3">
            <Mail className="w-12 h-12 text-slate-300 mx-auto" />
            <h4 className="text-base font-bold text-slate-700">Chưa có email báo cáo nào</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Sau khi học sinh hoàn thành bài học lý thuyết hoặc nộp bài kiểm tra 15 phút, hệ thống sẽ tự động phát email báo cáo về đây.
            </p>
          </div>
        ) : (
          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 overflow-hidden">
            
            {/* Sidebar list of emails */}
            <div className="border-r border-slate-200 overflow-y-auto max-h-[400px] md:max-h-none divide-y divide-slate-100 bg-slate-50/50">
              <div className="p-3 text-[11px] font-bold text-slate-400 uppercase tracking-wider bg-slate-100">
                Lịch sử gửi email ({emailLogs.length})
              </div>
              {emailLogs.map((log) => {
                const isSelected = activeLog?.id === log.id;
                const dateStr = new Date(log.sentAt).toLocaleString('vi-VN', {
                  day: '2-digit',
                  month: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                });

                return (
                  <button
                    key={log.id}
                    type="button"
                    onClick={() => setSelectedLogId(log.id)}
                    className={`w-full text-left p-3.5 transition flex flex-col space-y-1 cursor-pointer ${
                      isSelected
                        ? 'bg-blue-50/80 border-l-4 border-blue-600'
                        : 'hover:bg-slate-100/70'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-900 truncate pr-2">
                        {log.studentName}
                      </span>
                      <span className="text-[10px] text-slate-400 shrink-0">{dateStr}</span>
                    </div>

                    <div className="text-xs text-blue-700 font-semibold truncate">
                      {log.lessonTitle}
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5">
                      <span>Điểm: <strong className="text-slate-800">{log.quizScore.toFixed(1)}/10</strong></span>
                      <span className="text-emerald-600 font-bold flex items-center space-x-0.5">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Đã phát</span>
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Main Email Preview Screen */}
            <div className="md:col-span-2 p-6 overflow-y-auto space-y-5 bg-white">
              {activeLog && (
                <>
                  {/* Action Bar */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="text-xs text-slate-500">
                      Đã gửi tới: <strong className="text-slate-800 font-mono">{activeLog.recipientEmail}</strong>
                    </div>

                    <button
                      onClick={handlePrint}
                      className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold flex items-center space-x-1.5 cursor-pointer transition"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>In Phiếu Báo Cáo</span>
                    </button>
                  </div>

                  {/* Rendered Email Card */}
                  <div className="border border-slate-200 rounded-2xl p-6 bg-slate-50/30 space-y-5">
                    
                    {/* Header */}
                    <div className="text-center border-b border-slate-200 pb-4">
                      <h4 className="text-lg font-black text-blue-900">
                        BÁO CÁO KẾT QUẢ ÔN TẬP TIN HỌC 10
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Kiểm Tra Giữa Kỳ 1 (2026-2027) • Sách Kết Nối Tri Thức Với Cuộc Sống
                      </p>
                    </div>

                    {/* Student Info Box */}
                    <div className="grid grid-cols-2 gap-3 bg-white p-4 rounded-xl border border-slate-200 text-xs">
                      <div>Học sinh: <strong className="text-slate-900">{activeLog.studentName}</strong></div>
                      <div>Lớp: <strong className="text-slate-900">{activeLog.studentClass}</strong></div>
                      <div>Bài học: <strong className="text-blue-700">{activeLog.lessonTitle}</strong></div>
                      <div>Thời gian gửi: <span className="text-slate-600">{new Date(activeLog.sentAt).toLocaleString('vi-VN')}</span></div>
                    </div>

                    {/* Results Numbers */}
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                        <div className="text-[10px] font-bold text-emerald-700 uppercase">Lý Thuyết Tương Tác</div>
                        <div className="text-2xl font-black text-emerald-800 mt-0.5">{activeLog.theoryScore}%</div>
                      </div>

                      <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl">
                        <div className="text-[10px] font-bold text-blue-700 uppercase">Kiểm Tra 15 Phút</div>
                        <div className="text-2xl font-black text-blue-800 mt-0.5">{activeLog.quizScore.toFixed(1)} / 10</div>
                      </div>

                      <div className="p-3 bg-purple-50 border border-purple-200 rounded-xl">
                        <div className="text-[10px] font-bold text-purple-700 uppercase">Số Câu Đúng</div>
                        <div className="text-2xl font-black text-purple-800 mt-0.5">{activeLog.correctAnswersCount} / {activeLog.totalQuestions}</div>
                      </div>
                    </div>

                    {/* Pedagogical Feedback */}
                    <div className="p-4 bg-amber-50 border-l-4 border-amber-500 rounded-r-xl text-xs sm:text-sm text-amber-900 space-y-1">
                      <div className="font-bold">Nhận xét sư phạm của giáo viên:</div>
                      <p className="whitespace-pre-line leading-relaxed text-amber-950">
                        {activeLog.feedback}
                      </p>
                    </div>

                    <div className="text-[11px] text-slate-400 text-center">
                      * Phiếu báo cáo được tạo tự động bởi Hệ Thống Khảo Thí & Ôn Tập Tin Học 10.
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
