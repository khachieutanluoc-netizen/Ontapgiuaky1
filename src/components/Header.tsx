import React from 'react';
import { Student } from '../types';
import { 
  BookOpen, 
  BarChart3, 
  Mail, 
  User, 
  LogOut, 
  FileSpreadsheet, 
  ShieldCheck, 
  BookMarked
} from 'lucide-react';

interface HeaderProps {
  currentStudent: Student | null;
  onOpenLogin: () => void;
  onLogout: () => void;
  activeTab: 'lessons' | 'dashboard' | 'emails';
  setActiveTab: (tab: 'lessons' | 'dashboard' | 'emails') => void;
  onOpenRosterManager: () => void;
  onOpenSgkViewer: () => void;
  unreadEmailCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentStudent,
  onOpenLogin,
  onLogout,
  activeTab,
  setActiveTab,
  onOpenRosterManager,
  onOpenSgkViewer,
  unreadEmailCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3 cursor-pointer shrink-0" onClick={() => setActiveTab('lessons')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="whitespace-nowrap">
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-slate-900 text-base sm:text-lg tracking-tight">Ôn Tập Tin Học 10</span>
                <span className="hidden xl:inline-block px-2 py-0.5 text-xs font-semibold rounded-md bg-blue-50 text-blue-700 border border-blue-200">
                  Giữa HK1
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden md:block">
                Sách Kết Nối Tri Thức • Bài 16 đến Hết Bài 23 (Python)
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden lg:flex items-center space-x-1">
            <button
              onClick={() => setActiveTab('lessons')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center space-x-2 ${
                activeTab === 'lessons'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Bài Ôn Tập (16 - 23)</span>
            </button>

            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center space-x-2 ${
                activeTab === 'dashboard'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Dashboard Tiến Độ</span>
            </button>

            <button
              onClick={() => setActiveTab('emails')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center space-x-2 relative ${
                activeTab === 'emails'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Mail className="w-4 h-4" />
              <span>Hộp Thư Báo Cáo</span>
              {unreadEmailCount > 0 && (
                <span className="ml-1.5 px-1.5 py-0.5 text-[11px] font-bold rounded-full bg-emerald-500 text-white animate-pulse">
                  {unreadEmailCount}
                </span>
              )}
            </button>
          </nav>

          {/* Right Action buttons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={onOpenSgkViewer}
              className="p-2 text-slate-600 hover:text-blue-600 hover:bg-slate-100 rounded-lg text-xs font-semibold flex items-center space-x-1.5 border border-slate-200"
              title="Tra cứu SGK & SBT Tin học 10"
            >
              <BookMarked className="w-4 h-4 text-blue-600" />
              <span className="hidden sm:inline">SGK / SBT</span>
            </button>

            <button
              onClick={onOpenRosterManager}
              className="p-2 text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg text-xs font-semibold flex items-center space-x-1.5 border border-slate-200"
              title="Quản lý danh sách học sinh theo Excel"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
              <span className="hidden sm:inline">Ds Học Sinh (Excel)</span>
            </button>

            {currentStudent ? (
              <div className="flex items-center pl-2 border-l border-slate-200 space-x-2">
                <div 
                  onClick={onOpenLogin}
                  className="cursor-pointer group flex items-center space-x-2 p-1.5 rounded-lg hover:bg-slate-100 transition"
                  title="Đổi thông tin học sinh"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-100 border border-blue-300 flex items-center justify-center text-blue-700 font-bold text-xs">
                    {currentStudent.fullName.split(' ').pop()?.[0] || 'HS'}
                  </div>
                  <div className="text-left hidden sm:block">
                    <p className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition">
                      {currentStudent.fullName}
                    </p>
                    <p className="text-[11px] text-slate-500 font-medium">
                      Lớp {currentStudent.class} • {currentStudent.dob}
                    </p>
                  </div>
                </div>

                <button
                  onClick={onLogout}
                  className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                  title="Đăng xuất"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenLogin}
                className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold shadow-md shadow-blue-500/20 transition"
              >
                <User className="w-4 h-4" />
                <span>Đăng Nhập Ôn Tập</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Submenu Bar */}
        <div className="flex lg:hidden items-center justify-around py-2 border-t border-slate-100 text-xs font-medium">
          <button
            onClick={() => setActiveTab('lessons')}
            className={`py-1 px-3 rounded-lg flex items-center space-x-1 ${
              activeTab === 'lessons' ? 'bg-blue-600 text-white font-bold' : 'text-slate-600'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Bài ôn</span>
          </button>
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`py-1 px-3 rounded-lg flex items-center space-x-1 ${
              activeTab === 'dashboard' ? 'bg-blue-600 text-white font-bold' : 'text-slate-600'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </button>
          <button
            onClick={() => setActiveTab('emails')}
            className={`py-1 px-3 rounded-lg flex items-center space-x-1 relative ${
              activeTab === 'emails' ? 'bg-blue-600 text-white font-bold' : 'text-slate-600'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Hộp thư</span>
            {unreadEmailCount > 0 && (
              <span className="ml-1 px-1 py-0.2 text-[10px] bg-emerald-500 text-white rounded-full">
                {unreadEmailCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
