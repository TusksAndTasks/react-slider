import React, { useCallback } from 'react';
import { observer } from 'mobx-react-lite';

import sliderSettingsModel from 'store/SliderSettingsModel';

interface ISliderBoxProps {
  children?: React.ReactNode;
  className?: string;
  setIsSlideshowStopped: React.Dispatch<React.SetStateAction<boolean>>;
}

function SliderBox({ children, className, setIsSlideshowStopped }: ISliderBoxProps) {
  const { stopMouseHover } = sliderSettingsModel;

  const handleMouseBehaviour = useCallback(
    (flag: boolean) => () => {
      if (stopMouseHover) {
        setIsSlideshowStopped(flag);
      }
    },
    [stopMouseHover, setIsSlideshowStopped]
  );

  return (
    <div
      className={className}
      onMouseEnter={handleMouseBehaviour(true)}
      onMouseLeave={handleMouseBehaviour(false)}
    >
      {children}
    </div>
  );
}

export default React.memo(observer(SliderBox));
