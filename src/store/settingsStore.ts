import React from 'react';
import { action, makeObservable, observable } from 'mobx';
import { identity, memoizeWith } from 'ramda';

export enum SettingsEnum {
  LOOP = 'loop',
  NAVS = 'navs',
  PAGES = 'pages',
  AUTO = 'auto',
  STOPMOUSEHOVER = 'stopMouseHover',
}

export enum TextInputEnum {
  DELAY = 'delay',
  NOTE = 'note',
}

export enum TextInputChangerEnum {
  CHANGEDELAY = 'changeDelay',
  CHANGENOTE = 'changeNote',
}

const inputsWithChangers = new Map()
  .set(TextInputEnum.DELAY, TextInputChangerEnum.CHANGEDELAY)
  .set(TextInputEnum.NOTE, TextInputChangerEnum.CHANGENOTE);

class settingsStore {
  loop = true;
  navs = true;
  pages = true;
  auto = true;
  stopMouseHover = true;
  delay = 3;
  note = '';

  constructor() {
    makeObservable(this, {
      loop: observable,
      navs: observable,
      pages: observable,
      auto: observable,
      stopMouseHover: observable,
      delay: observable,
      changeDelay: action,
      changeNote: action,
      note: observable,
    });
  }

  toggleCheckboxes = memoizeWith(identity, (str: SettingsEnum) =>
    action(() => {
      this[str] = !this[str];
    })
  );

  changeTextInput = memoizeWith(
    identity,
    (str: TextInputEnum) => (e: React.ChangeEvent<HTMLInputElement>) => {
      this[inputsWithChangers.get(str) as TextInputChangerEnum](e);
    }
  );

  changeNote = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.note = e.target.value;
  };

  changeDelay = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (+e.target.value < 1 || isNaN(+e.target.value)) {
      this.delay = 1;
    } else {
      this.delay = +e.target.value;
    }
  };
}

export default new settingsStore();
