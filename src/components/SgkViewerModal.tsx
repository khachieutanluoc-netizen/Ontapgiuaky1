import React from 'react';
import { BookMarked, X, ExternalLink, FileText, Download } from 'lucide-react';
import { ALL_LESSONS } from '../data/lessonsData';

interface SgkViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLesson: (id: number) => void;
}

export const SgkViewerModal: React.FC<SgkViewerModalProps> = ({
  isOpen,
  onClose,
  onSelectLesson,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-100 animate-in zoom-in-95">
        
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-blue-700 to-indigo-800 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <BookMarked className="w-5 h-5 text-blue-200" />
            <div>
              <h3 className="font-bold text-base">Tài Liệu SGK & Sách Bài Tập Tin Học 10 (KNTT)</h3>
              <p className="text-xs text-blue-100">
                Nội dung ôn tập trọng tâm kiểm tra giữa kỳ 1: Bài 16 đến Hết Bài 23 (Chủ đề 5 - Lập trình Python)
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* PDF Link Cards */}
        <div className="p-6 space-y-6 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* SGK Card */}
            <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/60 flex flex-col justify-between space-y-3">
              <div>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-blue-600 text-white uppercase">
                  Sách Giáo Khoa
                </span>
                <h4 className="text-sm font-bold text-blue-950 mt-2">
                  Tin Học 10 - Kết Nối Tri Thức Với Cuộc Sống
                </h4>
                <p className="text-xs text-slate-600 mt-1">
                  Chủ biên: Phạm Thế Long, Đào Kiến Quốc. Bài 16 - 23: Trang 86 đến trang 118.
                </p>
              </div>

              <a
                href="/assets/aistudio/Tin-h_c-10-KNTT_b2676d86.pdf"
                target="_blank"
                rel="noreferrer"
                className="py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center justify-center space-x-1.5 transition cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Mở Xem Trọn Bộ SGK (PDF)</span>
              </a>
            </div>

            {/* SBT Card */}
            <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/60 flex flex-col justify-between space-y-3">
              <div>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-amber-600 text-white uppercase">
                  Sách Bài Tập
                </span>
                <h4 className="text-sm font-bold text-amber-950 mt-2">
                  Bài Tập Tin Học 10 - KNTT
                </h4>
                <p className="text-xs text-slate-600 mt-1">
                  Có đầy đủ câu hỏi bài tập và phần hai: Đáp án & gợi ý trả lời chi tiết. Bài 16 - 23: Trang 34 đến 50 & Đáp án trang 101 đến 123.
                </p>
              </div>

              <a
                href="/assets/aistudio/SBT_TIN_HOC_10pdf_8f253512.pdf"
                target="_blank"
                rel="noreferrer"
                className="py-2 px-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold flex items-center justify-center space-x-1.5 transition cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Mở Xem Sách Bài Tập & Đáp Án (PDF)</span>
              </a>
            </div>
          </div>

          {/* Quick Lesson Index Table */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide">
              Chỉ mục trang tra cứu nhanh các bài ôn tập:
            </h4>

            <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden text-xs">
              {ALL_LESSONS.map((l) => (
                <div key={l.id} className="p-3 bg-white hover:bg-slate-50 flex items-center justify-between">
                  <div>
                    <strong className="text-slate-900">{l.title}</strong>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      📖 SGK: {l.sgkPages} • 📝 SBT: {l.sbtPages}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onClose();
                      onSelectLesson(l.id);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 font-bold hover:bg-blue-100 transition cursor-pointer"
                  >
                    Vào ôn bài này
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="py-2 px-5 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl text-xs cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
