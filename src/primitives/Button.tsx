import React from 'react';
import styled from 'styled-components';

import { colors } from 'Theme/colors';

export enum ButtonSizeEnum {
  SMALL = 'SMALL',
  LARGE = 'LARGE',
}

export enum ButtonModeEnum {
  PRIMARY = 'PRIMARY',
  SECONDARY = 'SECONDARY',
  TRANSPARENT = 'TRANSPARENT',
}

interface IButtonProps {
  children?: React.ReactNode;
  size?: ButtonSizeEnum;
  mode?: ButtonModeEnum;
  onClick: () => void;
}

function Button({
  children,
  size = ButtonSizeEnum.SMALL,
  mode = ButtonModeEnum.PRIMARY,
  onClick,
}: IButtonProps) {
  return (
    <StyledButton size={size} mode={mode} onClick={onClick}>
      {children}
    </StyledButton>
  );
}

export default React.memo(Button);

const StyledButton = styled.button<IButtonProps>`
  ${(props) => buttonSizeStylesMap[props.size as ButtonSizeEnum]}
  ${(props) => buttonModeStylesMap[props.mode as ButtonModeEnum]}

  &:hover {
    filter: brightness(0.7);
    cursor: pointer;
  }
`;

/* FIXME const buttonStylesMap: Record<ButtonSizeEnum, React.CSSProperties>.
    Типизируем все что можно затипизировать, даже если ts не ругается.
    Иначе если завтра добавятся еще какие-то модификаторы для кнопки, то объект со стилями превратится в кашу.
    Уже сейчас он отражает стили по размеру и модификаторам, что противоречит принципу единственно ответственности
*/
const buttonSizeStylesMap: Record<ButtonSizeEnum, any> = {
  [ButtonSizeEnum.SMALL]: {
    width: '21px',
    height: '21px',
    padding: 0,
  },
  [ButtonSizeEnum.LARGE]: {
    width: '50px',
    height: '50px',
  },
};

const buttonModeStylesMap: Record<ButtonModeEnum, any> = {
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
