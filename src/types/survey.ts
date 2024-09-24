import { Question } from './question';
import { Transition } from './transition';

export interface Survey {
  id: string;
  startQuestionId: string;
  finishQuestionId: string;
  questions: Question[];
  transitions: Transition[];
}
