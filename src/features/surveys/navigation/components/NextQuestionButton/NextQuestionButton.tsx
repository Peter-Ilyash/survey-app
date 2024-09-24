'use client';

import { MouseEvent } from 'react';
import { Button, ButtonProps } from '@/components';
import { SurveyRouterParams, useSurveyRouter } from '../../hooks';

/* 
This button could be used into out of survey flow to come back to a passage
*/

export const NextQuestionButton = ({
  onClick,
  children,
  routerProps = { isOuterPage: true },
  ...props
}: ButtonProps & { routerProps?: SurveyRouterParams }) => {
  const router = useSurveyRouter({
    ...routerProps,
  });

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    router.next(null);
  };

  return (
    <Button {...props} onClick={handleClick}>
      {children}
    </Button>
  );
};
