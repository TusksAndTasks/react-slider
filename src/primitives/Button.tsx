import React from 'react';
import styled from 'styled-components';

import { colors } from '../Theme/colors';

// FIXME привести перечисления в общий вид
export enum ButtonSizeEnum {
  SMALL = 'small',
  LARGE = 'large',
}

export enum ButtonModeEnum {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  TRANSPARENT = 'transparent',
}

// FIXME лишний интерфейс
interface IButtonStylesProps {
  size: ButtonSizeEnum; // FIXME необязательное, по-умолчанию SMALL
  mode: ButtonModeEnum; // FIXME необязательное, по-умолчанию PRIMARY
}

interface IButtonProps extends IButtonStylesProps {
  children?: React.ReactNode;
  onClick: () => void;
}

function Button({ children, size, mode, onClick }: IButtonProps) {
  return (
    // FIXME функции в конце
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

/* FIXME const buttonStylesMap: Record<ButtonSizeEnum, React.CSSProperties>.
    Типизируем все что можно затипизировать, даже если ts не ругается.
    Иначе если завтра добавятся еще какие-то модификаторы для кнопки, то объект со стилями превратится в кашу.
    Уже сейчас он отражает стили по размеру и модификаторам, что противоречит принципу единственно ответственности
*/
const buttonStylesMap = {
  [ButtonSizeEnum.SMALL]: {
    padding: '3px 7px',
  },
  [ButtonSizeEnum.LARGE]: {
    // FIXME странно что для LARGE размеры не через отступы, а через height и width, придерживайся однообразия
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
