import React, { useState } from 'react';
import styled from 'styled-components';

import Counter from 'primitives/Counter';

import SliderBox from 'components/Slider/SliderBox';
import NavButtonsContainer from 'components/Slider/NavButtonsContainer';
import PagesButtonsContainer from 'components/Slider/PagesButtonsContainer';

import useSlideChange from 'components/Slider/useSlideChange';
import usePagination from 'components/Slider/usePagination';
import useSlidesTransition from 'components/Slider/useSlidesTransition';
import useSlideCreation from 'components/Slider/useSlideCreation';

export enum DirectionsEnum {
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
  STILL = 'STILL',
}

export interface ISlide {
  img: string;
  text: string;
}

function Index({ slides }: { slides: ISlide[] }) {
  const [direction, setDirection] = useState(DirectionsEnum.STILL);
  const [isSlideshowStopped, setIsSlideShowStopped] = useState(false);

  const [firstSlideIndex, sliderSlides, handleSlideChange] = useSlideChange({
    slides,
    setDirection,
  });
  const paginationButtons = usePagination({ slides, firstSlideIndex, handleSlideChange });
  const [handleTransitionAttempt, handleTransitionEnd] = useSlidesTransition({
    slides,
    firstSlideIndex,
    direction,
    isSlideshowStopped,
    setDirection,
    handleSlideChange,
  });
  const slidesArr = useSlideCreation(sliderSlides);

  return (
    <div>
      <StyledView onTransitionEnd={handleTransitionEnd()}>
        <Counter
          currentNumber={firstSlideIndex + 2 > slides.length ? 1 : firstSlideIndex + 2}
          total={slides.length}
        ></Counter>
        <StyledSliderBox direction={direction} setIsSlideshowStopped={setIsSlideShowStopped}>
          {slidesArr}
        </StyledSliderBox>
        <NavButtonsContainer
          handleTransitionAttempt={handleTransitionAttempt}
        ></NavButtonsContainer>
      </StyledView>
      <PagesButtonsContainer>{paginationButtons}</PagesButtonsContainer>
    </div>
  );
}

export default React.memo(Index);

const StyledView = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
`;

const StyledSliderBox = styled(SliderBox)<{ direction: string }>`
  display: flex;
  overflow: hidden;
  width: 300vw;
  height: 92vh;
  transform: ${(props) =>
    props.direction === DirectionsEnum.STILL
      ? 'translate(-33.33%)'
      : props.direction === DirectionsEnum.LEFT
      ? 'translate(0%)'
      : 'translate(-66.66%)'};
  transition: ${(props) => (props.direction === DirectionsEnum.STILL ? '0' : '0.9s')};
`;
