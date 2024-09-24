import { Survey } from '@/types/survey';
import { Question } from '@/types/question';
import { Result, WeakAnswers } from '@/types/answers';
import routes from '@/constants/routes';

import {
  clearTransitionsFromDirectives,
  makeAnswerTemplate,
} from '../../engine';
import { getNextRoute } from '../../engine/services/transition-evaluation.service';
import { SurveyProcessingError } from '../../engine/survey-processing.error';

/*
    As answers are stored on client, they can contains not full or extra data (f.e because of reverse steps).
    That's a reason to check them and select only right ones for the result presentation. 
*/

const buildSurveyProgressChain = (
  survey: Survey,
  answers: WeakAnswers,
): string[] => {
  const { startQuestionId } = survey;

  const chain = [startQuestionId];

  let questionId: string = startQuestionId;
  let route: string | null;
  let counter = 0;

  /* 
    Since 'clearTransitionsFromDirectives' can be expensive at runtime
    it would make a sense store two files for each survey: for routing and processing results.
  */
  survey.transitions = clearTransitionsFromDirectives(survey.transitions);

  while (true) {
    route = getNextRoute(questionId, survey, answers);

    if (route === routes.SURVEY_RESULTS({ surveyId: survey.id })) {
      break;
    }

    questionId = route.split('/').at(-1) as string;

    chain.push(questionId);

    counter++;

    if (counter > survey.questions.length) {
      throw new SurveyProcessingError({
        code: 500,
        message:
          'Infinite loop is detected during building survey progress chain. Likely, survey progress data is invalid',
      });
    }
  }

  return chain;
};

export const getSurveyResults = (
  survey: Survey,
  answers: WeakAnswers,
): Result[] => {
  const valuableAnswersIds = buildSurveyProgressChain(survey, answers);

  return valuableAnswersIds.map((id) => {
    const question = survey.questions.find((q) => q.id === id) as Question;

    return {
      questionId: id,
      questionText: question.params.title,
      answerText: makeAnswerTemplate(id),
    };
  });
};
