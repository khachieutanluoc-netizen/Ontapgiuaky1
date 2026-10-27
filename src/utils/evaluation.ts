import { InteractiveQuestion, QuizQuestion } from '../types';

export const PASSING_THEORY_THRESHOLD = 80; // 80% required to unlock exercises
export const MAX_VIOLATIONS_ALLOWED = 5; // Max 5 cheating violations

export function checkTheoryPassing(scorePercent: number): boolean {
  return scorePercent >= PASSING_THEORY_THRESHOLD;
}

export function evaluateInteractiveQuestion(
  q: InteractiveQuestion,
  answer: any
): { isCorrect: boolean; pointsEarned: number; maxPoints: number } {
  if (q.type === 'single_choice') {
    const isCorrect = answer === q.correctAnswer;
    return { isCorrect, pointsEarned: isCorrect ? 1 : 0, maxPoints: 1 };
  }

  if (q.type === 'fill_blank') {
    const isCorrect = typeof answer === 'string' && answer.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase();
    return { isCorrect, pointsEarned: isCorrect ? 1 : 0, maxPoints: 1 };
  }

  if (q.type === 'multi_choice') {
    if (!Array.isArray(answer)) return { isCorrect: false, pointsEarned: 0, maxPoints: 1 };
    const sortedAns = [...answer].sort();
    const sortedTarget = [...q.correctAnswers].sort();
    const isCorrect = 
      sortedAns.length === sortedTarget.length && 
      sortedAns.every((val, idx) => val === sortedTarget[idx]);
    return { isCorrect, pointsEarned: isCorrect ? 1 : 0, maxPoints: 1 };
  }

  if (q.type === 'true_false_group') {
    // 4 statements: a, b, c, d
    // answer is expected to be a record: { a: boolean, b: boolean, c: boolean, d: boolean }
    if (!answer || typeof answer !== 'object') {
      return { isCorrect: false, pointsEarned: 0, maxPoints: 4 };
    }
    let correctCount = 0;
    q.statements.forEach((st) => {
      if (answer[st.label] === st.isCorrect) {
        correctCount++;
      }
    });
    // Proportion of correct statements (all 4 correct is full score)
    const isCorrect = correctCount === q.statements.length;
    return { isCorrect, pointsEarned: correctCount, maxPoints: q.statements.length };
  }

  return { isCorrect: false, pointsEarned: 0, maxPoints: 1 };
}

export function calculateTheoryScore(
  answers: Record<string, any>,
  questions: InteractiveQuestion[]
): { scorePercent: number; isPassed: boolean; totalPoints: number; maxTotalPoints: number } {
  if (!questions || questions.length === 0) {
    return { scorePercent: 100, isPassed: true, totalPoints: 0, maxTotalPoints: 0 };
  }

  let totalEarned = 0;
  let totalMax = 0;

  for (const q of questions) {
    const result = evaluateInteractiveQuestion(q, answers[q.id]);
    totalEarned += result.pointsEarned;
    totalMax += result.maxPoints;
  }

  const scorePercent = totalMax > 0 ? Math.round((totalEarned / totalMax) * 100) : 0;
  const isPassed = checkTheoryPassing(scorePercent);

  return {
    scorePercent,
    isPassed,
    totalPoints: totalEarned,
    maxTotalPoints: totalMax,
  };
}

