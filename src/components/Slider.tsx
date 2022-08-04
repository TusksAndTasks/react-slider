import React, { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';
import PaginationButton from './PaginationButton';
import PageCounter from './PageCounter';
import NavigationButton from './NavigationButton';
import settingsStore from '../store/settingsStore';

export interface ICheckBoxProps {
  children?: React.ReactNode;
  checked: boolean;
  onChange: () => void;
}

export interface ITextInputProps {
  children?: React.ReactNode;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ICounterProps {
  currentPage: number;
  pagesTotal: number;
}

export interface IPaginationButtonProps {
  onClick: (e: React.MouseEvent) => void;
  value: number;
  currentSlide: number;
  children: ReactNode;
}

export interface INavButtonProps {
  mode: string;
  onClick: () => void;
}

export enum SettingsEnum {
  LOOP = 'loop',
  NAVS = 'navs',
  PAGES = 'pages',
  AUTO = 'auto',
  STOPMOUSEHOVER = 'stopMouseHover',
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

export interface ISliderSettings {
  loop: boolean;
  navs: boolean;
  pags: boolean;
  auto: boolean;
  stopMouseHover: boolean;
  delay: number;
}

export interface ISliderData extends ISliderSettings {
  slides: ISlide[];
}

const Slider = observer(({ slides }: { slides: ISlide[] }) => {
  const { loop, navs, pages, auto, stopMouseHover, delay } = settingsStore;

  const initialVisibleSlides = slides.slice(slides.length - 1).concat(slides.slice(0, 2));
  const [sliderSlides, setSliderSlides] = useState(initialVisibleSlides);
  const [direction, setDirection] = useState(DirectionsEnum.STILL);
  const [isSlideshowStopped, setIsSlideShowStopped] = useState(false);
  const [firstSlideIndex, setFirstSlideIndex] = useState(slides.length - 1);

  useEffect(() => {
    if (!auto || isSlideshowStopped) return;
    const id = setInterval(() => handleTransitionAttempt(DirectionsEnum.RIGHT), delay * 1000);
    return () => clearInterval(id);
  }, [isSlideshowStopped, auto, delay, direction, loop]);

  const handleSlideChange = useCallback(
    (initialIndex: number, newIndex: number) => {
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

  const handleTransitionEnd = useCallback(() => {
    if (direction === 'left') {
      const initialIndex = firstSlideIndex - 1;
      const finalIndex = firstSlideIndex - 1 < 0 ? slides.length - 1 : firstSlideIndex - 1;
      handleSlideChange(initialIndex, finalIndex);
    } else {
      const initialIndex = firstSlideIndex + 1;
      const finalIndex = firstSlideIndex + 1 >= slides.length ? 0 : firstSlideIndex + 1;
      handleSlideChange(initialIndex, finalIndex);
    }
  }, [direction, firstSlideIndex, handleSlideChange, slides.length]);

  const handlePagination = useCallback(
    (e: React.MouseEvent) => {
      const index = +(e.target as HTMLButtonElement).value;
      handleSlideChange(index, index);
    },
    [handleSlideChange]
  );

  const handleTransitionAttempt = useCallback(
    (direction: DirectionsEnum) => {
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

  const slidesArr = useMemo(
    () =>
      sliderSlides.map((elem) => (
        <Slide key={elem.img}>
          <StyledCaption>{elem.text}</StyledCaption>
          <StyledImage src={elem.img} alt="pic" />
        </Slide>
      )),
    [sliderSlides]
  );

  const paginationButtons = useMemo(
    () =>
      slides.map((elem, index) => (
        <PaginationButton
          onClick={handlePagination}
          value={index === 0 ? slides.length - 1 : index - 1}
          key={elem.img}
          currentSlide={firstSlideIndex}
        >
          {index + 1}
        </PaginationButton>
      )),
    [slides, firstSlideIndex, handlePagination]
  );

  return (
    <div>
      <StyledView onTransitionEnd={handleTransitionEnd}>
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
          <>
            <NavigationButton
              mode="left"
              onClick={() => handleTransitionAttempt(DirectionsEnum.LEFT)}
            />
            <NavigationButton
              mode="right"
              onClick={() => handleTransitionAttempt(DirectionsEnum.RIGHT)}
            />
          </>
        )}
      </StyledView>
      {pages && <StyledPagsContainer>{paginationButtons}</StyledPagsContainer>}
    </div>
  );
});

export default React.memo(Slider);

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
`;

const StyledCaption = styled.figcaption`
  position: absolute;
  width: 250px;
  font-size: 40px;
  font-family: 'Roboto Slab', serif;
  text-shadow: 2px 2px 2px black;
  bottom: 0;
  left: calc((100% - 250px) / 2);
  color: white;
`;

const StyledView = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
`;

const StyledPagsContainer = styled.div`
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
