import React, { useReducer } from 'react';
import { ISettingsAction, ISliderData, ISliderSettings } from '../types/interfaces';
import SlideBox from '../components/SlideBox';
import { SettingsActionEnum } from '../types/types';
import SettingsInput from '../components/SettingsInput';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
body {
  margin: 0;
}
`;

const SettingsBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StyledHeading = styled.h2`
  text-align: center;
  margin-bottom: 30px;
`;

export default function Slider({
  slides,
  loop,
  navs,
  pags,
  auto,
  stopMouseHover,
  delay,
}: ISliderData) {
  function sliderSettingsReducer(state: ISliderSettings, action: ISettingsAction): ISliderSettings {
    switch (action.type) {
      case SettingsActionEnum.LOOP: {
        return { ...state, loop: action.payload.isActive };
      }
      case SettingsActionEnum.NAVS: {
        return { ...state, navs: action.payload.isActive };
      }
      case SettingsActionEnum.PAGS: {
        return { ...state, pags: action.payload.isActive };
      }
      case SettingsActionEnum.AUTO: {
        return { ...state, auto: action.payload.isActive };
      }
      case SettingsActionEnum.STOPMOUSEHOVER: {
        return { ...state, stopMouseHover: action.payload.isActive };
      }
      case SettingsActionEnum.DELAY: {
        if ((action.payload.delay as number) < 1 || isNaN(action.payload.delay as number)) {
          return { ...state, delay: 1 };
        }
        return { ...state, delay: action.payload.delay as number };
      }
      default:
        return { ...state };
    }
  }

  const initialSettingsState: ISliderSettings = {
    loop,
    navs,
    pags,
    auto,
    stopMouseHover,
    delay,
  };

  const [sliderSettingsState, sliderSettingsDispatch] = useReducer(
    sliderSettingsReducer,
    initialSettingsState
  );

  function changeSetting(type: SettingsActionEnum, isActive: boolean, delay?: number) {
    sliderSettingsDispatch({ type, payload: { isActive, delay } });
  }

  const settingsInputs = Object.keys(initialSettingsState).map((key) => (
    <SettingsInput
      actionType={key as SettingsActionEnum}
      settingState={sliderSettingsState}
      settingDispatch={changeSetting}
      key={key}
    />
  ));

  return (
    <>
      <GlobalStyle />
      <SlideBox
        slides={slides}
        loop={sliderSettingsState.loop}
        navs={sliderSettingsState.navs}
        pags={sliderSettingsState.pags}
        auto={sliderSettingsState.auto}
        stopMouseHover={sliderSettingsState.stopMouseHover}
        delay={sliderSettingsState.delay}
      />
      <StyledHeading>Tools</StyledHeading>
      <SettingsBox>{settingsInputs}</SettingsBox>
    </>
  );
}
