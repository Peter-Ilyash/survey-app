import { SingleSurveyProgress } from './types';

export const makeSurvey = (): SingleSurveyProgress => ({
  answers: {},
  currentQuestionId: null,
});
