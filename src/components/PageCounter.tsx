import { ICounterProps } from '../types/interfaces';
import styled from 'styled-components';

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
