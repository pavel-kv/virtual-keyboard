import {
  languageLayout, switchLayout, KEY_LANGUAGE, DEFAULT_LANGUAGE,
} from '../../data/settings';

export default class Model {
  constructor(view) {
    this.view = view;
    this.capsLockState = false;
    this.changeLanguageLayout = new Set();

    this.validateLanguageLayout();
  }

  updateState(pressedKeys) {
    this.view.updateView(pressedKeys);
  }

  resetKeyPressed(pressedKeys) {
    const keysToReset = Object.values(pressedKeys).reduce((keys, key) => {
      const currentKey = key;
      currentKey.state = false;
      return { ...keys, [currentKey.id]: currentKey };
    }, {});

    this.view.updateView(keysToReset);
  }

  resetKeyPressedOnKeyboard(pressedKeys) {
    const keysToReset = Object.values(pressedKeys).reduce((keys, key) => {
      const currentKey = key;

      if (currentKey.value === 'CapsLock') {
        currentKey.state = false;
      }

      if (currentKey.value !== 'Alt' && currentKey.value !== 'Shift' && currentKey.value !== 'Ctrl' && currentKey.value !== 'CapsLock') {
        currentKey.value = '';
      }

      return { ...keys, [currentKey.id]: currentKey };
    }, {});

    this.view.updateView(keysToReset);
  }

  addKeyToSwitchLayout(keyCode) {
    if (switchLayout.some((key) => key === keyCode)) {
      this.changeLanguageLayout.add(keyCode);
    }
  }

  removeKeyToSwitchLayout(keyCode) {
    this.changeLanguageLayout.delete(keyCode);
  }

  switchLayout() {
    const isSwitchLayout = switchLayout.every((key) => this.changeLanguageLayout.has(key));
    if (isSwitchLayout) {
      this.view.switchLanguageLayout();
      this.switchLanguageLayoutInLocalStorage();
    }
  }

  switchLanguageLayoutInLocalStorage() {
    localStorage.setItem(KEY_LANGUAGE, languageLayout[this.language]);
    this.language = languageLayout[this.language];
  }

  isValidLanguageLayout() {
    return Object.values(languageLayout).some((language) => language === this.language);
  }

  validateLanguageLayout() {
    this.language = localStorage.getItem(KEY_LANGUAGE);
    if (!this.isValidLanguageLayout()) {
      this.language = DEFAULT_LANGUAGE;
      localStorage.setItem(KEY_LANGUAGE, this.language);
    } else if (this.language !== DEFAULT_LANGUAGE) {
      this.view.setLanguageLayout();
    }
  }
}
