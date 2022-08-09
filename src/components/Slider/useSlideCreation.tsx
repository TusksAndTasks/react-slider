import React, { useMemo } from 'react';
import styled from 'styled-components';

import Typography, { TypographyMode } from 'primitives/Typography';

import { colors } from 'Theme/colors';

import { ISlide } from 'components/Slider/index';

export default function useSlideCreation(sliderSlides: ISlide[]) {
  return useMemo(
    () =>
      sliderSlides.map((elem) => (
        <Slide key={elem.img}>
          <StyledCaption as="figcaption" mode={TypographyMode.FIGCAPTION} color={colors.WHITE}>
            {elem.text}
          </StyledCaption>
          <StyledImage src={elem.img} alt="pic" />
        </Slide>
      )),
    [sliderSlides]
  );
}

const StyledCaption = styled(Typography)`
  position: absolute;
  width: 250px;
  bottom: 0;
  left: calc((100% - 250px) / 2);
`;

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
`;

const Slide = styled.figure`
  position: relative;
  width: 100%;
  margin: 0;
`;
