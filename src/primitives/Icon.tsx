import React from 'react';
import styled from 'styled-components';

export enum IconEnum {
  NORMAL = 'normal',
  REVERSE = 'reverse',
}

interface IStyleIconProps {
  mode: IconEnum;
}

interface IIconProps extends IStyleIconProps {
  src: string;
  alt: string;
}

function Icon({ mode, src, alt }: IIconProps) {
  return <StyledIcon src={src} mode={mode} alt={alt} />;
}

export default React.memo(Icon);

const StyledIcon = styled.img<IStyleIconProps>`
  width: 100%;
  height: 100%;
  ${(props) => iconStylesMap[props.mode]}
`;

const iconStylesMap = {
  [IconEnum.NORMAL]: {
    filter: 'invert()',
  },
  [IconEnum.REVERSE]: { transform: 'rotate(180deg)', filter: 'invert()' },
};
