import test from 'node:test';
import assert from 'node:assert/strict';
import {
  checkTheoryPassing,
  calculateTheoryScore,
  calculateQuizScore,
  checkAntiCheatingLimit,
  evaluateInteractiveQuestion
} from './evaluation';
import { InteractiveQuestion, QuizQuestion } from '../types';

test('checkTheoryPassing requires at least 80%', () => {
  assert.equal(checkTheoryPassing(79), false);
  assert.equal(checkTheoryPassing(80), true);
  assert.equal(checkTheoryPassing(100), true);
});

test('evaluateInteractiveQuestion single_choice and fill_blank', () => {
  const singleQ: InteractiveQuestion = {
    id: 'q1',
    type: 'single_choice',
    prompt: 'Python do ai sáng lập?',
    options: ['Guido van Rossum', 'Bjarne Stroustrup', 'Dennis Ritchie', 'James Gosling'],
    correctAnswer: 0,
    explanation: 'Python do Guido van Rossum phát triển năm 1991.'
  };

  const res1 = evaluateInteractiveQuestion(singleQ, 0);
  assert.equal(res1.isCorrect, true);
  assert.equal(res1.pointsEarned, 1);

  const res2 = evaluateInteractiveQuestion(singleQ, 1);
  assert.equal(res2.isCorrect, false);
  assert.equal(res2.pointsEarned, 0);

  const fillQ: InteractiveQuestion = {
    id: 'q2',
    type: 'fill_blank',
    prompt: 'Hàm trả về kiểu dữ liệu là gì?',
    codeTemplate: 'type(10)',
    blankOptions: ['type', 'int', 'str'],
    correctAnswer: 'type',
    explanation: 'type() trả về kiểu dữ liệu của biến hoặc đối tượng'
  };

  assert.equal(evaluateInteractiveQuestion(fillQ, 'type').isCorrect, true);
  assert.equal(evaluateInteractiveQuestion(fillQ, 'int').isCorrect, false);
});

test('evaluateInteractiveQuestion true_false_group', () => {
  const tfQ: InteractiveQuestion = {
    id: 'tf1',
    type: 'true_false_group',
    prompt: 'Xét các nhận định về biến trong Python:',
    statements: [
      { id: 's1', label: 'a', text: 'Tên biến có thể bắt đầu bằng chữ số', isCorrect: false },
      { id: 's2', label: 'b', text: 'Python phân biệt chữ hoa và chữ thường', isCorrect: true },
      { id: 's3', label: 'c', text: 'Lệnh gán trong Python dùng dấu =', isCorrect: true },
      { id: 's4', label: 'd', text: 'Tên biến có thể trùng với từ khoá', isCorrect: false },
    ],
    explanation: 'Quy tắc đặt tên biến Python: không bắt đầu bằng số, không trùng từ khoá.'
  };

  const correctAnswers = { a: false, b: true, c: true, d: false };
  const res = evaluateInteractiveQuestion(tfQ, correctAnswers);
  assert.equal(res.isCorrect, true);
  assert.equal(res.pointsEarned, 4);

  const partialAnswers = { a: false, b: true, c: false, d: false };
  const resPartial = evaluateInteractiveQuestion(tfQ, partialAnswers);
  assert.equal(resPartial.isCorrect, false);
  assert.equal(resPartial.pointsEarned, 3);
});

test('calculateQuizScore scales 20 questions to 10 points correctly', () => {
  const mockQuiz: QuizQuestion[] = Array.from({ length: 20 }, (_, i) => ({
    id: `quiz_${i}`,
    prompt: `Câu hỏi ${i + 1}`,
    options: ['A', 'B', 'C', 'D'],
    correctAnswer: 0,
    explanation: 'Giải thích'
  }));

  // 20/20 correct -> 10.0 points
  const allCorrect: Record<string, number> = {};
  mockQuiz.forEach(q => { allCorrect[q.id] = 0; });
  const resultAll = calculateQuizScore(allCorrect, mockQuiz);
  assert.equal(resultAll.scoreOutOf10, 10.0);
  assert.equal(resultAll.correctCount, 20);
  assert.equal(resultAll.rank, 'Xuất sắc');

  // 16/20 correct -> 8.0 points (Giỏi)
  const sixteenCorrect: Record<string, number> = {};
  mockQuiz.forEach((q, idx) => { sixteenCorrect[q.id] = idx < 16 ? 0 : 1; });
  const result16 = calculateQuizScore(sixteenCorrect, mockQuiz);
  assert.equal(result16.scoreOutOf10, 8.0);
  assert.equal(result16.correctCount, 16);
  assert.equal(result16.rank, 'Giỏi');
});

test('checkAntiCheatingLimit enforces 5 max violations', () => {
  const strike0 = checkAntiCheatingLimit(0);
  assert.equal(strike0.isDisqualified, false);
  assert.equal(strike0.remainingStrikes, 5);

  const strike3 = checkAntiCheatingLimit(3);
  assert.equal(strike3.isDisqualified, false);
  assert.equal(strike3.remainingStrikes, 2);

  const strike5 = checkAntiCheatingLimit(5);
  assert.equal(strike5.isDisqualified, true);
  assert.equal(strike5.remainingStrikes, 0);

  const strike6 = checkAntiCheatingLimit(6);
  assert.equal(strike6.isDisqualified, true);
});
