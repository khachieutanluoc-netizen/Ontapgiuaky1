import { Student, EmailLog, LessonContent } from '../types';
import { saveEmailLog } from './storage';
import { generatePedagogicalFeedback } from './evaluation';

export interface SendEmailPayload {
  student: Student;
  lesson: LessonContent;
  theoryScore: number;
  quizScore: number;
  correctAnswersCount: number;
  totalQuestions: number;
  violationsCount: number;
  timeSpentSeconds: number;
}

export function generateEmailHtml(payload: SendEmailPayload): string {
  const {
    student,
    lesson,
    theoryScore,
    quizScore,
    correctAnswersCount,
    totalQuestions,
    violationsCount,
    timeSpentSeconds,
  } = payload;

  const minutes = Math.floor(timeSpentSeconds / 60);
  const seconds = timeSpentSeconds % 60;
  const timeFormatted = `${minutes} phút ${seconds < 10 ? '0' : ''}${seconds} giây`;
  const feedback = generatePedagogicalFeedback(
    lesson.title,
    theoryScore,
    quizScore,
    violationsCount
  );

  const formattedDate = new Date().toLocaleString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Phiếu Báo Cáo Kết Quả Ôn Tập Tin Học 10</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f6f9; margin: 0; padding: 20px; color: #1e293b; }
    .container { max-width: 650px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.06); border: 1px solid #e2e8f0; }
    .header { background: linear-gradient(135deg, #2563eb, #1d4ed8); color: white; padding: 32px 24px; text-align: center; }
    .header h1 { margin: 0 0 8px 0; font-size: 24px; font-weight: 700; }
    .header p { margin: 0; opacity: 0.9; font-size: 14px; }
    .body { padding: 28px 24px; }
    .student-badge { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin-bottom: 24px; display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    .student-badge div { font-size: 14px; }
    .student-badge strong { color: #0f172a; }
    .score-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px; }
    .score-card { background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 12px; padding: 18px; text-align: center; }
    .score-card.theory { background: #ecfdf5; border-color: #a7f3d0; }
    .score-card .label { font-size: 13px; color: #64748b; font-weight: 600; text-transform: uppercase; margin-bottom: 6px; }
    .score-card .value { font-size: 28px; font-weight: 800; color: #1e3a8a; }
    .score-card.theory .value { color: #065f46; }
    .detail-table { width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px; }
    .detail-table th, .detail-table td { padding: 12px 14px; text-align: left; border-bottom: 1px solid #f1f5f9; }
    .detail-table th { background: #f8fafc; color: #475569; font-weight: 600; }
    .feedback-box { background: #fffbeb; border-left: 4px solid #f59e0b; padding: 16px; border-radius: 0 12px 12px 0; margin-bottom: 24px; font-size: 14px; line-height: 1.6; white-space: pre-line; }
    .footer { background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 20px 24px; text-align: center; font-size: 13px; color: #64748b; }
    .btn { display: inline-block; background: #2563eb; color: #ffffff; text-decoration: none; padding: 10px 24px; border-radius: 8px; font-weight: 600; font-size: 14px; margin-top: 8px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>PHIẾU BÁO CÁO TIẾN ĐỘ ÔN TẬP</h1>
      <p>Kỳ Kiểm Tra Giữa Học Kỳ 1 - Năm Học 2026-2027 • Môn Tin Học 10 (KNTT)</p>
    </div>
    <div class="body">
      <div class="student-badge">
        <div>Học sinh: <strong>${student.fullName}</strong></div>
        <div>Lớp: <strong>${student.class}</strong></div>
        <div>Ngày sinh: <strong>${student.dob}</strong></div>
        <div>Email: <strong>${student.email}</strong></div>
      </div>

      <h3 style="margin: 0 0 12px 0; color: #1e293b; font-size: 18px;">${lesson.title}</h3>
      <p style="margin: 0 0 20px 0; color: #64748b; font-size: 14px;">Thời gian ghi nhận: ${formattedDate}</p>

      <div class="score-cards">
        <div class="score-card theory">
          <div class="label">Phần 1: Lý Thuyết Tương Tác</div>
          <div class="value">${theoryScore}%</div>
          <div style="font-size: 12px; color: #047857; margin-top: 4px;">(Yêu cầu: ≥ 80% để mở bài tập)</div>
        </div>
        <div class="score-card">
          <div class="label">Phần 2: Kiểm Tra 15 Phút</div>
          <div class="value">${quizScore} / 10</div>
          <div style="font-size: 12px; color: #1d4ed8; margin-top: 4px;">Đúng ${correctAnswersCount}/${totalQuestions} câu</div>
        </div>
      </div>

      <table class="detail-table">
        <tr>
          <th>Chỉ số</th>
          <th>Kết quả thực hiện</th>
        </tr>
        <tr>
          <td>Thời gian làm bài tập</td>
          <td><strong>${timeFormatted}</strong></td>
        </tr>
        <tr>
          <td>Giám sát thi (chống gian lận)</td>
          <td>
            <strong style="color: ${violationsCount === 0 ? '#10b981' : violationsCount >= 3 ? '#ef4444' : '#f59e0b'};">
              ${violationsCount} / 5 lần vi phạm
            </strong>
            ${violationsCount === 0 ? '(Nghiêm túc xuất sắc)' : '(Chuyển tab/mất tiêu điểm)'}
          </td>
        </tr>
        <tr>
          <td>Trạng thái hoàn thành</td>
          <td><span style="color: #10b981; font-weight: 700;">✓ Đã hoàn thành và lưu tiến trình</span></td>
        </tr>
      </table>

      <div class="feedback-box">
        <strong>Lời nhận xét & dặn dò của giáo viên bộ môn:</strong><br/>
        ${feedback}
      </div>

      <p style="font-size: 13px; color: #64748b;">
        * Hệ thống đã tự động đồng bộ kết quả này vào cơ sở dữ liệu học tập của nhà trường và trang Dashboard theo dõi tiến độ chung của lớp.
      </p>
    </div>
    <div class="footer">
      Hệ thống Ôn tập & Kiểm tra Trực tuyến Tin học 10 • Tổ Tin học Trường THPT<br/>
      Năm học 2026 - 2027
    </div>
  </div>
</body>
</html>
  `.trim();
}

export function sendStudentLessonReport(payload: SendEmailPayload): EmailLog {
  const emailLog: EmailLog = {
    id: `email_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    studentId: payload.student.id,
    studentName: payload.student.fullName,
    studentClass: payload.student.class,
    recipientEmail: payload.student.email,
    lessonId: payload.lesson.id,
    lessonTitle: payload.lesson.title,
    theoryScore: payload.theoryScore,
    quizScore: payload.quizScore,
    correctAnswersCount: payload.correctAnswersCount,
    totalQuestions: payload.totalQuestions,
    violationsCount: payload.violationsCount,
    sentAt: new Date().toISOString(),
    status: 'delivered',
    feedback: generatePedagogicalFeedback(
      payload.lesson.title,
      payload.theoryScore,
      payload.quizScore,
      payload.violationsCount
    ),
  };

  saveEmailLog(emailLog);
  return emailLog;
}

export function exportClassroomResultsToCSV(
  students: Student[],
  progressMap: Record<string, any>
): string {
  // UTF-8 BOM for Excel Vietnamese compatibility
  const BOM = '\uFEFF';
  const headers = [
    'Mã HS',
    'Lớp',
    'Họ và tên',
    'Ngày sinh',
    'Email',
    'Số bài đã đạt lý thuyết',
    'Số bài đã kiểm tra',
    'Điểm TB (10)',
    'Bài 16',
    'Bài 17',
    'Bài 18',
    'Bài 19',
    'Bài 20',
    'Bài 21',
    'Bài 22',
    'Bài 23',
  ];

  const rows = students.map((st) => {
    let completedQuizzes = 0;
    let totalScore = 0;
    let passedTheories = 0;

    const lessonScores: (number | string)[] = [];
    for (let lessonId = 16; lessonId <= 23; lessonId++) {
      const key = `${st.id}_${lessonId}`;
      const prog = progressMap[key];
      if (prog) {
        if (prog.theoryCompleted && prog.theoryScore >= 80) passedTheories++;
        if (prog.quizCompleted) {
          completedQuizzes++;
          totalScore += prog.quizScore;
          lessonScores.push(prog.quizScore.toFixed(1));
        } else {
          lessonScores.push(prog.theoryCompleted ? 'Đạt LT' : '-');
        }
      } else {
        lessonScores.push('-');
      }
    }

    const avgScore = completedQuizzes > 0 ? (totalScore / completedQuizzes).toFixed(1) : '-';

    return [
      `"${st.id}"`,
      `"${st.class}"`,
      `"${st.fullName}"`,
      `"${st.dob}"`,
      `"${st.email}"`,
      passedTheories,
      completedQuizzes,
      avgScore,
      ...lessonScores.map((s) => `"${s}"`),
    ].join(',');
  });

  return BOM + [headers.join(','), ...rows].join('\n');
}
