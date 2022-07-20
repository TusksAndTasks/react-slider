import { IPaginationButtonProps } from '../types/interfaces';
import styled from 'styled-components';

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
  currentSlide,
  children,
}: IPaginationButtonProps) {
  return (
    <StyledPaginationButton onClick={onClick} value={value} currentSlide={currentSlide}>
      {children}
    </StyledPaginationButton>
  );
}
