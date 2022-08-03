import { ICounterProps } from './Slider';
import styled from 'styled-components';

// FIXME Использовать или для типографии на месте не очень правильный подход.
//  Создай примитив Typography со следующим интерфейсом, весь текст на проекте должен быть обернут в примитив Typography
//  { children: string; type: "Heading" | "Paragraph" | "Label"; color: typeof colors(вынеси в переменную colors все цвета на проекте) }
const StyledCounter = styled.p`
  position: absolute;
  top: 0;
  left: 20px;
  z-index: 2;
  font-size: 40px;
  font-family: 'Roboto Slab', serif;
  color: white;
  text-shadow: 2px 2px 2px black;
`;

export default function PageCounter({ currentPage, pagesTotal }: ICounterProps) {
  return (
    <StyledCounter>
      {currentPage > pagesTotal ? 1 : currentPage}/{pagesTotal}
    </StyledCounter>
  );
}
