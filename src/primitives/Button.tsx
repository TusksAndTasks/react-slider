import React from 'react';
import styled from 'styled-components';

import { colors } from '../Theme/colors';

export enum ButtonSizeEnum {
  SMALL = 'small',
  LARGE = 'large',
}

export enum ButtonModeEnum {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  TRANSPARENT = 'transparent',
}

interface IButtonStylesProps {
  size: ButtonSizeEnum;
  mode: ButtonModeEnum;
}

interface IButtonProps extends IButtonStylesProps {
  children?: React.ReactNode;
  onClick: () => void;
}

function Button({ children, size, mode, onClick }: IButtonProps) {
  return (
    <StyledButton onClick={onClick} size={size} mode={mode}>
      {children}
    </StyledButton>
  );
}

export default React.memo(Button);

const StyledButton = styled.button<IButtonStylesProps>`
  ${(props) => buttonStylesMap[props.size]}
  ${(props) => buttonStylesMap[props.mode]}
  
  &:hover {
    filter: brightness(0.7);
    cursor: pointer;
  }
`;

const buttonStylesMap = {
  [ButtonSizeEnum.SMALL]: {
    padding: '3px 7px',
  },
  [ButtonSizeEnum.LARGE]: {
    width: '50px',
    height: '50px',
  },
  [ButtonModeEnum.SECONDARY]: {
    'border-radius': '50%',
    color: colors.BLACK,
    'background-color': colors.GRAY,
    border: `1px solid ${colors.BLACK}`,
  },
  [ButtonModeEnum.PRIMARY]: {
    'border-radius': '50%',
    color: colors.WHITE,
    'background-color': colors.BLACK,
    border: `1px solid ${colors.WHITE}`,
  },
  [ButtonModeEnum.TRANSPARENT]: {
    'background-color': 'transparent',
    border: 'none',
  },
};
