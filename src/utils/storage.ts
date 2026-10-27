import { Student, StudentProgress, EmailLog } from '../types';
import { generatePedagogicalFeedback } from './evaluation';

const STORAGE_KEY_CURRENT_STUDENT = 'tinhoc10_current_student';
const STORAGE_KEY_ALL_PROGRESS = 'tinhoc10_all_progress_v2';
const STORAGE_KEY_EMAIL_LOGS = 'tinhoc10_email_logs_v2';

// Get active logged-in student
export function getCurrentStudent(): Student | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CURRENT_STUDENT);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setCurrentStudent(student: Student | null): void {
  if (student) {
    localStorage.setItem(STORAGE_KEY_CURRENT_STUDENT, JSON.stringify(student));
  } else {
    localStorage.removeItem(STORAGE_KEY_CURRENT_STUDENT);
  }
}

// Get all progress records from localStorage
export function getAllProgress(): Record<string, StudentProgress> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ALL_PROGRESS);
    if (!raw) {
      const initial = generateSeedProgress();
      localStorage.setItem(STORAGE_KEY_ALL_PROGRESS, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch {
    return generateSeedProgress();
  }
}

// Progress key: `${studentId}_${lessonId}`
export function getStudentProgressForLesson(studentId: string, lessonId: number): StudentProgress {
  const all = getAllProgress();
  const key = `${studentId}_${lessonId}`;
  if (all[key]) {
    return all[key];
  }
  return {
    studentId,
    email: '',
    lessonId,
    theoryCompleted: false,
    theoryScore: 0,
    quizUnlocked: false,
    quizCompleted: false,
    quizScore: 0,
    quizCorrectCount: 0,
    timeSpentSeconds: 0,
    violationsCount: 0,
    violationLogs: [],
    lastUpdated: new Date().toISOString(),
    quizAttempts: 0,
  };
}

export function saveStudentProgress(progress: StudentProgress): void {
  const all = getAllProgress();
  const key = `${progress.studentId}_${progress.lessonId}`;
  all[key] = {
    ...progress,
    lastUpdated: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEY_ALL_PROGRESS, JSON.stringify(all));
}

// Email logs
export function getEmailLogs(): EmailLog[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_EMAIL_LOGS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveEmailLog(log: EmailLog): void {
  const logs = getEmailLogs();
  logs.unshift(log); // Prepend
  localStorage.setItem(STORAGE_KEY_EMAIL_LOGS, JSON.stringify(logs.slice(0, 100))); // Keep last 100
}

// Helper: Seed data for class dashboard demonstration so charts and analytics are vibrant
function generateSeedProgress(): Record<string, StudentProgress> {
  const seed: Record<string, StudentProgress> = {};
  
  // Seed for 10A1-02 (Trần Thị Bích)
  seed['10A1-02_16'] = {
    studentId: '10A1-02',
    email: 'tranthibich.10a1@school.edu.vn',
    lessonId: 16,
    theoryCompleted: true,
    theoryScore: 100,
    quizUnlocked: true,
    quizCompleted: true,
    quizScore: 9.5,
    quizCorrectCount: 19,
    timeSpentSeconds: 680,
    violationsCount: 0,
    violationLogs: [],
    lastUpdated: '2026-10-24T08:30:00.000Z',
    quizAttempts: 1,
  };
  seed['10A1-02_17'] = {
    studentId: '10A1-02',
    email: 'tranthibich.10a1@school.edu.vn',
    lessonId: 17,
    theoryCompleted: true,
    theoryScore: 90,
    quizUnlocked: true,
    quizCompleted: true,
    quizScore: 9.0,
    quizCorrectCount: 18,
    timeSpentSeconds: 710,
    violationsCount: 0,
    violationLogs: [],
    lastUpdated: '2026-10-24T09:15:00.000Z',
    quizAttempts: 1,
  };
  seed['10A1-02_18'] = {
    studentId: '10A1-02',
    email: 'tranthibich.10a1@school.edu.vn',
    lessonId: 18,
    theoryCompleted: true,
    theoryScore: 85,
    quizUnlocked: true,
    quizCompleted: true,
    quizScore: 8.5,
    quizCorrectCount: 17,
    timeSpentSeconds: 740,
    violationsCount: 0,
    violationLogs: [],
    lastUpdated: '2026-10-25T14:20:00.000Z',
    quizAttempts: 1,
  };

  // Seed for 86000718-00-6762 (Trương Huỳnh Gia Bảo - 10A1)
  seed['86000718-00-6762_16'] = {
    studentId: '86000718-00-6762',
    email: 'bao.thg.10a1@school.edu.vn',
    lessonId: 16,
    theoryCompleted: true,
    theoryScore: 100,
    quizUnlocked: true,
    quizCompleted: true,
    quizScore: 9.5,
    quizCorrectCount: 19,
    timeSpentSeconds: 680,
    violationsCount: 0,
    violationLogs: [],
    lastUpdated: '2026-10-24T08:30:00.000Z',
    quizAttempts: 1,
  };
  seed['86000718-00-6762_17'] = {
    studentId: '86000718-00-6762',
    email: 'bao.thg.10a1@school.edu.vn',
    lessonId: 17,
    theoryCompleted: true,
    theoryScore: 90,
    quizUnlocked: true,
    quizCompleted: true,
    quizScore: 9.0,
    quizCorrectCount: 18,
    timeSpentSeconds: 710,
    violationsCount: 0,
    violationLogs: [],
    lastUpdated: '2026-10-24T09:15:00.000Z',
    quizAttempts: 1,
  };

  // Seed for 86000718-00-6766 (Nguyễn Thị Khánh Băng - 10A1)
  seed['86000718-00-6766_16'] = {
    studentId: '86000718-00-6766',
    email: 'bang.ntk.10a1@school.edu.vn',
    lessonId: 16,
    theoryCompleted: true,
    theoryScore: 90,
    quizUnlocked: true,
    quizCompleted: true,
    quizScore: 8.5,
    quizCorrectCount: 17,
    timeSpentSeconds: 750,
    violationsCount: 0,
    violationLogs: [],
    lastUpdated: '2026-10-24T10:00:00.000Z',
    quizAttempts: 1,
  };

  // Seed for 86000718-00-6770 (Bùi Trí Bình - 10A2)
  seed['86000718-00-6770_16'] = {
    studentId: '86000718-00-6770',
    email: 'binh.bt.10a2@school.edu.vn',
    lessonId: 16,
    theoryCompleted: true,
    theoryScore: 95,
    quizUnlocked: true,
    quizCompleted: true,
    quizScore: 9.0,
    quizCorrectCount: 18,
    timeSpentSeconds: 650,
    violationsCount: 0,
    violationLogs: [],
    lastUpdated: '2026-10-23T15:00:00.000Z',
    quizAttempts: 1,
  };
  seed['86000718-00-6770_19'] = {
    studentId: '86000718-00-6770',
    email: 'binh.bt.10a2@school.edu.vn',
    lessonId: 19,
    theoryCompleted: true,
    theoryScore: 100,
    quizUnlocked: true,
    quizCompleted: true,
    quizScore: 10.0,
    quizCorrectCount: 20,
    timeSpentSeconds: 590,
    violationsCount: 0,
    violationLogs: [],
    lastUpdated: '2026-10-25T16:40:00.000Z',
    quizAttempts: 1,
  };

  return seed;
}
