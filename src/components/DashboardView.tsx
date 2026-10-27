import React, { useState } from 'react';
import { Student, StudentProgress } from '../types';
import { ALL_LESSONS } from '../data/lessonsData';
import { exportClassroomResultsToCSV } from '../utils/mailer';
import { 
  User, 
  Users, 
  Award, 
  Download, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  BarChart, 
  TrendingUp, 
  Trophy, 
  ShieldCheck, 
  BookOpen, 
  Clock 
} from 'lucide-react';

interface DashboardViewProps {
  currentStudent: Student | null;
  allStudents: Student[];
  allProgress: Record<string, StudentProgress>;
  onSelectLesson: (lessonId: number) => void;
  onOpenLogin: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  currentStudent,
  allStudents,
  allProgress,
  onSelectLesson,
  onOpenLogin,
}) => {
  const [activeTab, setActiveTab] = useState<'personal' | 'collective'>('personal');
  const [selectedClassFilter, setSelectedClassFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const allClasses = Array.from(new Set(allStudents.map((s) => s.class)));

  // Filter students for collective view
  const filteredStudents = allStudents.filter((st) => {
    const matchesClass = selectedClassFilter === 'ALL' || st.class === selectedClassFilter;
    const matchesSearch =
      st.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      st.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesClass && matchesSearch;
  });

  // Calculate personal metrics
  const personalProgressList = ALL_LESSONS.map((l) => {
    const key = currentStudent ? `${currentStudent.id}_${l.id}` : '';
    return {
      lesson: l,
      progress: allProgress[key] || null,
    };
  });

  const passedTheoryCount = personalProgressList.filter(
    (item) => item.progress && item.progress.theoryCompleted && item.progress.theoryScore >= 80
  ).length;

  const completedQuizCount = personalProgressList.filter(
    (item) => item.progress && item.progress.quizCompleted
  ).length;

  const totalQuizScore = personalProgressList.reduce(
    (acc, cur) => acc + (cur.progress?.quizCompleted ? cur.progress.quizScore : 0),
    0
  );
  const avgQuizScore = completedQuizCount > 0 ? (totalQuizScore / completedQuizCount).toFixed(1) : '0.0';

  // Collective metrics
  const classStudents = selectedClassFilter === 'ALL' 
    ? allStudents 
    : allStudents.filter(s => s.class === selectedClassFilter);

  // Compute student rankings for collective leaderboard
  const studentRankings = classStudents.map((st) => {
    let completedCount = 0;
    let scoreSum = 0;
    let theoryPassed = 0;
    let violationsTotal = 0;

    ALL_LESSONS.forEach((l) => {
      const key = `${st.id}_${l.id}`;
      const p = allProgress[key];
      if (p) {
        if (p.theoryCompleted && p.theoryScore >= 80) theoryPassed++;
        if (p.quizCompleted) {
          completedCount++;
          scoreSum += p.quizScore;
        }
        violationsTotal += p.violationsCount || 0;
      }
    });

    const average = completedCount > 0 ? scoreSum / completedCount : 0;
    return {
      student: st,
      completedCount,
      averageScore: average,
      theoryPassed,
      violationsTotal,
    };
  }).sort((a, b) => b.averageScore - a.averageScore || b.completedCount - a.completedCount);

  // Compute average score per lesson across the class
  const lessonAnalytics = ALL_LESSONS.map((l) => {
    let sumScore = 0;
    let attempts = 0;
    let passedTheory = 0;

    classStudents.forEach((st) => {
      const key = `${st.id}_${l.id}`;
      const p = allProgress[key];
      if (p) {
        if (p.theoryCompleted && p.theoryScore >= 80) passedTheory++;
        if (p.quizCompleted) {
          sumScore += p.quizScore;
          attempts++;
        }
      }
    });

    const avg = attempts > 0 ? sumScore / attempts : 0;
    return {
      lesson: l,
      avgScore: avg,
      completionRate: Math.round((attempts / classStudents.length) * 100),
      passedTheoryRate: Math.round((passedTheory / classStudents.length) * 100),
    };
  });

  // Handle Export CSV
  const handleExportCSV = () => {
    const csvData = exportClassroomResultsToCSV(filteredStudents, allProgress);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Bang_Diem_TinHoc10_KNTT_${selectedClassFilter}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-16 animate-in fade-in duration-200">
      
      {/* Dashboard Top Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-1 text-xs font-bold rounded-md bg-blue-100 text-blue-800">
              Phân Hệ Thống Kê & Đánh Giá
            </span>
            <span className="text-xs text-slate-400 font-medium">Năm học 2026-2027</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 mt-1">Dashboard Tiến Độ Học Tập</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Theo dõi chi tiết kết quả ôn tập cá nhân và báo cáo tổng hợp thi đua toàn lớp
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex bg-slate-100 p-1 rounded-xl self-start md:self-center border border-slate-200">
          <button
            onClick={() => setActiveTab('personal')}
            className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition ${
              activeTab === 'personal'
                ? 'bg-white text-blue-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Tiến Độ Cá Nhân</span>
          </button>

          <button
            onClick={() => setActiveTab('collective')}
            className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center space-x-1.5 transition ${
              activeTab === 'collective'
                ? 'bg-white text-blue-700 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Tiến Độ Tập Thể (Toàn Lớp)</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Personal Dashboard */}
      {activeTab === 'personal' && (
        <div className="space-y-6">
          
          {/* Current Student Profile Banner */}
          {currentStudent ? (
            <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 rounded-2xl p-6 text-white shadow-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center font-black text-xl text-white">
                    {currentStudent.fullName.split(' ').pop()?.[0] || 'HS'}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{currentStudent.fullName}</h2>
                    <p className="text-xs text-blue-100 mt-0.5">
                      Lớp {currentStudent.class} • Ngày sinh: {currentStudent.dob} • Email: {currentStudent.email}
                    </p>
                  </div>
                </div>

                <button
                  onClick={onOpenLogin}
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-xl text-xs font-bold transition self-start sm:self-center border border-white/30"
                >
                  Đổi tài khoản học sinh
                </button>
              </div>

              {/* Quick Stat Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/15">
                <div className="bg-white/10 rounded-xl p-3 border border-white/10">
                  <div className="text-[11px] text-blue-100 uppercase font-semibold">Đạt Lý Thuyết (≥80%)</div>
                  <div className="text-2xl font-black mt-0.5">{passedTheoryCount} / 8 <span className="text-xs font-normal">bài</span></div>
                </div>

                <div className="bg-white/10 rounded-xl p-3 border border-white/10">
                  <div className="text-[11px] text-blue-100 uppercase font-semibold">Đã Kiểm Tra (15p)</div>
                  <div className="text-2xl font-black mt-0.5">{completedQuizCount} / 8 <span className="text-xs font-normal">bài</span></div>
                </div>

                <div className="bg-white/10 rounded-xl p-3 border border-white/10">
                  <div className="text-[11px] text-blue-100 uppercase font-semibold">Điểm Trung Bình</div>
                  <div className="text-2xl font-black mt-0.5">{avgQuizScore} <span className="text-xs font-normal">/ 10</span></div>
                </div>

                <div className="bg-white/10 rounded-xl p-3 border border-white/10">
                  <div className="text-[11px] text-blue-100 uppercase font-semibold">Tỷ Lệ Hoàn Thành</div>
                  <div className="text-2xl font-black mt-0.5">
                    {Math.round((completedQuizCount / 8) * 100)}%
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-center space-y-3">
              <AlertCircle className="w-10 h-10 text-amber-600 mx-auto" />
              <h3 className="text-base font-bold text-amber-900">Em chưa đăng nhập ôn tập</h3>
              <p className="text-xs text-amber-700 max-w-md mx-auto">
                Vui lòng chọn Lớp, Họ tên và nhập Email để lưu và khôi phục toàn bộ tiến trình ôn tập của mình.
              </p>
              <button
                onClick={onOpenLogin}
                className="py-2.5 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md transition cursor-pointer"
              >
                Đăng Nhập Ngay
              </button>
            </div>
          )}

          {/* Lesson Progress Table (Bài 16 -> 23) */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              <span>Tiến Độ Từng Bài Học (Bài 16 đến Bài 23)</span>
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-bold uppercase text-[11px]">
                    <th className="py-3 px-4">Bài học</th>
                    <th className="py-3 px-3">Phần 1: Lý Thuyết</th>
                    <th className="py-3 px-3">Phần 2: Kiểm Tra 15p</th>
                    <th className="py-3 px-3">Vi phạm giám sát</th>
                    <th className="py-3 px-3">Trạng thái</th>
                    <th className="py-3 px-4 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {personalProgressList.map(({ lesson, progress }) => {
                    const isTheoryPassed = progress && progress.theoryCompleted && progress.theoryScore >= 80;
                    const isQuizDone = progress && progress.quizCompleted;

                    return (
                      <tr key={lesson.id} className="hover:bg-slate-50/70 transition">
                        <td className="py-3.5 px-4 font-semibold text-slate-900">
                          <div>{lesson.title}</div>
                          <div className="text-[11px] text-slate-400 font-normal">{lesson.subtitle}</div>
                        </td>

                        <td className="py-3.5 px-3">
                          {progress && progress.theoryCompleted ? (
                            <span className={`font-bold ${isTheoryPassed ? 'text-emerald-600' : 'text-amber-600'}`}>
                              {progress.theoryScore}% {isTheoryPassed ? '(Đạt)' : '(Chưa đạt)'}
                            </span>
                          ) : (
                            <span className="text-slate-400">Chưa học</span>
                          )}
                        </td>

                        <td className="py-3.5 px-3">
                          {isQuizDone ? (
                            <div>
                              <span className="font-extrabold text-blue-700 text-sm">
                                {progress.quizScore.toFixed(1)} / 10
                              </span>
                              <span className="text-[11px] text-slate-500 block">
                                Đúng {progress.quizCorrectCount}/20 câu
                              </span>
                            </div>
                          ) : isTheoryPassed ? (
                            <span className="text-blue-600 font-semibold text-xs">Sẵn sàng thi</span>
                          ) : (
                            <span className="text-slate-400 text-xs">Khoá</span>
                          )}
                        </td>

                        <td className="py-3.5 px-3">
                          {isQuizDone ? (
                            <span className={`font-bold ${progress.violationsCount === 0 ? 'text-emerald-600' : 'text-amber-600'}`}>
                              {progress.violationsCount}/5 lần
                            </span>
                          ) : (
                            <span className="text-slate-300">-</span>
                          )}
                        </td>

                        <td className="py-3.5 px-3">
                          {isQuizDone ? (
                            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                              Hoàn thành
                            </span>
                          ) : isTheoryPassed ? (
                            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                              Đã đạt LT
                            </span>
                          ) : (
                            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                              Chưa đạt
                            </span>
                          )}
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => onSelectLesson(lesson.id)}
                            className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold text-xs transition cursor-pointer"
                          >
                            {isQuizDone ? 'Ôn lại' : isTheoryPassed ? 'Vào thi' : 'Học bài'}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Python Mastery Badges */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <Award className="w-5 h-5 text-amber-500" />
              <span>Huy Hiệu Thành Tích Python Của Em</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className={`p-4 rounded-xl border text-center space-y-1 ${
                passedTheoryCount >= 1 ? 'bg-amber-50 border-amber-300 text-amber-900' : 'bg-slate-50 border-slate-200 opacity-40'
              }`}>
                <div className="text-2xl">🌱</div>
                <div className="text-xs font-bold">Khởi Đầu Python</div>
                <div className="text-[10px] text-slate-500">Hoàn thành bài lý thuyết đầu tiên</div>
              </div>

              <div className={`p-4 rounded-xl border text-center space-y-1 ${
                passedTheoryCount >= 4 ? 'bg-blue-50 border-blue-300 text-blue-900' : 'bg-slate-50 border-slate-200 opacity-40'
              }`}>
                <div className="text-2xl">⚡</div>
                <div className="text-xs font-bold">Tư Duy Cấu Trúc</div>
                <div className="text-[10px] text-slate-500">Đạt 4 bài lý thuyết (Bài 16-19)</div>
              </div>

              <div className={`p-4 rounded-xl border text-center space-y-1 ${
                passedTheoryCount >= 8 ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-slate-50 border-slate-200 opacity-40'
              }`}>
                <div className="text-2xl">🏆</div>
                <div className="text-xs font-bold">Chinh Phục 8 Bài</div>
                <div className="text-[10px] text-slate-500">Hoàn thành toàn bộ lý thuyết 16-23</div>
              </div>

              <div className={`p-4 rounded-xl border text-center space-y-1 ${
                completedQuizCount >= 1 && Number(avgQuizScore) >= 9.0 ? 'bg-purple-50 border-purple-300 text-purple-900' : 'bg-slate-50 border-slate-200 opacity-40'
              }`}>
                <div className="text-2xl">💎</div>
                <div className="text-xs font-bold">Thủ Khoa Tin Học</div>
                <div className="text-[10px] text-slate-500">Điểm trung bình kiểm tra ≥ 9.0</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Collective Classroom Dashboard */}
      {activeTab === 'collective' && (
        <div className="space-y-6">
          
          {/* Controls Bar: Class Filter, Search, Export Excel */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            
            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <div>
                <label className="text-[11px] font-bold text-slate-500 uppercase block mb-1">
                  Chọn Lớp:
                </label>
                <select
                  aria-label="Lọc theo Lớp học"
                  value={selectedClassFilter}
                  onChange={(e) => setSelectedClassFilter(e.target.value)}
                  className="px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                >
                  <option value="ALL">Toàn Khối 10 (Tất cả các lớp)</option>
                  {allClasses.map((cls) => (
                    <option key={cls} value={cls}>
                      Lớp {cls}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex-1 min-w-[200px]">
                <label className="text-[11px] font-bold text-slate-500 uppercase block mb-1">
                  Tìm kiếm học sinh:
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Tìm theo tên học sinh..."
                    className="w-full px-3.5 py-2 pl-9 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                </div>
              </div>
            </div>

            <button
              onClick={handleExportCSV}
              className="w-full md:w-auto py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-600/20 flex items-center justify-center space-x-2 transition cursor-pointer self-end"
            >
              <Download className="w-4 h-4" />
              <span>Xuất Bảng Điểm Excel (.CSV)</span>
            </button>
          </div>

          {/* Class Analytics Overview by Lesson */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <span>Phân Tích Năng Lực Theo Từng Bài (Bài 16 đến Bài 23)</span>
            </h3>
            <p className="text-xs text-slate-500">
              Giúp giáo viên phát hiện ngay bài học sinh nắm vững nhất hoặc bài học sinh hay mắc lỗi để bổ trợ trước ngày thi giữa kỳ.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              {lessonAnalytics.map(({ lesson, avgScore, completionRate, passedTheoryRate }) => (
                <div key={lesson.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="w-6 h-6 rounded bg-blue-100 text-blue-800 font-extrabold text-xs flex items-center justify-center">
                      {lesson.id}
                    </span>
                    <span className="text-xs font-black text-slate-800">
                      ĐTB: <span className="text-blue-600">{avgScore > 0 ? avgScore.toFixed(1) : '-'}</span> / 10
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{lesson.title.split(':')[1] || lesson.title}</h4>
                  
                  {/* Progress bars */}
                  <div className="space-y-1 pt-1 text-[11px] text-slate-500">
                    <div className="flex justify-between">
                      <span>Đạt lý thuyết:</span>
                      <span className="font-bold text-emerald-700">{passedTheoryRate}%</span>
                    </div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${passedTheoryRate}%` }} />
                    </div>

                    <div className="flex justify-between pt-1">
                      <span>Đã làm kiểm tra:</span>
                      <span className="font-bold text-blue-700">{completionRate}%</span>
                    </div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-blue-500 h-full rounded-full" style={{ width: `${completionRate}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Collective Leaderboard Table */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-amber-500" />
                <span>Bảng Xếp Hạng Học Tập {selectedClassFilter === 'ALL' ? 'Toàn Khối 10' : `Lớp ${selectedClassFilter}`}</span>
              </h3>
              <span className="text-xs text-slate-500 font-medium">
                {studentRankings.length} học sinh
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-bold uppercase text-[11px]">
                    <th className="py-3 px-3 text-center">Hạng</th>
                    <th className="py-3 px-3">Mã HS</th>
                    <th className="py-3 px-4">Họ và tên</th>
                    <th className="py-3 px-3">Lớp</th>
                    <th className="py-3 px-3 text-center">Lý thuyết đạt</th>
                    <th className="py-3 px-3 text-center">Bài đã thi</th>
                    <th className="py-3 px-3 text-center">Điểm TB</th>
                    <th className="py-3 px-3 text-center">Vi phạm</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {studentRankings.map((r, rankIdx) => {
                    const isTop1 = rankIdx === 0;
                    const isTop2 = rankIdx === 1;
                    const isTop3 = rankIdx === 2;
                    const isCurrent = currentStudent?.id === r.student.id;

                    return (
                      <tr 
                        key={r.student.id} 
                        className={`transition ${isCurrent ? 'bg-blue-50/80 font-bold' : 'hover:bg-slate-50/70'}`}
                      >
                        <td className="py-3 px-3 text-center font-bold">
                          {isTop1 ? '🥇 1' : isTop2 ? '🥈 2' : isTop3 ? '🥉 3' : rankIdx + 1}
                        </td>
                        <td className="py-3 px-3 font-mono text-slate-500">{r.student.id}</td>
                        <td className="py-3 px-4 font-semibold text-slate-900">
                          {r.student.fullName}
                          {isCurrent && <span className="ml-2 text-[10px] bg-blue-600 text-white px-1.5 py-0.5 rounded">Em</span>}
                        </td>
                        <td className="py-3 px-3 text-slate-600">{r.student.class}</td>
                        <td className="py-3 px-3 text-center font-bold text-emerald-600">
                          {r.theoryPassed} / 8
                        </td>
                        <td className="py-3 px-3 text-center font-bold text-blue-600">
                          {r.completedCount} / 8
                        </td>
                        <td className="py-3 px-3 text-center">
                          <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-900 font-extrabold">
                            {r.averageScore > 0 ? r.averageScore.toFixed(1) : '-'}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-center text-slate-500 font-medium">
                          {r.violationsTotal}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
