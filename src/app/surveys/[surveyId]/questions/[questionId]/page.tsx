import {
  fetchAllSurveys,
  fetchSurvey,
} from '@/features/surveys/engine/services/fetching.service';
import { QuestionView } from '@/features/surveys/question-screens';

/*
  It would be good idea to create separate 'questions bank' collection and use only their ids in survey config.
  In this case question could be re-using between surveys without config duplication and extra generating pages.
*/

export async function generateStaticParams() {
  const surveys = await fetchAllSurveys();

  const params = [];

  for (const survey of surveys) {
    for (const question of survey.questions) {
      params.push({
        surveyId: survey.id,
        questionId: question.id,
      });
    }
  }

  return params;
}

export default async function QuestionPage({
  params,
}: {
  params: { surveyId: string; questionId: string };
}) {
  const { surveyId, questionId } = params;

  const { questions } = await fetchSurvey(surveyId);
  const question = questions.find(({ id }) => id === questionId);

  if (!question) {
    throw new Error(`Question with id ${questionId} is not found`);
  }

  return <QuestionView surveyId={surveyId} question={question} />;
}
