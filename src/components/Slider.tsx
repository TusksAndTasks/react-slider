import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { memoizeWith } from 'ramda';
import styled from 'styled-components';

import Typography from '../primitives/Typography';
import Button from '../primitives/Button';
import Icon from '../primitives/Icon';
import PageCounter from './PageCounter';
import settingsStore from '../store/settingsStore';
import { colors } from '../Theme/colors';
import arrowBtn from '../assets/arrowButton.png';
import { TextModeEnum } from '../primitives/Typography';
import { ButtonModeEnum, ButtonSizeEnum } from '../primitives/Button';
import { IconEnum } from '../primitives/Icon';

export interface ICounterProps {
  currentPage: number;
  pagesTotal: number;
}

export enum DirectionsEnum {
  LEFT = 'left',
  RIGHT = 'right',
  STILL = 'still',
}

export interface ISlide {
  img: string;
  text: string;
}

function Slider({ slides }: { slides: ISlide[] }) {
  const { loop, navs, pages, auto, stopMouseHover, delay } = settingsStore;
  const initialVisibleSlides = slides.slice(slides.length - 1).concat(slides.slice(0, 2));

  const [sliderSlides, setSliderSlides] = useState(initialVisibleSlides);
  const [direction, setDirection] = useState(DirectionsEnum.STILL);
  const [isSlideshowStopped, setIsSlideShowStopped] = useState(false);
  const [firstSlideIndex, setFirstSlideIndex] = useState(slides.length - 1);

  const handleSlideChange = useCallback(
    (initialIndex: number, newIndex: number) => () => {
      let cropIndex = initialIndex;
      const newSlides = sliderSlides.map(() => {
        if (cropIndex >= slides.length) {
          cropIndex = 0;
        } else if (cropIndex < 0) {
          cropIndex = slides.length - 1;
        }
        return slides[cropIndex++];
      });
      setFirstSlideIndex(newIndex);
      setSliderSlides(newSlides);
      setDirection(DirectionsEnum.STILL);
    },
    [sliderSlides, slides]
  );

  const handleTransitionEnd = useCallback(
    () => () => {
      if (direction === 'left') {
        const initialIndex = firstSlideIndex - 1;
        const finalIndex = firstSlideIndex - 1 < 0 ? slides.length - 1 : firstSlideIndex - 1;
        handleSlideChange(initialIndex, finalIndex)();
      } else {
        const initialIndex = firstSlideIndex + 1;
        const finalIndex = firstSlideIndex + 1 >= slides.length ? 0 : firstSlideIndex + 1;
        handleSlideChange(initialIndex, finalIndex)();
      }
    },
    [direction, firstSlideIndex, handleSlideChange, slides.length]
  );

  const handlePagination = useCallback(
    (num: number) => () => {
      const index = num;
      handleSlideChange(index, index)();
    },
    [handleSlideChange]
  );

  const translateIntoSlideIndex = memoizeWith(
    (index: number) => index.toString(),
    (index: number) => (index === 0 ? slides.length - 1 : index - 1)
  );

  const paginationButtons = useMemo(
    () =>
      slides.map((elem, index) => (
        <Button
          onClick={handlePagination(translateIntoSlideIndex(index))}
          mode={
            translateIntoSlideIndex(index) === firstSlideIndex
              ? ButtonModeEnum.PRIMARY
              : ButtonModeEnum.SECONDARY
          }
          size={ButtonSizeEnum.SMALL}
          key={elem.img}
        >
          {index + 1}
        </Button>
      )),
    [slides, firstSlideIndex, translateIntoSlideIndex]
  );

  const handleTransitionAttempt = useCallback(
    (direction: DirectionsEnum) => () => {
      if (!loop) {
        if (direction === 'left' && firstSlideIndex === slides.length - 1) {
          return;
        } else if (direction === 'right' && firstSlideIndex === slides.length - 2) {
          return;
        }
      }
      setDirection(direction);
    },
    [loop, firstSlideIndex, slides.length]
  );

  useEffect(() => {
    if (!auto || isSlideshowStopped) return;
    const id = setInterval(() => handleTransitionAttempt(DirectionsEnum.RIGHT)(), delay * 1000);
    return () => clearInterval(id);
  }, [isSlideshowStopped, auto, delay, direction, loop, handleTransitionAttempt]);

  const slidesArr = useMemo(
    () =>
      sliderSlides.map((elem) => (
        <Slide key={elem.img}>
          <StyledCaption as="figcaption" mode={TextModeEnum.SLIDEINFO} color={colors.WHITE}>
            {elem.text}
          </StyledCaption>
          <StyledImage src={elem.img} alt="pic" />
        </Slide>
      )),
    [sliderSlides]
  );

  return (
    <div>
      <StyledView onTransitionEnd={handleTransitionEnd()}>
        <PageCounter currentPage={firstSlideIndex + 2} pagesTotal={slides.length}></PageCounter>
        <SliderBox
          direction={direction}
          onMouseEnter={() => {
            if (stopMouseHover) {
              setIsSlideShowStopped(true);
            }
          }}
          onMouseLeave={() => {
            if (stopMouseHover) {
              setIsSlideShowStopped(false);
            }
          }}
        >
          {slidesArr}
        </SliderBox>
        {navs && (
          <StyledNavContainer>
            <Button
              mode={ButtonModeEnum.TRANSPARENT}
              size={ButtonSizeEnum.LARGE}
              onClick={handleTransitionAttempt(DirectionsEnum.LEFT)}
            >
              <Icon src={arrowBtn} mode={IconEnum.REVERSE} alt="Arrow button" />
            </Button>
            <Button
              mode={ButtonModeEnum.TRANSPARENT}
              size={ButtonSizeEnum.LARGE}
              onClick={handleTransitionAttempt(DirectionsEnum.RIGHT)}
            >
              <Icon src={arrowBtn} mode={IconEnum.NORMAL} alt="Arrow button" />
            </Button>
          </StyledNavContainer>
        )}
      </StyledView>
      {pages && <StyledPagesContainer>{paginationButtons}</StyledPagesContainer>}
    </div>
  );
}

export default React.memo(observer(Slider));

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

const StyledView = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
`;

const StyledPagesContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 5px 0;
  background-color: #dcdcdc;
`;

const SliderBox = styled.div<{ direction: string }>`
  display: flex;
  overflow: hidden;
  width: 300vw;
  height: 92vh;
  transform: ${(props) =>
    props.direction === 'still'
      ? 'translate(-33.33%)'
      : props.direction === 'left'
      ? 'translate(0%)'
      : 'translate(-66.66%)'};
  transition: ${(props) => (props.direction === 'still' ? '0' : '0.9s')};
`;

const Slide = styled.figure`
  position: relative;
  width: 100%;
  margin: 0;
`;

const StyledNavContainer = styled.div`
  position: absolute;
  top: 50%;
  display: flex;
  width: 100%;
  justify-content: space-between;
`;
