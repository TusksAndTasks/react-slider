import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react-lite';

import Button, { ButtonModeEnum, ButtonSizeEnum } from 'primitives/Button';
import Icon from 'primitives/Icon/Icon';

import SliderSettingsModel from 'store/SliderSettingsModel';

import { DirectionsEnum } from 'components/Slider/index';

interface INavButtonContainerProps {
  handleTransitionAttempt: (direction: DirectionsEnum) => () => void;
}

function NavButtonsContainer({ handleTransitionAttempt }: INavButtonContainerProps) {
  const { navs } = SliderSettingsModel;

  return (
    <>
      {navs && (
        <StyledNavContainer>
          <Button
            mode={ButtonModeEnum.TRANSPARENT}
            size={ButtonSizeEnum.LARGE}
            onClick={handleTransitionAttempt(DirectionsEnum.LEFT)}
          >
            <Icon name={'leftArrowButton'} alt="Arrow button" />
          </Button>
          <Button
            mode={ButtonModeEnum.TRANSPARENT}
            size={ButtonSizeEnum.LARGE}
            onClick={handleTransitionAttempt(DirectionsEnum.RIGHT)}
          >
            <Icon name={'rightArrowButton'} alt="Arrow button" />
          </Button>
        </StyledNavContainer>
      )}
    </>
  );
}

export default React.memo(observer(NavButtonsContainer));

const StyledNavContainer = styled.div`
  position: absolute;
  top: 50%;
  display: flex;
  width: 100%;
  justify-content: space-between;
`;
