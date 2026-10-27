export interface Student {
  id: string;
  class: string;
  fullName: string;
  dob: string; // DD/MM/YYYY
  email: string;
}

export type QuestionType = 
  | 'single_choice'
  | 'fill_blank'
  | 'multi_choice'
  | 'true_false_group'; // 4 statements a, b, c, d (Đúng/Sai)

export interface SingleChoiceQuestion {
  id: string;
  type: 'single_choice';
  prompt: string;
  codeSnippet?: string;
  options: string[];
  correctAnswer: number; // Index 0-3
  explanation: string;
}

export interface FillBlankQuestion {
  id: string;
  type: 'fill_blank';
  prompt: string;
  codeTemplate: string; // e.g. "for i in __BLANK__(1, 10):"
  blankOptions: string[]; // Options to pick or drag
  correctAnswer: string;
  explanation: string;
}

export interface MultiChoiceQuestion {
  id: string;
  type: 'multi_choice';
  prompt: string;
  codeSnippet?: string;
  options: string[];
  correctAnswers: number[]; // Indices of correct options
  explanation: string;
}

export interface TrueFalseStatement {
  id: string;
  label: 'a' | 'b' | 'c' | 'd';
  text: string;
  isCorrect: boolean; // true = Đúng, false = Sai
}

export interface TrueFalseGroupQuestion {
  id: string;
  type: 'true_false_group';
  prompt: string;
  contextCode?: string;
  statements: TrueFalseStatement[];
  explanation: string;
}

export type InteractiveQuestion = 
  | SingleChoiceQuestion 
  | FillBlankQuestion 
  | MultiChoiceQuestion 
  | TrueFalseGroupQuestion;

export interface QuizQuestion {
  id: string;
  prompt: string;
  codeSnippet?: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  type?: 'mcq' | 'code_output' | 'bug_detect';
}

export interface LessonContent {
  id: number; // 16 to 23
  title: string;
  subtitle: string;
  chapter: string;
  sgkPages: string; // Trang SGK
  sbtPages: string; // Trang SBT
  summaryMarkdown: string;
  keyPoints: string[];
  codeExamples: { title: string; code: string; explanation: string }[];
  interactiveQuestions: InteractiveQuestion[]; // 4 dạng câu hỏi tương tác
  quizQuestions: QuizQuestion[]; // 20 câu trắc nghiệm bài tập
}

export interface StudentProgress {
  studentId: string;
  email: string;
  lessonId: number;
  theoryCompleted: boolean;
  theoryScore: number; // Percentage 0 - 100
  quizUnlocked: boolean; // Unlocked when theoryScore >= 80%
  quizCompleted: boolean;
  quizScore: number; // 0 - 10
  quizCorrectCount: number; // 0 - 20
  timeSpentSeconds: number;
  violationsCount: number; // Cheating strikes
  violationLogs: string[];
  lastUpdated: string;
  quizAttempts: number;
}

export interface EmailLog {
  id: string;
  studentId: string;
  studentName: string;
  studentClass: string;
  recipientEmail: string;
  lessonId: number;
  lessonTitle: string;
  theoryScore: number;
  quizScore: number;
  correctAnswersCount: number;
  totalQuestions: number;
  violationsCount: number;
  sentAt: string;
  status: 'sent' | 'delivered';
  feedback: string;
}
