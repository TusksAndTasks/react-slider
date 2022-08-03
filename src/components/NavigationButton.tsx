import { INavButtonProps } from './Slider';
import styled from 'styled-components';
import arrowBtn from '../assets/arrowButton.png';

const StyledNavButton = styled.button`
  position: absolute;
  top: 50%;
  left: ${(props) => (props.value === 'right' ? '96%' : '1%')};
  background-color: transparent;
  border: none;
  background-image: url(${arrowBtn});
  background-repeat: no-repeat;
  background-size: contain;
  width: 50px;
  height: 50px;
  ${(props) => (props.value === 'right' ? '' : 'transform: rotate(180deg)')};
  filter: invert();

  &:hover {
    filter: invert() brightness(0.5);
    cursor: pointer;
  }
`;

// FIXME NavigationButton и PaginationButton - это костыль. Объедини их в примитив Button, который будет лежать в папке primitives
export default function NavigationButton({ value, onClick }: INavButtonProps) {
  return (
    <StyledNavButton
      value={value}
      onClick={(e) => onClick((e.target as HTMLButtonElement).value)}
    ></StyledNavButton>
  );
}
