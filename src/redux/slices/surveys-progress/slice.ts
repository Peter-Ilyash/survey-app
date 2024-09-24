import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SurveysProgressState } from './types';
import { makeSurvey } from './helpers';

const initialState: SurveysProgressState = { byId: {}, currentId: null };

const surveysProgressSlice = createSlice({
  name: 'surveys',
  initialState,
  reducers: {
    setCurrentServeyId: (
      state,
      action: PayloadAction<{ surveyId: string }>,
    ) => {
      state.currentId = action.payload.surveyId;
    },
    setCurrentQuestionId: (
      state,
      action: PayloadAction<{ surveyId: string; questionId: string }>,
    ) => {
      const { surveyId, questionId } = action.payload;

      if (!state.byId[surveyId]) {
        state.byId[surveyId] = makeSurvey();
      }

      state.byId[surveyId].currentQuestionId = questionId;
    },
    setAnswer: (
      state,
      action: PayloadAction<{
        surveyId: string;
        questionId: string;
        value: unknown;
        label: string;
      }>,
    ) => {
      const { surveyId, questionId, value, label } = action.payload;

      if (!state.byId[surveyId]) {
        state.byId[surveyId] = makeSurvey();
      }

      state.byId[surveyId].answers[questionId] = { label, value };
    },
  },
});

export const {
  reducer: surveysProgressReducer,
  actions: surveysProgressActions,
} = surveysProgressSlice;
