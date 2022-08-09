import React, { useCallback, useEffect } from 'react';

import sliderSettingsModel from 'store/SliderSettingsModel';

import { DirectionsEnum, ISlide } from 'components/Slider/index';

interface ITransitionHookProps {
  slides: ISlide[];
  firstSlideIndex: number;
  direction: DirectionsEnum;
  isSlideshowStopped: boolean;
  setDirection: React.Dispatch<React.SetStateAction<DirectionsEnum>>;
  handleSlideChange: (initialIndex: number, newIndex: number) => () => void;
}

type TransitionHookReturn = [(direction: DirectionsEnum) => () => void, () => () => void];

export default function useSlidesTransition({
  slides,
  firstSlideIndex,
  direction,
  isSlideshowStopped,
  setDirection,
  handleSlideChange,
}: ITransitionHookProps): TransitionHookReturn {
  const { loop, auto, delay } = sliderSettingsModel;

  const handleTransitionEnd = useCallback(
    () => () => {
      if (direction === DirectionsEnum.LEFT) {
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

  const handleTransitionAttempt = useCallback(
    (direction: DirectionsEnum) => () => {
      if (!loop) {
        if (direction === DirectionsEnum.LEFT && firstSlideIndex === slides.length - 1) {
          return;
        } else if (direction === DirectionsEnum.RIGHT && firstSlideIndex === slides.length - 2) {
          return;
        }
      }
      setDirection(direction);
    },
    [loop, firstSlideIndex, slides.length]
  );

  useEffect(() => {
    console.log(123);
    if (!auto || isSlideshowStopped) return;
    const id = setInterval(() => handleTransitionAttempt(DirectionsEnum.RIGHT)(), delay * 1000);
    return () => clearInterval(id);
  }, [isSlideshowStopped, auto, delay, direction, handleTransitionAttempt]);

  return [handleTransitionAttempt, handleTransitionEnd];
}
