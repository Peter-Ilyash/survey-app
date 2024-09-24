import { redirect } from 'next/navigation';
import { fetchSurvey } from '@/features/surveys/engine/services/fetching.service';

import { getNextRoute } from '@/features/surveys/engine/services/transition-evaluation.service';

export default async function NextQuestionPage({
  params,
  searchParams,
}: {
  params: { surveyId: string; questionId: string };
  searchParams: { answer?: string };
}) {
  const { surveyId, questionId } = params;
  const { answer } = searchParams;

  const survey = await fetchSurvey(surveyId);

  if (!answer) {
    throw new Error('Answer is not provided');
  }

  redirect(
    getNextRoute(questionId, survey, { [questionId]: JSON.parse(answer) }),
  );
}
