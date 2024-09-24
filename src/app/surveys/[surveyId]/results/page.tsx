'use client';

import { useEffect, useState } from 'react';

import { Result } from '@/types/answers';
import { useAppSelector } from '@/redux/store';
import { selectCurrentSurveyAnswers } from '@/redux/slices/surveys-progress/selectors';
import { Loader, Title } from '@/components';
import { fetchProcessedResults } from '@/features/surveys/results-processing/services/fetching.service';
import { ResultsTable } from '@/features/surveys/results-processing/components';

import classes from './page.module.scss';

/*
  The decision to do results page a client one is justified by limitations of transmitted parameters size.
  Passing multiple answers in url-string or cookies would cause scaling issues. So IMHO POST request is one
  of the best ways to pass data for results processing until a server-based session is implemented.
*/

export default function ResultsPage({
  params,
}: {
  params: { surveyId: string };
}) {
  const [results, setResults] = useState<Result[] | null>(null);

  const { surveyId } = params;
  const answers = useAppSelector(selectCurrentSurveyAnswers);

  useEffect(() => {
    if (!answers) {
      throw new Error('answers should be defined');
    }

    const fetchResults = async () => {
      const { data } = await fetchProcessedResults(surveyId, answers);
      setResults(data);
    };

    fetchResults();
  }, [surveyId, answers]);

  if (!results) {
    return <Loader />;
  }

  return (
    <section className={classes['complete-page']}>
      <Title level={1} className={classes['complete-page__title']}>
        Congratulations! Your answers:
      </Title>
      <ResultsTable data={results} />
    </section>
  );
}
