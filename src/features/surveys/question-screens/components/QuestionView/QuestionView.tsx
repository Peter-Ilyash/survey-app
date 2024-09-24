'use client';

import { ReactElement } from 'react';
import { useSurveyRouter } from '@/features/surveys/navigation';
import { Question, ScreenType } from '@/types/question';
import { getScreens } from './config';
import { SubmitHandler } from '../types';
import { useAppDispatch } from '@/redux/store';
import { surveysProgressActions } from '@/redux/slices/surveys-progress';

interface QuestionViewProps<T extends ScreenType> {
  surveyId: string;
  question: Question<T>;
}

const { setAnswer } = surveysProgressActions;

export const QuestionView = <T extends ScreenType>({
  surveyId,
  question,
}: QuestionViewProps<T>): ReactElement => {
  const { id: questionId, screenType, params } = question;

  const router = useSurveyRouter({ surveyId, questionId });
  const dispatch = useAppDispatch();

  const Screen = getScreens(screenType);

  const handleSubmit: SubmitHandler = ({ value, label }) => {
    dispatch(setAnswer({ surveyId, questionId, value, label }));
    router.next(value);
  };

  return <Screen params={params} onSubmit={handleSubmit} />;
};
