import React, { useState, useEffect } from 'react';
import { Student, StudentProgress, EmailLog } from './types';
import { ALL_LESSONS, getLessonById } from './data/lessonsData';
import { getStoredStudents } from './data/studentsData';
import { 
  getCurrentStudent, 
  setCurrentStudent, 
  getAllProgress, 
  getStudentProgressForLesson, 
  saveStudentProgress,
  getEmailLogs,
  saveEmailLog
} from './utils/storage';
import { Header } from './components/Header';
import { LoginModal } from './components/LoginModal';
import { LessonCard } from './components/LessonCard';
import { TheoryInteractiveSection } from './components/TheoryInteractiveSection';
import { QuizExamSection } from './components/QuizExamSection';
import { DashboardView } from './components/DashboardView';
import { EmailModal } from './components/EmailModal';
import { RosterManagerModal } from './components/RosterManagerModal';
import { SgkViewerModal } from './components/SgkViewerModal';
import { 
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  GraduationCap, 
  FileSpreadsheet, 
  BarChart3, 
  ArrowRight,
  Info
} from 'lucide-react';

export default function App() {
  const [currentStudent, setCurrentStudentState] = useState<Student | null>(null);
  const [allStudents, setAllStudents] = useState<Student[]>([]);
  const [allProgress, setAllProgress] = useState<Record<string, StudentProgress>>({});
  const [emailLogs, setEmailLogs] = useState<EmailLog[]>([]);

  // Navigation state
  const [activeTab, setActiveTab] = useState<'lessons' | 'dashboard' | 'emails'>('lessons');
  const [selectedLessonId, setSelectedLessonId] = useState<number | null>(null);
  const [lessonMode, setLessonMode] = useState<'theory' | 'quiz'>('theory');

  // Modals state
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isRosterModalOpen, setIsRosterModalOpen] = useState<boolean>(false);
  const [isSgkModalOpen, setIsSgkModalOpen] = useState<boolean>(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState<boolean>(false);

  // Toast notification
  const [toastMsg, setToastMsg] = useState<{ title: string; text: string; type: 'success' | 'info' | 'warning' } | null>(null);

  // Initialize data on mount
  useEffect(() => {
    const students = getStoredStudents();
    setAllStudents(students);

    const progress = getAllProgress();
    setAllProgress(progress);

    const logs = getEmailLogs();
    setEmailLogs(logs);

    const savedStudent = getCurrentStudent();
    if (savedStudent) {
      setCurrentStudentState(savedStudent);
    } else {
      // Prompt login modal initially
      setIsLoginModalOpen(true);
    }
  }, []);

  const showToast = (title: string, text: string, type: 'success' | 'info' | 'warning' = 'success') => {
    setToastMsg({ title, text, type });
    setTimeout(() => {
      setToastMsg(null);
    }, 4500);
  };

  // Student login/select handler
  const handleSelectStudent = (student: Student, email: string) => {
    setCurrentStudent(student);
    setCurrentStudentState(student);
    setIsLoginModalOpen(false);

    // Refresh student roster with updated email if needed
    const updatedRoster = allStudents.map(s => s.id === student.id ? { ...s, email } : s);
    setAllStudents(updatedRoster);

    // Reload progress for this student
    const progress = getAllProgress();
    setAllProgress(progress);

    showToast(
      'Đăng nhập ôn tập thành công!',
      `Chào mừng ${student.fullName} (Lớp ${student.class}). Tiến trình học tập trước đó đã được tải lại đầy đủ!`
    );
  };

  // Logout handler
  const handleLogout = () => {
    setCurrentStudent(null);
    setCurrentStudentState(null);
    setSelectedLessonId(null);
    showToast('Đã đăng xuất', 'Vui lòng chọn học sinh để tiếp tục lưu tiến trình học tập.', 'info');
    setIsLoginModalOpen(true);
  };

  // Success in Theory Interactive check (>= 80%)
  const handleTheoryPassed = (scorePercent: number) => {
    if (!currentStudent || !selectedLessonId) return;

    const currentProg = getStudentProgressForLesson(currentStudent.id, selectedLessonId);
    const updated: StudentProgress = {
      ...currentProg,
      studentId: currentStudent.id,
      email: currentStudent.email,
      lessonId: selectedLessonId,
      theoryCompleted: true,
      theoryScore: Math.max(currentProg.theoryScore, scorePercent),
      quizUnlocked: true,
    };

    saveStudentProgress(updated);
    setAllProgress(getAllProgress());

    showToast(
      '🎉 Đạt lý thuyết tương tác!',
      `Em đạt ${scorePercent}% (vượt chuẩn 80%). Phần bài tập 20 câu đã được mở khoá!`
    );
  };

  // Finish 15-minute Quiz
  const handleFinishQuiz = (score: number, correctCount: number, timeSpent: number, violations: number) => {
    if (!currentStudent || !selectedLessonId) return;

    const currentProg = getStudentProgressForLesson(currentStudent.id, selectedLessonId);
    const updated: StudentProgress = {
      ...currentProg,
      studentId: currentStudent.id,
      email: currentStudent.email,
      lessonId: selectedLessonId,
      quizCompleted: true,
      quizScore: score,
      quizCorrectCount: correctCount,
      timeSpentSeconds: timeSpent,
      violationsCount: violations,
      quizAttempts: (currentProg.quizAttempts || 0) + 1,
    };

    saveStudentProgress(updated);
    setAllProgress(getAllProgress());
    setEmailLogs(getEmailLogs());

    showToast(
      'Đã nộp bài kiểm tra & gửi email!',
      `Điểm số: ${score}/10 (${correctCount}/20 câu đúng). Báo cáo chi tiết đã tự động gửi đến ${currentStudent.email}.`
    );
  };

  // Open specific lesson
  const handleOpenLessonTheory = (lessonId: number) => {
    if (!currentStudent) {
      setIsLoginModalOpen(true);
      return;
    }
    setSelectedLessonId(lessonId);
    setLessonMode('theory');
    setActiveTab('lessons');
  };

  const handleOpenLessonQuiz = (lessonId: number) => {
    if (!currentStudent) {
      setIsLoginModalOpen(true);
      return;
    }
    setSelectedLessonId(lessonId);
    setLessonMode('quiz');
    setActiveTab('lessons');
  };

  const currentActiveLesson = selectedLessonId ? getLessonById(selectedLessonId) : null;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-5 right-5 z-50 max-w-sm w-full bg-slate-900 text-white rounded-2xl p-4 shadow-2xl border border-slate-700 animate-in slide-in-from-bottom-5 duration-200">
          <div className="flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-bold text-white">{toastMsg.title}</h4>
              <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">{toastMsg.text}</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Header */}
      <Header
        currentStudent={currentStudent}
        onOpenLogin={() => setIsLoginModalOpen(true)}
        onLogout={handleLogout}
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab !== 'lessons') {
            setSelectedLessonId(null);
          }
        }}
        onOpenRosterManager={() => setIsRosterModalOpen(true)}
        onOpenSgkViewer={() => setIsSgkModalOpen(true)}
        unreadEmailCount={emailLogs.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* VIEW 1: LESSONS CATALOG OR ACTIVE LESSON */}
        {activeTab === 'lessons' && (
          <>
            {currentActiveLesson && currentStudent ? (
              // Specific lesson active view
              lessonMode === 'theory' ? (
                <TheoryInteractiveSection
                  lesson={currentActiveLesson}
                  student={currentStudent}
                  currentScore={
                    getStudentProgressForLesson(currentStudent.id, currentActiveLesson.id).theoryScore
                  }
                  onSuccessUnlockQuiz={handleTheoryPassed}
                  onGoToQuiz={() => setLessonMode('quiz')}
                  onBackToCatalog={() => setSelectedLessonId(null)}
                />
              ) : (
                <QuizExamSection
                  lesson={currentActiveLesson}
                  student={currentStudent}
                  onFinishQuiz={handleFinishQuiz}
                  onBackToLessons={() => setSelectedLessonId(null)}
                  onViewEmailModal={() => setIsEmailModalOpen(true)}
                />
              )
            ) : (
              // Catalog of all 8 lessons (Bài 16 -> 23)
              <div className="space-y-8 animate-in fade-in duration-200">
                
                {/* Hero Banner */}
                <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
                  <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/5 transform skew-x-12 pointer-events-none" />
                  
                  <div className="max-w-3xl relative z-10 space-y-3">
                    <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-xs font-bold text-blue-100">
                      <GraduationCap className="w-4 h-4 text-white" />
                      <span>Kiểm Tra Giữa Học Kỳ 1 (Năm học 2026-2027)</span>
                    </div>

                    <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
                      Hệ Thống Ôn Tập Tin Học 10 - Kết Nối Tri Thức
                    </h1>
                    
                    <p className="text-xs sm:text-sm text-blue-100 leading-relaxed font-normal">
                      Nội dung giới hạn chuẩn mực từ <strong>Bài 16 đến Hết Bài 23</strong> (Chủ đề 5: Lập trình Python căn bản). Học sinh được phép chọn bất kỳ bài nào để ôn tập, trải nghiệm lý thuyết tương tác 4 dạng đạt ≥ 80% để mở khóa bài tập 20 câu với hệ thống giám sát chống gian lận và gửi email tự động!
                    </p>

                    <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-semibold">
                      <div className="flex items-center space-x-1.5 bg-black/20 px-3 py-1.5 rounded-xl">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>8 Bài Học Chuẩn SGK</span>
                      </div>
                      <div className="flex items-center space-x-1.5 bg-black/20 px-3 py-1.5 rounded-xl">
                        <ShieldCheck className="w-4 h-4 text-blue-300" />
                        <span>Giám Sát Thi Kỷ Luật (Tối Đa 5 Lần)</span>
                      </div>
                      <div className="flex items-center space-x-1.5 bg-black/20 px-3 py-1.5 rounded-xl">
                        <Sparkles className="w-4 h-4 text-amber-300" />
                        <span>Tự Động Gửi Email Báo Cáo</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Student status ribbon */}
                {currentStudent ? (
                  <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 font-extrabold flex items-center justify-center shrink-0">
                        {currentStudent.class}
                      </div>
                      <div>
                        <div className="text-slate-500 text-xs">Học sinh đang tham gia:</div>
                        <div className="font-extrabold text-slate-900 text-sm sm:text-base">
                          {currentStudent.fullName}
                          <span className="font-normal text-xs text-slate-500 ml-2">
                            (Ngày sinh: {currentStudent.dob} • Email: {currentStudent.email})
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setActiveTab('dashboard')}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold text-xs flex items-center space-x-1.5 transition cursor-pointer shrink-0"
                    >
                      <BarChart3 className="w-4 h-4 text-blue-600" />
                      <span>Xem Dashboard Tiến Độ</span>
                    </button>
                  </div>
                ) : (
                  <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center justify-between text-xs sm:text-sm text-amber-900">
                    <div className="flex items-center space-x-2">
                      <Info className="w-5 h-5 text-amber-600 shrink-0" />
                      <span>Em chưa chọn thông tin học sinh. Hãy đăng nhập để lưu kết quả và nhận email bài học.</span>
                    </div>
                    <button
                      onClick={() => setIsLoginModalOpen(true)}
                      className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold text-xs shadow-sm transition cursor-pointer shrink-0 ml-3"
                    >
                      Chọn Lớp & Họ Tên
                    </button>
                  </div>
                )}

                {/* Section title */}
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-black text-slate-900">
                      Danh Mục 8 Bài Ôn Tập Kiểm Tra Giữa Kỳ 1
                    </h2>
                    <p className="text-xs text-slate-500">
                      Mỗi bài chia làm 2 phần: Học lý thuyết tương tác (đạt ≥ 80%) và Bài tập trắc nghiệm 20 câu (15 phút)
                    </p>
                  </div>
                </div>

                {/* 8 Lesson Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {ALL_LESSONS.map((lesson) => {
                    const progress = currentStudent
                      ? getStudentProgressForLesson(currentStudent.id, lesson.id)
                      : {
                          studentId: '',
                          email: '',
                          lessonId: lesson.id,
                          theoryCompleted: false,
                          theoryScore: 0,
                          quizUnlocked: false,
                          quizCompleted: false,
                          quizScore: 0,
                          quizCorrectCount: 0,
                          timeSpentSeconds: 0,
                          violationsCount: 0,
                          violationLogs: [],
                          lastUpdated: '',
                          quizAttempts: 0,
                        };

                    return (
                      <LessonCard
                        key={lesson.id}
                        lesson={lesson}
                        progress={progress}
                        onOpenTheory={handleOpenLessonTheory}
                        onOpenQuiz={handleOpenLessonQuiz}
                      />
                    );
                  })}
                </div>
              </div>
            )}
          </>
        )}

        {/* VIEW 2: DASHBOARD VIEW (PERSONAL & COLLECTIVE) */}
        {activeTab === 'dashboard' && (
          <DashboardView
            currentStudent={currentStudent}
            allStudents={allStudents}
            allProgress={allProgress}
            onSelectLesson={handleOpenLessonTheory}
            onOpenLogin={() => setIsLoginModalOpen(true)}
          />
        )}

        {/* VIEW 3: EMAIL LOGS INBOX */}
        {activeTab === 'emails' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black text-slate-900">Hộp Thư Báo Cáo Kết Quả Ôn Tập</h2>
                <p className="text-xs text-slate-500">
                  Lưu trữ toàn bộ email gửi tự động cho học sinh kèm phiếu điểm và lời nhận xét sư phạm
                </p>
              </div>

              <button
                onClick={() => setIsEmailModalOpen(true)}
                className="py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md transition cursor-pointer"
              >
                Mở Giao Diện Hộp Thư Toàn Màn Hình
              </button>
            </div>

            {/* In-page email listing */}
            {emailLogs.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500 space-y-3">
                <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="text-base font-bold text-slate-800">Chưa có email nào trong hộp thư</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Hãy hoàn thành phần bài tập 20 câu của một bài học bất kỳ. Hệ thống sẽ ngay lập tức tự động gửi email phiếu điểm và lưu tại đây.
                </p>
                <button
                  onClick={() => setActiveTab('lessons')}
                  className="py-2.5 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition cursor-pointer"
                >
                  Bắt Đầu Ôn Bài Ngay
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {emailLogs.map((log) => (
                  <div key={log.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span>{new Date(log.sentAt).toLocaleDateString('vi-VN')}</span>
                        <span className="text-emerald-600 font-bold">✓ Đã gửi</span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm mt-1">{log.lessonTitle}</h4>
                      <p className="text-xs text-slate-600 font-medium mt-0.5">
                        Người nhận: <strong>{log.studentName}</strong> (Lớp {log.studentClass})
                      </p>
                      <p className="text-[11px] text-slate-400 font-mono truncate">{log.recipientEmail}</p>

                      <div className="grid grid-cols-2 gap-2 my-3 text-center text-xs">
                        <div className="bg-emerald-50 border border-emerald-200 p-2 rounded-lg">
                          <div className="text-[10px] text-emerald-700 font-bold">Lý thuyết</div>
                          <div className="font-black text-emerald-800 text-base">{log.theoryScore}%</div>
                        </div>
                        <div className="bg-blue-50 border border-blue-200 p-2 rounded-lg">
                          <div className="text-[10px] text-blue-700 font-bold">Bài tập 15p</div>
                          <div className="font-black text-blue-800 text-base">{log.quizScore.toFixed(1)}/10</div>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setIsEmailModalOpen(true)}
                      className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition cursor-pointer"
                    >
                      Xem chi tiết thư
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 space-y-1">
          <p className="font-semibold text-slate-700">
            HỆ THỐNG ÔN TẬP TIN HỌC 10 - KẾT NỐI TRI THỨC VỚI CUỘC SỐNG
          </p>
          <p>
            Phục vụ Kiểm Tra Giữa Học Kỳ 1 (Năm Học 2026 - 2027) • Giới hạn kiến thức Bài 16 đến Hết Bài 23
          </p>
          <p className="text-[11px] text-slate-400">
            Tích hợp Giám Sát Chống Gian Lận (Tối Đa 5 Lỗi) • Tự Động Gửi Email Báo Cáo • Phân Tích Cá Nhân & Toàn Lớp
          </p>
        </div>
      </footer>

      {/* Global Modals */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSelectStudent={handleSelectStudent}
        currentStudent={currentStudent}
        onOpenRosterManager={() => setIsRosterModalOpen(true)}
      />

      <EmailModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        emailLogs={emailLogs}
        currentStudentEmail={currentStudent?.email}
      />

      <RosterManagerModal
        isOpen={isRosterModalOpen}
        onClose={() => setIsRosterModalOpen(false)}
        students={allStudents}
        onUpdateStudents={(updated) => setAllStudents(updated)}
      />

      <SgkViewerModal
        isOpen={isSgkModalOpen}
        onClose={() => setIsSgkModalOpen(false)}
        onSelectLesson={handleOpenLessonTheory}
      />
    </div>
  );
}
