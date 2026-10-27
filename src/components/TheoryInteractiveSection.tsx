import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  LessonContent, 
  Student, 
  InteractiveQuestion, 
  SingleChoiceQuestion, 
  FillBlankQuestion, 
  MultiChoiceQuestion, 
  TrueFalseGroupQuestion 
} from '../types';
import { calculateTheoryScore, evaluateInteractiveQuestion } from '../utils/evaluation';
import { 
  BookOpen, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  ArrowRight, 
  Lock, 
  RotateCcw, 
  BookMarked,
  Info
} from 'lucide-react';

interface TheoryInteractiveSectionProps {
  lesson: LessonContent;
  student: Student;
  currentScore: number;
  onSuccessUnlockQuiz: (newScore: number) => void;
  onGoToQuiz: () => void;
  onBackToCatalog: () => void;
}

export const TheoryInteractiveSection: React.FC<TheoryInteractiveSectionProps> = ({
  lesson,
  student,
  currentScore,
  onSuccessUnlockQuiz,
  onGoToQuiz,
  onBackToCatalog,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'theory' | 'interactive'>('theory');
  const [userAnswers, setUserAnswers] = useState<Record<string, any>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [scoreResult, setScoreResult] = useState<{
    scorePercent: number;
    isPassed: boolean;
    totalPoints: number;
    maxTotalPoints: number;
  } | null>(null);

  // Initialize or restore
  useEffect(() => {
    setUserAnswers({});
    setSubmitted(false);
    setScoreResult(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [lesson.id]);

  const handleSingleSelect = (qId: string, optionIdx: number) => {
    if (submitted) return;
    setUserAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const handleFillBlankSelect = (qId: string, val: string) => {
    if (submitted) return;
    setUserAnswers(prev => ({ ...prev, [qId]: val }));
  };

  const handleMultiChoiceToggle = (qId: string, optionIdx: number) => {
    if (submitted) return;
    const currentList: number[] = userAnswers[qId] || [];
    const nextList = currentList.includes(optionIdx)
      ? currentList.filter(i => i !== optionIdx)
      : [...currentList, optionIdx];
    setUserAnswers(prev => ({ ...prev, [qId]: nextList }));
  };

  const handleTrueFalseToggle = (qId: string, label: 'a' | 'b' | 'c' | 'd', val: boolean) => {
    if (submitted) return;
    const currentGroup = userAnswers[qId] || {};
    setUserAnswers(prev => ({
      ...prev,
      [qId]: { ...currentGroup, [label]: val }
    }));
  };

  const handleSubmitTheory = () => {
    const result = calculateTheoryScore(userAnswers, lesson.interactiveQuestions);
    setScoreResult(result);
    setSubmitted(true);

    if (result.isPassed) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
      onSuccessUnlockQuiz(result.scorePercent);
    }
  };

  const handleRetry = () => {
    setUserAnswers({});
    setSubmitted(false);
    setScoreResult(null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-in fade-in duration-200">
      
      {/* Top Banner & Breadcrumb */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <button
            onClick={onBackToCatalog}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center space-x-1 mb-2 cursor-pointer"
          >
            <span>← Quay lại danh mục bài</span>
          </button>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-1 text-xs font-extrabold rounded-md bg-blue-100 text-blue-800">
              {lesson.chapter}
            </span>
            <span className="text-xs text-slate-400 font-medium">{lesson.sgkPages}</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 mt-1">{lesson.title}</h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">{lesson.subtitle}</p>
        </div>

        {/* Status Chip */}
        <div className="flex items-center space-x-3">
          {scoreResult?.isPassed || currentScore >= 80 ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl px-4 py-3 text-right">
              <div className="text-[11px] font-bold text-emerald-700 uppercase tracking-wide">
                Đã mở khoá bài tập
              </div>
              <div className="text-lg font-black text-emerald-800">
                {scoreResult ? scoreResult.scorePercent : currentScore}% Đạt
              </div>
            </div>
          ) : (
            <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-right">
              <div className="text-[11px] font-bold text-amber-700 uppercase tracking-wide">
                Điều kiện mở bài tập
              </div>
              <div className="text-sm font-extrabold text-amber-800">
                Cần đạt ≥ 80% tương tác
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex border-b border-slate-200 bg-white rounded-t-2xl px-4 pt-2 space-x-4">
        <button
          onClick={() => setActiveSubTab('theory')}
          className={`pb-3 text-sm font-bold flex items-center space-x-2 border-b-2 transition ${
            activeSubTab === 'theory'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>1. Tóm Tắt Lý Thuyết SGK</span>
        </button>

        <button
          onClick={() => setActiveSubTab('interactive')}
          className={`pb-3 text-sm font-bold flex items-center space-x-2 border-b-2 transition relative ${
            activeSubTab === 'interactive'
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          <span>2. Tương Tác Củng Cố (Cần ≥ 80%)</span>
          {scoreResult?.isPassed && (
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block ml-1" />
          )}
        </button>
      </div>

      {/* Tab 1: Theory Content */}
      {activeSubTab === 'theory' && (
        <div className="bg-white rounded-b-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-8">
          
          {/* Key Points Banner */}
          <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-5">
            <h3 className="text-sm font-bold text-blue-900 flex items-center space-x-2 mb-3">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span>GHI NHỚ TRỌNG TÂM THEO SÁCH GIÁO KHOA</span>
            </h3>
            <ul className="space-y-2">
              {lesson.keyPoints.map((pt, idx) => (
                <li key={idx} className="text-xs sm:text-sm text-slate-700 flex items-start space-x-2">
                  <span className="w-5 h-5 rounded-full bg-blue-200 text-blue-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Render Markdown Summary */}
          <div className="prose prose-slate max-w-none text-slate-800 text-sm sm:text-base leading-relaxed space-y-4">
            <div 
              dangerouslySetInnerHTML={{
                __html: lesson.summaryMarkdown
                  .replace(/### (.*)/g, '<h3 class="text-lg font-bold text-slate-900 mt-6 mb-2 border-b pb-1 border-slate-200">$1</h3>')
                  .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-slate-900">$1</strong>')
                  .replace(/`([^`]+)`/g, '<code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono font-bold">$1</code>')
                  .replace(/- (.*)/g, '<div class="flex items-start space-x-2 ml-2 mb-1.5"><span class="text-blue-500 font-bold">•</span><span>$1</span></div>')
              }}
            />
          </div>

          {/* Code Examples Section */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
              <BookMarked className="w-4 h-4 text-indigo-600" />
              <span>Ví Dụ Mã Lệnh Minh Hoạ Chuẩn SGK</span>
            </h3>

            <div className="grid grid-cols-1 gap-4">
              {lesson.codeExamples.map((ex, idx) => (
                <div key={idx} className="rounded-xl border border-slate-200 overflow-hidden bg-slate-900 text-white">
                  <div className="bg-slate-800/90 px-4 py-2 border-b border-slate-700 flex items-center justify-between text-xs font-semibold text-slate-300">
                    <span>{ex.title}</span>
                    <span className="text-[11px] text-slate-400">Python 3.x</span>
                  </div>
                  <pre className="p-4 text-xs sm:text-sm font-mono overflow-x-auto text-emerald-300 leading-relaxed">
                    <code>{ex.code}</code>
                  </pre>
                  <div className="bg-slate-800/50 p-3 text-xs text-slate-300 border-t border-slate-700/50">
                    💡 <em>{ex.explanation}</em>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action to switch to Interactive */}
          <div className="pt-6 border-t border-slate-200 flex justify-end">
            <button
              onClick={() => setActiveSubTab('interactive')}
              className="py-3 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-bold text-sm shadow-md shadow-blue-500/20 flex items-center space-x-2 cursor-pointer transition"
            >
              <span>Tiến Vào Phần Tương Tác Củng Cố</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Tab 2: Interactive Questions (4 required types) */}
      {activeSubTab === 'interactive' && (
        <div className="bg-white rounded-b-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-8">
          
          {/* Instructions Header */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-start space-x-3 text-xs sm:text-sm text-slate-700">
            <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-slate-900">
                Yêu cầu: Đạt từ 80% điểm tương tác trở lên để mở khoá phần Kiểm tra 15 phút.
              </p>
              <p className="text-slate-500 text-xs mt-0.5">
                Gồm 4 dạng câu hỏi cốt lõi: Chọn 1 phương án A/B/C/D, Điền khuyết, Chọn nhiều phương án đúng, và Tình huống nhận định a), b), c), d) Đúng/Sai.
              </p>
            </div>
          </div>

          {/* Score Result Announcement if submitted */}
          {submitted && scoreResult && (
            <div className={`p-5 rounded-2xl border text-sm ${
              scoreResult.isPassed
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-rose-50 border-rose-200 text-rose-900'
            }`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {scoreResult.isPassed ? (
                    <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" />
                  ) : (
                    <XCircle className="w-8 h-8 text-rose-600 shrink-0" />
                  )}
                  <div>
                    <h4 className="text-base font-black">
                      {scoreResult.isPassed ? '🎉 Chúc mừng em đã vượt qua phần lý thuyết!' : 'Em chưa đạt mức 80% để mở khoá bài tập!'}
                    </h4>
                    <p className="text-xs mt-0.5">
                      Điểm đạt: <strong>{scoreResult.scorePercent}%</strong> ({scoreResult.totalPoints}/{scoreResult.maxTotalPoints} điểm).
                      {scoreResult.isPassed 
                        ? ' Phần bài tập 20 câu đã sẵn sàng để em làm bài.'
                        : ' Em hãy xem lại lời giải thích bên dưới và nhấn "Làm lại tương tác" để đạt ≥ 80% nhé.'}
                    </p>
                  </div>
                </div>

                {scoreResult.isPassed ? (
                  <button
                    onClick={onGoToQuiz}
                    className="py-2.5 px-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-md shadow-emerald-600/20 flex items-center space-x-1.5 cursor-pointer transition shrink-0"
                  >
                    <span>Làm Bài Tập (15p)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleRetry}
                    className="py-2.5 px-4 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold text-xs flex items-center space-x-1.5 cursor-pointer transition shrink-0"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Làm lại</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Question List */}
          <div className="space-y-8">
            {lesson.interactiveQuestions.map((q, idx) => {
              const qNum = idx + 1;
              const evalRes = submitted ? evaluateInteractiveQuestion(q, userAnswers[q.id]) : null;

              return (
                <div 
                  key={q.id}
                  className={`p-6 rounded-2xl border transition-all ${
                    submitted
                      ? evalRes?.isCorrect
                        ? 'bg-emerald-50/40 border-emerald-300'
                        : 'bg-rose-50/40 border-rose-300'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {/* Question header */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 rounded-lg text-xs font-extrabold bg-blue-100 text-blue-800">
                      Dạng {qNum}: {
                        q.type === 'single_choice' ? 'Trắc nghiệm chọn 1 phương án' :
                        q.type === 'fill_blank' ? 'Chọn từ điền vào chỗ trống' :
                        q.type === 'multi_choice' ? 'Chọn nhiều phương án đúng' :
                        'Tình huống nhận định a), b), c), d)'
                      }
                    </span>

                    {submitted && evalRes && (
                      <span className={`text-xs font-bold flex items-center space-x-1 ${
                        evalRes.isCorrect ? 'text-emerald-700' : 'text-rose-700'
                      }`}>
                        {evalRes.isCorrect ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>Đúng (+{evalRes.pointsEarned}/{evalRes.maxPoints})</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-4 h-4 text-rose-600" />
                            <span>Chưa đúng ({evalRes.pointsEarned}/{evalRes.maxPoints})</span>
                          </>
                        )}
                      </span>
                    )}
                  </div>

                  <p className="text-sm font-semibold text-slate-900 mb-3 leading-relaxed">
                    {q.prompt}
                  </p>

                  {/* Render based on type */}
                  {q.type === 'single_choice' && (
                    <div className="space-y-2">
                      {q.options.map((opt, optIdx) => {
                        const isSelected = userAnswers[q.id] === optIdx;
                        const isCorrectOpt = q.correctAnswer === optIdx;

                        return (
                          <button
                            key={optIdx}
                            type="button"
                            onClick={() => handleSingleSelect(q.id, optIdx)}
                            className={`w-full text-left p-3.5 rounded-xl text-xs sm:text-sm font-medium border flex items-center space-x-3 transition cursor-pointer ${
                              submitted
                                ? isCorrectOpt
                                  ? 'bg-emerald-100/70 border-emerald-400 text-emerald-900 font-bold'
                                  : isSelected
                                  ? 'bg-rose-100/70 border-rose-400 text-rose-900'
                                  : 'bg-white border-slate-200 text-slate-500 opacity-60'
                                : isSelected
                                ? 'bg-blue-50 border-blue-500 text-blue-900 font-bold ring-2 ring-blue-500/20'
                                : 'bg-slate-50/70 hover:bg-slate-100 border-slate-200 text-slate-700'
                            }`}
                          >
                            <span className="w-6 h-6 rounded-full bg-white border border-slate-300 flex items-center justify-center font-bold text-xs shrink-0">
                              {String.fromCharCode(65 + optIdx)}
                            </span>
                            <span className="flex-1">{opt}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {q.type === 'fill_blank' && (
                    <div className="space-y-3">
                      <div className="p-4 bg-slate-900 text-emerald-400 rounded-xl font-mono text-sm">
                        {q.codeTemplate.replace('__BLANK__', userAnswers[q.id] || '[...?...]')}
                      </div>

                      <div className="flex flex-wrap items-center gap-2 pt-2">
                        <span className="text-xs font-semibold text-slate-500">Chọn từ phù hợp:</span>
                        {q.blankOptions.map((opt, bIdx) => {
                          const isPicked = userAnswers[q.id] === opt;
                          return (
                            <button
                              key={bIdx}
                              type="button"
                              onClick={() => handleFillBlankSelect(q.id, opt)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition cursor-pointer ${
                                submitted
                                  ? opt.toLowerCase() === q.correctAnswer.toLowerCase()
                                    ? 'bg-emerald-100 border-emerald-500 text-emerald-900'
                                    : isPicked
                                    ? 'bg-rose-100 border-rose-400 text-rose-800'
                                    : 'bg-slate-100 border-slate-200 text-slate-400'
                                  : isPicked
                                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                                  : 'bg-white hover:bg-slate-100 border-slate-300 text-slate-700'
                              }`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {q.type === 'multi_choice' && (
                    <div className="space-y-2">
                      <p className="text-xs text-blue-600 font-semibold mb-2">
                        * Em có thể chọn nhiều phương án đúng cùng lúc:
                      </p>
                      {q.options.map((opt, optIdx) => {
                        const selectedList: number[] = userAnswers[q.id] || [];
                        const isChecked = selectedList.includes(optIdx);
                        const isCorrectOpt = q.correctAnswers.includes(optIdx);

                        return (
                          <button
                            type="button"
                            key={optIdx}
                            onClick={() => handleMultiChoiceToggle(q.id, optIdx)}
                            className={`w-full text-left p-3.5 rounded-xl text-xs sm:text-sm font-medium border flex items-center space-x-3 transition cursor-pointer select-none ${
                              submitted
                                ? isCorrectOpt
                                  ? 'bg-emerald-100/70 border-emerald-400 text-emerald-900 font-bold'
                                  : isChecked
                                  ? 'bg-rose-100/70 border-rose-400 text-rose-900'
                                  : 'bg-white border-slate-200 text-slate-500 opacity-60'
                                : isChecked
                                ? 'bg-blue-50 border-blue-500 text-blue-900 font-bold'
                                : 'bg-slate-50/70 hover:bg-slate-100 border-slate-200 text-slate-700'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isChecked}
                              readOnly
                              className="w-4 h-4 text-blue-600 rounded border-slate-300 pointer-events-none"
                            />
                            <span>{opt}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {q.type === 'true_false_group' && (
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 gap-2.5">
                        {q.statements.map((st) => {
                          const groupAns = userAnswers[q.id] || {};
                          const userChoice = groupAns[st.label];
                          const isCorrectChoice = userChoice === st.isCorrect;

                          return (
                            <div
                              key={st.id}
                              className={`p-3.5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                                submitted
                                  ? isCorrectChoice
                                    ? 'bg-emerald-100/50 border-emerald-300'
                                    : 'bg-rose-100/50 border-rose-300'
                                  : 'bg-slate-50 border-slate-200'
                              }`}
                            >
                              <div className="flex items-start space-x-2">
                                <span className="font-extrabold text-blue-700 text-xs mt-0.5">
                                  {st.label})
                                </span>
                                <span className="text-xs sm:text-sm text-slate-800 font-medium">
                                  {st.text}
                                </span>
                              </div>

                              <div className="flex items-center space-x-2 self-end sm:self-center shrink-0">
                                <button
                                  type="button"
                                  onClick={() => handleTrueFalseToggle(q.id, st.label, true)}
                                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition cursor-pointer ${
                                    userChoice === true
                                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                                      : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300'
                                  }`}
                                >
                                  ĐÚNG
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleTrueFalseToggle(q.id, st.label, false)}
                                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition cursor-pointer ${
                                    userChoice === false
                                      ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                                      : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300'
                                  }`}
                                >
                                  SAI
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Explanation when submitted */}
                  {submitted && (
                    <div className="mt-4 p-3.5 bg-slate-100 border border-slate-200 rounded-xl text-xs text-slate-700">
                      <strong className="text-blue-700 font-bold">Giải thích: </strong>
                      {q.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Action buttons */}
          <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={() => setActiveSubTab('theory')}
              className="w-full sm:w-auto py-2.5 px-4 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-100 cursor-pointer transition"
            >
              ← Xem Lại Lý Thuyết
            </button>

            {!submitted ? (
              <button
                type="button"
                onClick={handleSubmitTheory}
                className="w-full sm:w-auto py-3 px-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-bold text-sm shadow-md shadow-blue-500/20 flex items-center justify-center space-x-2 cursor-pointer transition"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Chấm Điểm Tương Tác</span>
              </button>
            ) : scoreResult?.isPassed ? (
              <button
                type="button"
                onClick={onGoToQuiz}
                className="w-full sm:w-auto py-3 px-8 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-500/25 flex items-center justify-center space-x-2 cursor-pointer transition transform hover:scale-[1.02]"
              >
                <span>TIẾN VÀO BÀI TẬP 15 PHÚT (20 CÂU)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleRetry}
                className="w-full sm:w-auto py-3 px-8 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold text-sm shadow-md shadow-rose-500/20 flex items-center justify-center space-x-2 cursor-pointer transition"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Làm Lại Để Đạt ≥ 80%</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
