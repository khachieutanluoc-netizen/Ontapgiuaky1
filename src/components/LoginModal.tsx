import React, { useState, useEffect } from 'react';
import { Student } from '../types';
import { getStoredStudents } from '../data/studentsData';
import { 
  GraduationCap, 
  Calendar, 
  Mail, 
  Users, 
  CheckCircle2, 
  FileSpreadsheet, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectStudent: (student: Student, email: string) => void;
  currentStudent: Student | null;
  onOpenRosterManager: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onSelectStudent,
  currentStudent,
  onOpenRosterManager,
}) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [selectedStudentId, setSelectedStudentId] = useState<string>('');
  const [dob, setDob] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      const all = getStoredStudents();
      setStudents(all);
      
      const classes = Array.from(new Set(all.map((s) => s.class)));
      if (currentStudent) {
        setSelectedClass(currentStudent.class);
        setSelectedStudentId(currentStudent.id);
        setDob(currentStudent.dob);
        setEmail(currentStudent.email);
      } else if (classes.length > 0) {
        const firstClass = classes[0];
        setSelectedClass(firstClass);
        const classStudents = all.filter(s => s.class === firstClass);
        if (classStudents.length > 0) {
          setSelectedStudentId(classStudents[0].id);
          setDob(classStudents[0].dob);
          setEmail(classStudents[0].email);
        }
      }
      setErrorMsg('');
    }
  }, [isOpen, currentStudent]);

  // When class changes, reset student selection
  const handleClassChange = (newClass: string) => {
    setSelectedClass(newClass);
    const studentsInClass = students.filter((s) => s.class === newClass);
    if (studentsInClass.length > 0) {
      const first = studentsInClass[0];
      setSelectedStudentId(first.id);
      setDob(first.dob);
      setEmail(first.email);
    } else {
      setSelectedStudentId('');
      setDob('');
      setEmail('');
    }
    setErrorMsg('');
  };

  // When student changes
  const handleStudentChange = (id: string) => {
    setSelectedStudentId(id);
    const found = students.find((s) => s.id === id);
    if (found) {
      setDob(found.dob);
      setEmail(found.email);
    }
    setErrorMsg('');
  };

  const handleStartReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClass) {
      setErrorMsg('Vui lòng chọn Lớp của em.');
      return;
    }
    if (!selectedStudentId) {
      setErrorMsg('Vui lòng chọn Họ và tên học sinh.');
      return;
    }
    const foundStudent = students.find((s) => s.id === selectedStudentId);
    if (!foundStudent) {
      setErrorMsg('Không tìm thấy thông tin học sinh trong danh sách.');
      return;
    }

    if (!email || !email.includes('@') || !email.includes('.')) {
      setErrorMsg('Vui lòng nhập địa chỉ email hợp lệ để nhận kết quả bài học.');
      return;
    }

    // Check DOB match
    if (dob.trim() !== foundStudent.dob.trim()) {
      setErrorMsg(`Ngày sinh không khớp với hồ sơ học sinh (${foundStudent.dob}). Vui lòng kiểm tra lại.`);
      return;
    }

    onSelectStudent(
      {
        ...foundStudent,
        email: email.trim(),
      },
      email.trim()
    );
  };

  if (!isOpen) return null;

  const availableClasses = Array.from(new Set(students.map((s) => s.class)));
  const studentsInSelectedClass = students.filter((s) => s.class === selectedClass);
  const currentSelectedStudent = students.find((s) => s.id === selectedStudentId);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Top Banner */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 p-6 text-white text-center relative">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-sm mb-3">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-xl font-bold tracking-tight">HỆ THỐNG ÔN TẬP TIN HỌC 10</h2>
          <p className="text-xs text-blue-100 mt-1">
            Kiểm tra Giữa Học Kỳ 1 (Năm học 2026-2027) • Kiến thức Bài 16 đến Bài 23
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleStartReview} className="p-6 space-y-4">
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 flex items-start space-x-2">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              Học sinh chọn <strong>Lớp</strong>, <strong>Họ tên</strong> và kiểm tra <strong>Ngày sinh</strong> theo danh sách lớp. Nhập địa chỉ <strong>Email</strong> để nhận phiếu kết quả sau mỗi bài học.
            </span>
          </div>

          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-semibold">
              {errorMsg}
            </div>
          )}

          {/* 1. Chọn Lớp */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center justify-between">
              <span>1. Chọn Lớp học:</span>
              <span className="text-slate-400 font-normal lowercase">{availableClasses.length} lớp có sẵn</span>
            </label>
            <div className="relative">
              <select
                aria-label="Chọn Lớp học"
                value={selectedClass}
                onChange={(e) => handleClassChange(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition cursor-pointer"
              >
                {availableClasses.map((cls) => (
                  <option key={cls} value={cls}>
                    Lớp {cls}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 2. Chọn Họ và tên */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center justify-between">
              <span>2. Chọn Họ và tên học sinh:</span>
              <span className="text-slate-400 font-normal lowercase">
                {studentsInSelectedClass.length} học sinh
              </span>
            </label>
            <select
              aria-label="Chọn Họ và tên học sinh"
              value={selectedStudentId}
              onChange={(e) => handleStudentChange(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition cursor-pointer"
            >
              {studentsInSelectedClass.map((st) => (
                <option key={st.id} value={st.id}>
                  {st.fullName} ({st.dob})
                </option>
              ))}
            </select>
          </div>

          {/* 3. Ngày sinh (Tự động điền theo hồ sơ Excel, cho phép xác nhận) */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              3. Ngày sinh (theo hồ sơ lớp):
            </label>
            <div className="relative">
              <input
                type="text"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                placeholder="DD/MM/YYYY (ví dụ: 15/03/2010)"
                className="w-full px-3.5 py-2.5 pl-10 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
              <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            </div>
          </div>

          {/* 4. Nhập địa chỉ email */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 flex items-center justify-between">
              <span>4. Địa chỉ Email học sinh (nhận bài & báo cáo):</span>
              <span className="text-blue-600 font-medium">Bắt buộc</span>
            </label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="em.hocsinh@gmail.com"
                required
                className="w-full px-3.5 py-2.5 pl-10 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              * Hệ thống sẽ tự động gửi email phiếu điểm và lời nhận xét chi tiết sau mỗi bài kiểm tra.
            </p>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-500/25 flex items-center justify-center space-x-2 transition cursor-pointer"
            >
              <span>Vào Ôn Tập & Tải Tiến Trình</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Teacher Tool: Manage Class Roster via Excel */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Dành cho Giáo viên bộ môn:</span>
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenRosterManager();
              }}
              className="text-emerald-700 hover:text-emerald-800 font-semibold flex items-center space-x-1 underline cursor-pointer"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Cập nhật Danh sách từ Excel</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
