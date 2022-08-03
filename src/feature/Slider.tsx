import React, { useReducer } from 'react';
import { ISettingsAction, ISliderData, ISliderSettings } from '../types/interfaces'; // FIXME перенеси все типы в этот файл, если они используются еще где-то то экспортируй их отсюда
import SlideBox from '../components/SlideBox';
import { SettingsActionEnum } from '../types/types';
import SettingsInput from '../components/SettingsInput';
import styled, { createGlobalStyle } from 'styled-components';

/* FIXME обнови порядок импортов во всех файлах по следующей схеме (если появятся новые виды импортов, уточни у меня их порядок):
  global-imports

  primitives

  components - компоненты из папки components
  ../components - не общие компоненты, которые используются в рамках модуля

  utils

  types
 */

// FIXME все styled-компоненты идет после твоего компонента, в данном случае после Slider. Это нужно сделать во всех файлах
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

// FIXME export компонента производится сразу после его объявления с отступом в одну строчку, с использованием React.memo. Это нужно сделать для всех компонентов
export default function Slider({
  slides, // FIXME выставить всем свойствам значения по-умолчанию, если они предусмотрены
  loop,
  navs,
  pags, // FIXME pages
  auto,
  stopMouseHover,
  delay,
}: ISliderData) {
  // FIXME сделать состояние настроек через mobx, на практике useReducer почти не используется
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

  // FIXME панель настроек слайдера, явно не должен находится в компоненте слайдера - первый принцип солида
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
      {/*FIXME как-то странно что глобальные стили определены в общем компоненте, а если я захочу использовать несколько слайдеров на странице? Вынести на уровень App*/}
      <GlobalStyle />
      {/*FIXME нет необходимости в данном компоненте*/}
      <SlideBox
        slides={slides}
        loop={sliderSettingsState.loop}
        navs={sliderSettingsState.navs}
        pags={sliderSettingsState.pags}
        auto={sliderSettingsState.auto}
        stopMouseHover={sliderSettingsState.stopMouseHover}
        delay={sliderSettingsState.delay}
      />
      {/*FIXME писал выше, этого тут быть не должно*/}
      <StyledHeading>Tools</StyledHeading>
      <SettingsBox>{settingsInputs}</SettingsBox>
    </>
  );
}
