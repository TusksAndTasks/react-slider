import { IPaginationButtonProps } from '../types/interfaces';
import styled from 'styled-components';
import React from 'react';

const StyledPaginationButton = styled.button<{ currentSlide: number }>`
  ${(props) =>
    props.currentSlide == props.value
      ? 'color: white; background-color: black; border: 1px solid white;'
      : 'color: black; background-color: gray; border: 1px solid black;'}
  border-radius: 50%;
  padding: 3px 7px;
`;

export default function PaginationButton({
  onClick,
  value,
  currentSlide /* FIXME нарушение последнего правила солид. Кнопка не должна знать о currentSlide.
                    Лучше определить свойство mode со значениями primary и secondary и в зависимости
                    от того равно value currentSlide или нет выставлять необходимый  mode */,
  children,
}: IPaginationButtonProps) {
  return (
    <StyledPaginationButton onClick={onClick} value={value} currentSlide={currentSlide}>
      {children}
    </StyledPaginationButton>
  );
}

// enum ButtonSize {
//   SMAlL = 'SMALL',
//   LARGE = 'LARGE',
// }
//
// interface Button {
//   children: React.ReactNode;
//   size: ButtonSize;
//   mode: "primary" | "secondary" | "transparent";
// }
//
// <Button>1</Button>
// <Button size={ButtonSize.LARGE} mode="transparent" ><img src="" alt=""/></Button>
