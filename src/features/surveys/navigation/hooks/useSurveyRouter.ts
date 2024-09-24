'use client';

import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/redux/store';

import routes from '@/constants/routes';
import {
  selectCurrentAnswer,
  selectCurrentQuestionId,
  selectCurrentServeyId,
} from '@/redux/slices/surveys-progress/selectors';
import { surveysProgressActions } from '@/redux/slices/surveys-progress';
import { makeReturnPointDirective } from '../../engine';

export interface SurveyRouterParams {
  surveyId?: string;
  questionId?: string;
  isOuterPage?: boolean;
}

const { setCurrentServeyId, setCurrentQuestionId } = surveysProgressActions;

export const useSurveyRouter = (params?: SurveyRouterParams) => {
  const { surveyId, questionId, isOuterPage } = params ?? {};

  const nextRouter = useRouter();

  const currentSurveyId = useAppSelector(selectCurrentServeyId);
  const currentQuestionId = useAppSelector(selectCurrentQuestionId);
  const currentAnswer = useAppSelector(selectCurrentAnswer);

  const dispatch = useAppDispatch();

  const nextQuestion = useCallback(
    (value: unknown) => {
      if (!currentQuestionId || !currentSurveyId) {
        throw new Error(
          'Cannot move to the next question, because current question or survey id is not stored',
        );
      }

      const handlingValue = JSON.stringify(value);

      nextRouter.push(
        routes.SURVEY_NEXT_QUESTION({
          surveyId: currentSurveyId,
          questionId: currentQuestionId,
          answer: handlingValue,
        }),
      );
    },
    [currentQuestionId, currentSurveyId, nextRouter],
  );

  const returnToSurvey = useCallback(() => {
    if (!currentQuestionId || !currentSurveyId || !currentAnswer) {
      throw new Error(
        'Cannot move to the next question, because current question/survey id or the last answer is not stored',
      );
    }

    const handlingValue = JSON.stringify(
      makeReturnPointDirective(currentAnswer.value),
    );

    nextRouter.push(
      routes.SURVEY_NEXT_QUESTION({
        surveyId: currentSurveyId,
        questionId: currentQuestionId,
        answer: handlingValue,
      }),
    );
  }, [currentQuestionId, currentSurveyId, currentAnswer, nextRouter]);

  const next = isOuterPage ? returnToSurvey : nextQuestion;

  useEffect(() => {
    if (surveyId && surveyId !== currentSurveyId) {
      dispatch(setCurrentServeyId({ surveyId }));
    }
  }, [surveyId, currentSurveyId, dispatch]);

  useEffect(() => {
    if (surveyId && questionId && questionId !== currentQuestionId) {
      dispatch(setCurrentQuestionId({ surveyId, questionId }));
    }
  }, [surveyId, questionId, currentQuestionId, dispatch]);

  return { next };
};
