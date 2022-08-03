import React, { ReactNode, useEffect, useState } from 'react';
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
  value: string;
  onClick: (direction: string) => void;
}

export enum SettingsEnum {
  LOOP = 'loop',
  NAVS = 'navs',
  PAGES = 'pages',
  AUTO = 'auto',
  STOPMOUSEHOVER = 'stopMouseHover',
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

// FIXME export компонента производится сразу после его объявления с отступом в одну строчку, с использованием React.memo. Это нужно сделать для всех компонентов
const Slider = observer(({ slides }: { slides: ISlide[] }) => {
  const { loop, navs, pages, auto, stopMouseHover, delay } = settingsStore;

  const [sliderSlides, setSliderSlides] = useState(
    slides.slice(slides.length - 1).concat(slides.slice(0, 2)) // FIXME Что это за магия?
  );
  const [direction, setDirection] = useState('still'); // FIXME сделать значения Direction через enum
  const [isSlideshowStopped, setIsSlideShowStopped] = useState(false);
  const [firstSlideIndex, setFirstSlideIndex] = useState(slides.length - 1);

  const slidesArr = sliderSlides.map((elem) => (
    <Slide key={elem.img}>
      <StyledCaption>{elem.text}</StyledCaption>
      <StyledImage src={elem.img} alt="pic" />
    </Slide>
  ));

  useEffect(() => {
    // FIXME Всегда избегай вложенности, если это возможно
    //  if (!auto || isSlideshowStopped) return;
    if (auto) {
      if (!isSlideshowStopped) {
        const id = setInterval(() => handleTransitionAttempt('right'), delay * 1000);
        // FIXME Нет необходимости именовать данную функцию, а лучше сделать через ее стрелочной
        return function cleanup() {
          clearInterval(id);
        };
      }
    }
  }, [isSlideshowStopped, auto, delay, direction, loop]);

  function handleSlideChange(initialIndex: number, newIndex: number) {
    const newSlides = sliderSlides.map(() => {
      if (initialIndex >= slides.length) {
        initialIndex = 0; // FIXME - аргументы функции изменять нельзя. НИКОГДА
      } else if (initialIndex < 0) {
        initialIndex = slides.length - 1;
      }
      return slides[initialIndex++];
    });
    setFirstSlideIndex(newIndex);
    setSliderSlides(newSlides);
    setDirection('still');
  }

  function handleTransitionEnd() {
    if (direction === 'left') {
      const initialIndex = firstSlideIndex - 1;
      const finalIndex = firstSlideIndex - 1 < 0 ? slides.length - 1 : firstSlideIndex - 1;
      handleSlideChange(initialIndex, finalIndex);
    } else {
      const initialIndex = firstSlideIndex + 1;
      const finalIndex = firstSlideIndex + 1 >= slides.length ? 0 : firstSlideIndex + 1;
      handleSlideChange(initialIndex, finalIndex);
    }
  }

  // FIXME нет необходимости выносить это в переменную, если не используется мемоизация.
  const paginationButtons = slides.map((elem, index) => (
    <PaginationButton
      onClick={handlePagination}
      value={index === 0 ? slides.length - 1 : index - 1}
      key={elem.img}
      currentSlide={firstSlideIndex}
    >
      {index + 1}
    </PaginationButton>
  ));

  function handlePagination(e: React.MouseEvent) {
    const index = +(e.target as HTMLButtonElement).value;
    handleSlideChange(index, index);
  }

  function handleTransitionAttempt(direction: string) {
    if (!loop) {
      if (direction === 'left' && firstSlideIndex === slides.length - 1) {
        return;
      } else if (direction === 'right' && firstSlideIndex === slides.length - 2) {
        return;
      }
    }
    setDirection(direction);
  }

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
            <NavigationButton value="left" onClick={handleTransitionAttempt} />
            <NavigationButton value="right" onClick={handleTransitionAttempt} />
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
