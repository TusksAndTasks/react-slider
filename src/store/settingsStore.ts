import { makeAutoObservable } from 'mobx';
import { SettingsEnum } from '../components/Slider';

class settingsStore {
  loop = true;
  navs = true;
  pages = true;
  auto = true;
  stopMouseHover = true;
  delay = 3;

  constructor() {
    makeAutoObservable(this);
  }

  toggleProp(str: SettingsEnum) {
    this[str] = !this[str];
  }

  changeDelay(delay: number) {
    if (delay < 1 || isNaN(delay)) {
      this.delay = 1;
    } else {
      this.delay = delay;
    }
  }
}

export default new settingsStore();
