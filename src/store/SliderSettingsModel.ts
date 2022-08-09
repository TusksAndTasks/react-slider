import { action, makeObservable, observable } from 'mobx';
import { memoizeWith } from 'ramda';

export interface ISliderSettings {
  loop: boolean;
  navs: boolean;
  pages: boolean;
  auto: boolean;
  stopMouseHover: boolean;
  delay: number;
}

abstract class Model<SETTINGS> {
  setFieldValueFabric = memoizeWith(String, <KEY extends keyof SETTINGS>(fieldName: KEY) =>
    action((value: SETTINGS[KEY]) => {
      (this as any)[fieldName] = value;
    })
  );
}

class SliderSettingsModel extends Model<ISliderSettings> implements ISliderSettings {
  constructor() {
    super();

    makeObservable(this, {
      loop: observable,
      navs: observable,
      pages: observable,
      auto: observable,
      stopMouseHover: observable,
      delay: observable,
      setFieldValueFabric: action,
    });
  }

  loop = true;
  navs = true;
  pages = true;
  auto = true;
  stopMouseHover = true;
  delay = 3;
}

const sliderSettingsModel = new SliderSettingsModel();

export default Object.seal(sliderSettingsModel);
