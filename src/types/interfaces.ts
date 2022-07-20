import React, { ReactNode } from 'react';
import { SettingsActionEnum } from './types';

export interface ISlide {
  img: string;
  text: string;
}

export interface ISliderProps {
  slides: ISlide[];
  loop: boolean;
  navs: boolean;
  pags: boolean;
  auto: boolean;
  stopMouseHover: boolean;
  delay: number;
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

export interface ISettingsAction {
  type: SettingsActionEnum;
  payload: {
    isActive: boolean;
    delay?: number;
  };
}

export interface ISettingInputProps {
  actionType: SettingsActionEnum;
  settingDispatch: (type: SettingsActionEnum, isActive: boolean, delay?: number) => void;
  settingState: ISliderSettings;
}

export interface INavButtonProps {
  value: string;
  onClick: (direction: string) => void;
}
