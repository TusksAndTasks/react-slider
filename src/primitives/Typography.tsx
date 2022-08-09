import React, { ReactHTML } from 'react';
import styled from 'styled-components';

import { colors } from 'Theme/colors';

export enum TypographyMode {
  HEADING = 'HEADING',
  FIGCAPTION = 'FIGCAPTION',
}

interface ITypographyProps {
  children: React.ReactNode;
  as?: keyof ReactHTML;
  mode?: TypographyMode;
  className?: string;
  color?: colors;
}

function Typography({
  children,
  className,
  as = 'span',
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  mode = TypographyMode.FIGCAPTION,
}: ITypographyProps) {
  return React.createElement(as, { className }, children);
}

export default styled(React.memo(Typography))<ITypographyProps>`
  color: ${(props) => props.color};
  ${(props) => stylesMap[props.mode as TypographyMode]}
`;

const stylesMap = {
  [TypographyMode.HEADING]: { 'font-size': '25px' },
  [TypographyMode.FIGCAPTION]: {
    'font-size': '40px',
    'font-family': "'Roboto Slab', serif",
    'text-shadow': '2px 2px 2px black',
  },
};
