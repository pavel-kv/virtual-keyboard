export default class Model {
  constructor(view, language) {
    this.view = view;
    this.language = language;
    this.capsLockState = false;
    this.setOfKeysToSwitchLayout = new Set();
    this.currentLanguage = null;
    this.checkLanguageLayout();
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

  addKeyToSwitchLayout(keyCode) {
    if (this.language.switchKeys.some((key) => key === keyCode)) {
      this.setOfKeysToSwitchLayout.add(keyCode);
    }
  }

  removeKeyToSwitchLayout(keyCode) {
    this.setOfKeysToSwitchLayout.delete(keyCode);
  }

  switchLayout() {
    const toSwitch = this.language.switchKeys.every((key) => this.setOfKeysToSwitchLayout.has(key));

    if (toSwitch) {
      this.view.switchLanguageLayout();
      this.switchLanguageLayoutInLocalStorage();
    }
  }

  switchLanguageLayoutInLocalStorage() {
    localStorage.setItem(this.language.key, this.language.layouts[this.currentLanguage]);
    this.currentLanguage = this.language.layouts[this.currentLanguage];
  }

  isValidLanguageLayout() {
    return Object.values(this.language.layouts).some((lang) => lang === this.currentLanguage);
  }

  checkLanguageLayout() {
    this.currentLanguage = localStorage.getItem(this.language.key);

    if (!this.isValidLanguageLayout()) {
      this.currentLanguage = this.language.default;
      localStorage.setItem(this.language.key, this.currentLanguage);
    } else if (this.currentLanguage !== this.language.default) {
      this.view.setLanguageLayout();
    }
  }
}
