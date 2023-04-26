import switchLayout from '../../data/settings';

export default class Model {
  constructor(view) {
    this.view = view;
    this.capsLockState = false;
    this.changeLanguageLayout = new Set();
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

    const isSwitchLayout = switchLayout.every((key) => this.changeLanguageLayout.has(key));
    if (isSwitchLayout) {
      this.view.switchLanguageLayout();
    }
  }

  removeKeyToSwitchLayout(keyCode) {
    this.changeLanguageLayout.delete(keyCode);
  }
}
