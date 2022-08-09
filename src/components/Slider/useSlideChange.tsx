import React, { useCallback, useState } from 'react';

import { DirectionsEnum, ISlide } from 'components/Slider/index';

interface ISlideChangeHookProps {
  slides: ISlide[];
  setDirection: React.Dispatch<React.SetStateAction<DirectionsEnum>>;
}

type ISlideChangeHookReturn = [
  number,
  ISlide[],
  (initialIndex: number, newIndex: number) => () => void
];

export default function useSlideChange({
  slides,
  setDirection,
}: ISlideChangeHookProps): ISlideChangeHookReturn {
  const initialVisibleSlides = slides.slice(slides.length - 1).concat(slides.slice(0, 2));
  const [sliderSlides, setSliderSlides] = useState(initialVisibleSlides);
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
    [setDirection, sliderSlides, slides]
  );

  return [firstSlideIndex, sliderSlides, handleSlideChange];
}
