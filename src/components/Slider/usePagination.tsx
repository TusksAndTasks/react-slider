import React, { useCallback, useMemo } from 'react';
import { memoizeWith } from 'ramda';

import Button, { ButtonModeEnum, ButtonSizeEnum } from 'primitives/Button';

import { ISlide } from 'components/Slider/index';

interface IPaginationHookProps {
  slides: ISlide[];
  firstSlideIndex: number;
  handleSlideChange: (initialIndex: number, newIndex: number) => () => void;
}

export default function usePagination({
  slides,
  firstSlideIndex,
  handleSlideChange,
}: IPaginationHookProps) {
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

  return useMemo(
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
    [handlePagination, slides, firstSlideIndex, translateIntoSlideIndex]
  );
}
