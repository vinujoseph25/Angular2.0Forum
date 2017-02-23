import { Answer } from './discussion-answer';

export class Discussion {
  id: number;
  question: string;
  createdDate: string;
  answers: Answer [];
  countOfAnswers: number;
}
