import React, { ReactHTML } from 'react';
import styled from 'styled-components';

import { colors } from '../Theme/colors';

export enum TextModeEnum {
  HEADING = 'heading',
  SLIDEINFO = 'slideInfo',
}

interface ITypographyProps {
  children: React.ReactNode;
  as: keyof ReactHTML;
  mode: TextModeEnum;
  className?: string;
  color?: colors;
}

function Typography({ children, className, as }: ITypographyProps) {
  return React.createElement(as, { className }, children);
}

export default styled(React.memo(Typography))<ITypographyProps>`
  color: ${(props) => props.color};
  ${(props) => stylesMap[props.mode]}
`;

export const stylesMap = {
  [TextModeEnum.HEADING]: { 'font-size': '25px' },
  [TextModeEnum.SLIDEINFO]: {
    'font-size': '40px',
    'font-family': "'Roboto Slab', serif",
    'text-shadow': '2px 2px 2px black',
  },
};