export function calculateQuizScore(
  userAnswers: Record<string, number>,
  questions: QuizQuestion[]
): {
  scoreOutOf10: number;
  correctCount: number;
  totalQuestions: number;
  percentage: number;
  rank: 'Xuất sắc' | 'Giỏi' | 'Khá' | 'Trung bình' | 'Cần rèn luyện';
} {
  const totalQuestions = questions.length;
  if (totalQuestions === 0) {
    return { scoreOutOf10: 0, correctCount: 0, totalQuestions: 0, percentage: 0, rank: 'Cần rèn luyện' };
  }

  let correctCount = 0;
  questions.forEach((q) => {
    if (userAnswers[q.id] === q.correctAnswer) {
      correctCount++;
    }
  });

  // Scale 20 questions to 10 points
  const rawScore = (correctCount / totalQuestions) * 10;
  const scoreOutOf10 = Math.round(rawScore * 10) / 10; // 1 decimal place
  const percentage = Math.round((correctCount / totalQuestions) * 100);

  let rank: 'Xuất sắc' | 'Giỏi' | 'Khá' | 'Trung bình' | 'Cần rèn luyện' = 'Cần rèn luyện';
  if (scoreOutOf10 >= 9.0) rank = 'Xuất sắc';
  else if (scoreOutOf10 >= 8.0) rank = 'Giỏi';
  else if (scoreOutOf10 >= 6.5) rank = 'Khá';
  else if (scoreOutOf10 >= 5.0) rank = 'Trung bình';
  else rank = 'Cần rèn luyện';

  return {
    scoreOutOf10,
    correctCount,
    totalQuestions,
    percentage,
    rank,
  };
}

export function checkAntiCheatingLimit(violationsCount: number): {
  isDisqualified: boolean;
  remainingStrikes: number;
  warningMessage: string;
} {
  const remaining = Math.max(0, MAX_VIOLATIONS_ALLOWED - violationsCount);
  const isDisqualified = violationsCount >= MAX_VIOLATIONS_ALLOWED;

  let warningMessage = '';
  if (isDisqualified) {
    warningMessage = `Bạn đã vi phạm quy chế thi ${violationsCount}/${MAX_VIOLATIONS_ALLOWED} lần (rời tab/chụp màn hình). Bài làm đã bị đình chỉ và bạn cần làm lại từ đầu!`;
  } else if (violationsCount > 0) {
    warningMessage = `Cảnh báo vi phạm lần ${violationsCount}/${MAX_VIOLATIONS_ALLOWED}. Bạn còn ${remaining} lần vi phạm trước khi bài làm bị huỷ!`;
  }

  return {
    isDisqualified,
    remainingStrikes: remaining,
    warningMessage,
  };
}

export function generatePedagogicalFeedback(
  lessonTitle: string,
  theoryScore: number,
  quizScore: number,
  violations: number
): string {
  let feedback = `Đánh giá tổng quát cho nội dung [${lessonTitle}]:\n`;

  if (theoryScore >= 80) {
    feedback += `• Phần lý thuyết: Em đã hoàn thành xuất sắc các tương tác kiến thức cốt lõi (${theoryScore}%).\n`;
  } else {
    feedback += `• Phần lý thuyết: Cần đọc lại kỹ các khái niệm trong SGK để củng cố thêm (${theoryScore}%).\n`;
  }

  if (quizScore >= 9.0) {
    feedback += `• Phần bài tập 20 câu: Điểm ${quizScore}/10 (Xuất sắc) - Em nắm rất chắc cú pháp và tư duy thuật toán Python!\n`;
  } else if (quizScore >= 8.0) {
    feedback += `• Phần bài tập 20 câu: Điểm ${quizScore}/10 (Giỏi) - Kỹ năng lập trình tốt, chuẩn bị chu đáo cho kỳ thi giữa kỳ.\n`;
  } else if (quizScore >= 6.5) {
    feedback += `• Phần bài tập 20 câu: Điểm ${quizScore}/10 (Khá) - Chú ý thêm các trường hợp biên hoặc bài toán lặp/danh sách.\n`;
  } else {
    feedback += `• Phần bài tập 20 câu: Điểm ${quizScore}/10 - Em nên luyện tập lại để đạt kết quả cao hơn trong bài kiểm tra chính thức.\n`;
  }

  if (violations === 0) {
    feedback += `• Tinh thần làm bài: Trung thực, nghiêm túc (0 lần vi phạm giám sát). Tuyên dương em!`;
  } else {
    feedback += `• Giám sát kỷ luật: Có ${violations} lần chuyển tab hoặc mất tiêu điểm. Hãy tập trung tối đa nhé!`;
  }

  return feedback;
}
