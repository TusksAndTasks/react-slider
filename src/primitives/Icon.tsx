import React from 'react';
import styled from 'styled-components';

// FIXME IconEnum плохое название, не понятно что в нем хранится
export enum IconEnum {
  NORMAL = 'normal',
  REVERSE = 'reverse',
}

interface IStyleIconProps {
  mode: IconEnum;
}

// FIXME нет необходимости в интерфейсе IStyleIconProps
interface IIconProps extends IStyleIconProps {
  src: string; // FIXME будет удобнее передавать не src на name
  alt: string;
}

/* FIXME помести Icon.tsx в папку Icon, внутри добавь папку icons и перетащи туда arrowButton.png(сделай через svg).
    В корне Icon создай файл iconsList из которой экспортни переменную iconsList.
    const iconsList: Record<string, string> = {
      iconName: "./icons/iconName.svg"
    };
    Обнови интерфейс иконки
    interface IIcon {
      name: keyof iconsList;
      color?: colors;
    }
    для обработки svg изображений можешь кастомизировать cra-config, добавив правило обработки svg
    addWebpackModuleRule({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    })
*/

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
