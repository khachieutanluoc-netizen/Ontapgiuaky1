import React, { useState } from 'react';
import { Student } from '../types';
import { 
  FileSpreadsheet, 
  Upload, 
  Download, 
  Plus, 
  Trash2, 
  RotateCcw, 
  X, 
  CheckCircle2, 
  AlertCircle,
  Search
} from 'lucide-react';
import { resetStoredStudents, saveStoredStudents } from '../data/studentsData';

interface RosterManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  students: Student[];
  onUpdateStudents: (updated: Student[]) => void;
}

export const RosterManagerModal: React.FC<RosterManagerModalProps> = ({
  isOpen,
  onClose,
  students,
  onUpdateStudents,
}) => {
  const [activeClassTab, setActiveClassTab] = useState<string>('ALL');
  const [search, setSearch] = useState<string>('');
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [newStudent, setNewStudent] = useState<Partial<Student>>({
    class: '10A1',
    fullName: '',
    dob: '',
    email: '',
  });
  const [msg, setMsg] = useState<{ text: string; isError: boolean } | null>(null);

  if (!isOpen) return null;

  const classes = Array.from(new Set(students.map((s) => s.class)));

  const filtered = students.filter((s) => {
    const matchClass = activeClassTab === 'ALL' || s.class === activeClassTab;
    const matchSearch =
      s.fullName.toLowerCase().includes(search.toLowerCase()) ||
      s.id.toLowerCase().includes(search.toLowerCase());
    return matchClass && matchSearch;
  });

  // Download Sample CSV
  const handleDownloadSample = () => {
    const BOM = '\uFEFF';
    const sampleCsv = 
`${BOM}Mã HS,Lớp,Họ và tên,Ngày sinh,Email
10A1-01,10A1,Nguyễn Văn An,15/03/2010,nguyenvanan.10a1@school.edu.vn
10A1-02,10A1,Trần Thị Bích,22/07/2010,tranthibich.10a1@school.edu.vn
10A2-01,10A2,Trịnh Thanh Bình,14/01/2010,trinhthanhbinh.10a2@school.edu.vn
10A3-01,10A3,Phan Tấn Lộc,10/02/2010,phantanloc.10a3@school.edu.vn`;

    const blob = new Blob([sampleCsv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Mau_Danh_Sach_Hoc_Sinh_TinHoc10.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setMsg({ text: 'Đã tải tệp mẫu Excel/CSV xuống máy tính.', isError: false });
  };

  // Upload and parse CSV
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const text = evt.target?.result as string;
        const lines = text.split(/\r?\n/).filter(line => line.trim().length > 0);
        if (lines.length < 2) {
          setMsg({ text: 'Tệp không chứa dữ liệu học sinh.', isError: true });
          return;
        }

        const parsed: Student[] = [];
        // Skip header
        for (let i = 1; i < lines.length; i++) {
          const parts = lines[i].split(',').map(p => p.trim().replace(/^"|"$/g, ''));
          if (parts.length >= 4) {
            parsed.push({
              id: parts[0] || `HS_${Date.now()}_${i}`,
              class: parts[1] || '10A1',
              fullName: parts[2] || 'Học sinh mới',
              dob: parts[3] || '01/01/2010',
              email: parts[4] || `${parts[0].toLowerCase()}@school.edu.vn`,
            });
          }
        }

        if (parsed.length > 0) {
          saveStoredStudents(parsed);
          onUpdateStudents(parsed);
          setMsg({ text: `Đã nạp thành công ${parsed.length} học sinh từ tệp tin!`, isError: false });
        } else {
          setMsg({ text: 'Không tìm thấy dòng học sinh hợp lệ trong tệp.', isError: true });
        }
      } catch (err) {
        setMsg({ text: 'Lỗi khi đọc file. Vui lòng đảm bảo file định dạng CSV chuẩn UTF-8.', isError: true });
      }
    };
    reader.readAsText(file, 'utf-8');
  };

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudent.fullName || !newStudent.dob || !newStudent.class) {
      setMsg({ text: 'Vui lòng điền đủ Lớp, Họ tên và Ngày sinh.', isError: true });
      return;
    }

    const cls = newStudent.class;
    const countInClass = students.filter(s => s.class === cls).length + 1;
    const generatedId = `${cls}-${countInClass < 10 ? '0' : ''}${countInClass}`;

    const created: Student = {
      id: generatedId,
      class: cls,
      fullName: newStudent.fullName.trim(),
      dob: newStudent.dob.trim(),
      email: newStudent.email?.trim() || `${generatedId.toLowerCase()}@school.edu.vn`,
    };

    const updated = [...students, created];
    saveStoredStudents(updated);
    onUpdateStudents(updated);
    setShowAddForm(false);
    setNewStudent({ class: cls, fullName: '', dob: '', email: '' });
    setMsg({ text: `Đã thêm thành công học sinh ${created.fullName}!`, isError: false });
  };

  const handleDelete = (id: string) => {
    const updated = students.filter(s => s.id !== id);
    saveStoredStudents(updated);
    onUpdateStudents(updated);
    setMsg({ text: 'Đã xóa học sinh khỏi danh sách.', isError: false });
  };

  const handleResetDefault = () => {
    if (window.confirm('Khôi phục danh sách học sinh mẫu ban đầu?')) {
      const def = resetStoredStudents();
      onUpdateStudents(def);
      setMsg({ text: 'Đã khôi phục danh sách học sinh mặc định.', isError: false });
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-slate-100 animate-in zoom-in-95">
        
        {/* Header */}
        <div className="px-6 py-4 bg-emerald-700 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <FileSpreadsheet className="w-5 h-5 text-emerald-200" />
            <div>
              <h3 className="font-bold text-base">Quản Lý Danh Sách Học Sinh (Excel / CSV)</h3>
              <p className="text-xs text-emerald-100">
                Cho phép giáo viên nạp danh sách học sinh theo lớp, tải file mẫu và quản lý hồ sơ ôn tập
              </p>
            </div>
          </div>

          <button onClick={onClose} className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <label className="relative cursor-pointer inline-flex items-center space-x-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm transition">
              <Upload className="w-4 h-4" />
              <span>Nạp File Excel / CSV</span>
              <input
                type="file"
                accept=".csv, .txt, .xlsx, .xls"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>

            <button
              onClick={handleDownloadSample}
              className="inline-flex items-center space-x-1.5 px-3 py-2 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-xl text-xs font-semibold transition cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Tải Mẫu Excel</span>
            </button>

            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="inline-flex items-center space-x-1.5 px-3 py-2 bg-blue-50 border border-blue-200 hover:bg-blue-100 text-blue-700 rounded-xl text-xs font-bold transition cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Thêm Học Sinh Mới</span>
            </button>
          </div>

          <button
            onClick={handleResetDefault}
            className="inline-flex items-center space-x-1 text-slate-500 hover:text-slate-800 text-xs font-medium cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Khôi phục mặc định</span>
          </button>
        </div>

        {/* Feedback message */}
        {msg && (
          <div className={`mx-6 mt-4 p-3 rounded-xl text-xs font-semibold flex items-center space-x-2 ${
            msg.isError ? 'bg-rose-50 text-rose-700 border border-rose-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
          }`}>
            {msg.isError ? <AlertCircle className="w-4 h-4 shrink-0" /> : <CheckCircle2 className="w-4 h-4 shrink-0" />}
            <span>{msg.text}</span>
          </div>
        )}

        {/* Add Student Form */}
        {showAddForm && (
          <form onSubmit={handleAddStudent} className="mx-6 mt-4 p-4 bg-blue-50/60 border border-blue-200 rounded-xl grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <label className="font-bold text-slate-700 block mb-1">Lớp:</label>
              <input
                type="text"
                value={newStudent.class}
                onChange={(e) => setNewStudent({ ...newStudent, class: e.target.value })}
                placeholder="10A1"
                required
                className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Họ và tên:</label>
              <input
                type="text"
                value={newStudent.fullName}
                onChange={(e) => setNewStudent({ ...newStudent, fullName: e.target.value })}
                placeholder="Nguyễn Văn A"
                required
                className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 block mb-1">Ngày sinh (DD/MM/YYYY):</label>
              <input
                type="text"
                value={newStudent.dob}
                onChange={(e) => setNewStudent({ ...newStudent, dob: e.target.value })}
                placeholder="15/03/2010"
                required
                className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg"
              />
            </div>
            <div className="flex items-end space-x-2">
              <button
                type="submit"
                className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg cursor-pointer"
              >
                Lưu Học Sinh
              </button>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="py-2 px-3 bg-slate-200 text-slate-700 font-semibold rounded-lg"
              >
                Hủy
              </button>
            </div>
          </form>
        )}

        {/* Filters and Search */}
        <div className="p-4 px-6 flex flex-wrap items-center justify-between gap-3 border-b border-slate-100">
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0">
            <button
              onClick={() => setActiveClassTab('ALL')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                activeClassTab === 'ALL'
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Tất cả ({students.length})
            </button>
            {classes.map((cls) => (
              <button
                key={cls}
                onClick={() => setActiveClassTab(cls)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                  activeClassTab === cls
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Lớp {cls}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm theo tên học sinh..."
              className="w-full px-3 py-1.5 pl-8 bg-slate-50 border border-slate-300 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2" />
          </div>
        </div>

        {/* Students Table */}
        <div className="flex-1 overflow-y-auto p-6 pt-2">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-500 font-bold uppercase text-[11px]">
                <th className="py-2.5 px-3">Mã HS</th>
                <th className="py-2.5 px-2">Lớp</th>
                <th className="py-2.5 px-3">Họ và tên</th>
                <th className="py-2.5 px-3">Ngày sinh</th>
                <th className="py-2.5 px-3">Email nhận kết quả</th>
                <th className="py-2.5 px-2 text-right">Xóa</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((st) => (
                <tr key={st.id} className="hover:bg-slate-50 transition">
                  <td className="py-2.5 px-3 font-mono font-semibold text-slate-600">{st.id}</td>
                  <td className="py-2.5 px-2 font-bold text-slate-800">{st.class}</td>
                  <td className="py-2.5 px-3 font-semibold text-slate-900">{st.fullName}</td>
                  <td className="py-2.5 px-3 text-slate-600">{st.dob}</td>
                  <td className="py-2.5 px-3 text-slate-500 font-mono text-xs truncate max-w-[200px]">{st.email}</td>
                  <td className="py-2.5 px-2 text-right">
                    <button
                      onClick={() => handleDelete(st.id)}
                      className="p-1 text-slate-400 hover:text-rose-600 transition"
                      title="Xóa học sinh này"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-between items-center text-xs text-slate-500">
          <span>Tổng số học sinh hiển thị: <strong>{filtered.length}</strong></span>
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
