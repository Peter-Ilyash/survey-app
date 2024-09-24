'use client';

import { useAppSelector } from '@/redux/store';
import { selectCurrentSurveyAnswers } from '@/redux/slices/surveys-progress/selectors';
import { enrichDeep } from '../utils';

export const useDynamicTextTemplates = () => {
  const answers = useAppSelector(selectCurrentSurveyAnswers) ?? {};

  const hydrateText = <T extends Array<unknown>>(...params: T) =>
    params.map(
      (parameter: unknown) =>
        enrichDeep(parameter, answers) as typeof parameter,
    ) as T;

  return { hydrateText };
};
