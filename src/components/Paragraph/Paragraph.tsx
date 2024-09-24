import { FC, HTMLAttributes } from 'react';

export interface ParagraphProps extends HTMLAttributes<HTMLParagraphElement> {}

export const Paragraph: FC<ParagraphProps> = ({ children, ...props }) => {
  return <p {...props}>{children}</p>;
};
