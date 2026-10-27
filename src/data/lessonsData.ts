import { LessonContent } from '../types';
import { lesson16 } from './lessons/lesson16';
import { lesson17 } from './lessons/lesson17';
import { lesson18 } from './lessons/lesson18';
import { lesson19 } from './lessons/lesson19';
import { lesson20 } from './lessons/lesson20';
import { lesson21 } from './lessons/lesson21';
import { lesson22 } from './lessons/lesson22';
import { lesson23 } from './lessons/lesson23';

export const ALL_LESSONS: LessonContent[] = [
  lesson16,
  lesson17,
  lesson18,
  lesson19,
  lesson20,
  lesson21,
  lesson22,
  lesson23,
];

export function getLessonById(id: number): LessonContent | undefined {
  return ALL_LESSONS.find(lesson => lesson.id === id);
}
