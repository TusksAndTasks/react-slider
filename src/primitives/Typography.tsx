import React, { ReactHTML } from 'react';
import styled from 'styled-components';

import { colors } from '../Theme/colors';

// FIXME TypographyMode, Enum не нужен в конце
// FIXME Ключ и значение в перечислении должны быть одинаковыми и в капсе. Эти два замечания справедливы для всех перечислений в проекте.
// FIXME например, SMALL='SMALL', EXTRA_SMALL = 'EXTRA_SMALL'
export enum TextModeEnum {
  HEADING = 'heading',
  /* FIXME как-то странно что модификация типографии называется sliderInfo,
      а если у меня на странице есть текст с точно такими же стилями, но он не находится в слайдере,
      получается мне нужно создать новый мод? Лучше Paragraph
   */
  SLIDEINFO = 'slideInfo',
}

interface ITypographyProps {
  children: React.ReactNode;
  as: keyof ReactHTML; // FIXME не обязательные свойство, по-умолчанию span
  mode: TextModeEnum; // FIXME не обязательные свойство, по-умолчанию мод Paragraph
  className?: string;
  color?: colors;
}

function Typography({ children, className, as }: ITypographyProps) {
  return React.createElement(as, { className }, children);
}

// FIXME получится React.memo(styled(Typography...? Возможно styled сам оборачивает в memo, посмотри через dev-тулы
export default styled(React.memo(Typography))<ITypographyProps>`
  color: ${(props) => props.color};
  ${(props) => stylesMap[props.mode]}
`;

// FIXME это экспортироваться не должно
export const stylesMap = {
  [TextModeEnum.HEADING]: { 'font-size': '25px' },
  [TextModeEnum.SLIDEINFO]: {
    'font-size': '40px',
    'font-family': "'Roboto Slab', serif",
    'text-shadow': '2px 2px 2px black',
  },
};
