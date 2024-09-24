import { selectRoot } from '@/redux/rootSelector';
import { createSelector } from '@reduxjs/toolkit';

const selectSurveysProgress = createSelector(
  selectRoot,
  (state) => state.surveysProgress,
);

export const selectCurrentServeyId = createSelector(
  selectSurveysProgress,
  (state) => state.currentId,
);

export const selectCurrentSurveyProgress = createSelector(
  [selectSurveysProgress, selectCurrentServeyId],
  (state, currentId) => {
    return currentId ? state.byId[currentId] : null;
  },
);

export const selectCurrentQuestionId = createSelector(
  selectCurrentSurveyProgress,
  (state) => state?.currentQuestionId,
);

export const selectCurrentAnswer = createSelector(
  [selectCurrentSurveyProgress, selectCurrentQuestionId],
  (state, currentQuestionId) => {
    if (state === null) {
      return null;
    }

    return currentQuestionId ? state.answers[currentQuestionId] : null;
  },
);

export const selectCurrentSurveyAnswers = createSelector(
  selectCurrentSurveyProgress,
  (state) => (state ? state.answers : null),
);
