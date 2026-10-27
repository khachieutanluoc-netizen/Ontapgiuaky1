import React from 'react';
import { LessonContent, StudentProgress } from '../types';
import { 
  BookOpen, 
  CheckCircle, 
  Lock, 
  Clock, 
  Award, 
  ArrowRight, 
  Sparkles, 
  AlertCircle 
} from 'lucide-react';

interface LessonCardProps {
  lesson: LessonContent;
  progress: StudentProgress;
  onOpenTheory: (lessonId: number) => void;
  onOpenQuiz: (lessonId: number) => void;
}

export const LessonCard: React.FC<LessonCardProps> = ({
  lesson,
  progress,
  onOpenTheory,
  onOpenQuiz,
}) => {
  const isTheoryPassed = progress.theoryCompleted && progress.theoryScore >= 80;
  const isQuizUnlocked = progress.quizUnlocked || isTheoryPassed;
  const isQuizDone = progress.quizCompleted;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between group">
      
      {/* Top Header */}
      <div className="p-5 border-b border-slate-100 bg-gradient-to-br from-slate-50/70 to-white">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 font-extrabold text-sm flex items-center justify-center shrink-0">
              {lesson.id}
            </span>
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide">
              {lesson.chapter}
            </span>
          </div>

          {/* Quick status pill */}
          {isQuizDone ? (
            <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-emerald-100 text-emerald-800 flex items-center space-x-1 shrink-0">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>{progress.quizScore.toFixed(1)}/10</span>
            </span>
          ) : isTheoryPassed ? (
            <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-blue-100 text-blue-800 flex items-center space-x-1 shrink-0">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Đạt LT ({progress.theoryScore}%)</span>
            </span>
          ) : (
            <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-slate-100 text-slate-600 shrink-0">
              Chưa hoàn thành
            </span>
          )}
        </div>

        <h3 className="text-base font-bold text-slate-900 mt-2.5 line-clamp-1 group-hover:text-blue-600 transition">
          {lesson.title}
        </h3>
        <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">
          {lesson.subtitle}
        </p>

        <div className="flex items-center space-x-3 mt-3 text-[11px] text-slate-400 font-medium">
          <span>📖 {lesson.sgkPages}</span>
          <span>•</span>
          <span>📝 {lesson.sbtPages}</span>
        </div>
      </div>

      {/* Middle Progress Summary */}
      <div className="p-5 space-y-3.5">
        
        {/* Part 1: Theory Progress */}
        <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-semibold text-slate-700 flex items-center space-x-1">
              <span>Phần 1: Lý thuyết & Tương tác</span>
            </span>
            <span className={`font-bold ${isTheoryPassed ? 'text-emerald-600' : 'text-slate-500'}`}>
              {progress.theoryScore}% {isTheoryPassed ? '(Đạt)' : '(Cần ≥ 80%)'}
            </span>
          </div>
          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${
                isTheoryPassed ? 'bg-emerald-500' : progress.theoryScore > 0 ? 'bg-amber-500' : 'bg-slate-300'
              }`}
              style={{ width: `${Math.min(100, progress.theoryScore)}%` }}
            />
          </div>
        </div>

        {/* Part 2: Quiz Progress */}
        <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-700">Phần 2: Kiểm tra 15 phút (20 câu)</span>
            {isQuizDone ? (
              <span className="font-bold text-emerald-700">
                Đúng {progress.quizCorrectCount}/20 câu
              </span>
            ) : isQuizUnlocked ? (
              <span className="font-semibold text-blue-600">Sẵn sàng thi</span>
            ) : (
              <span className="font-medium text-slate-400 flex items-center space-x-1">
                <Lock className="w-3 h-3" />
                <span>Khoá</span>
              </span>
            )}
          </div>
          {isQuizDone && (
            <div className="text-[11px] text-slate-500 mt-1 flex items-center justify-between">
              <span>Vi phạm: {progress.violationsCount}/5</span>
              <span>Số lần làm: {progress.quizAttempts || 1}</span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="p-5 pt-0 grid grid-cols-2 gap-2">
        <button
          onClick={() => onOpenTheory(lesson.id)}
          className="w-full py-2.5 px-3 rounded-xl border border-blue-200 bg-blue-50/70 hover:bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center space-x-1 transition cursor-pointer"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Học Lý Thuyết</span>
        </button>

        {isQuizUnlocked ? (
          <button
            onClick={() => onOpenQuiz(lesson.id)}
            className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center space-x-1 transition cursor-pointer shadow-sm ${
              isQuizDone
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-blue-500/20'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>{isQuizDone ? 'Làm Lại (15p)' : 'Kiểm Tra (15p)'}</span>
          </button>
        ) : (
          <button
            disabled
            className="w-full py-2.5 px-3 rounded-xl border border-slate-200 bg-slate-100 text-slate-400 font-semibold text-xs flex items-center justify-center space-x-1 cursor-not-allowed opacity-80"
            title="Cần đạt từ 80% phần tương tác lý thuyết để mở bài tập"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Khoá bài tập</span>
          </button>
        )}
      </div>
    </div>
  );
};
