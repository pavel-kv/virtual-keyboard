export default class Controller {
  constructor({
    keyboard,
    keyboardInput,
    keyboardBody,
    model,
  }) {
    this.keyboard = keyboard;
    this.keyboardInput = keyboardInput;
    this.keyboardBody = keyboardBody;
    this.model = model;

    this.pressedKeys = {};
    this.pressedKeysOnKeyboard = {};

    this.handleMouseEvents = this.handleMouseEvents.bind(this);
    this.resetPressedKeys = this.resetPressedKeys.bind(this);
    this.handleKeyboardEvents = this.handleKeyboardEvents.bind(this);

    this.addKeyboardEventListener();
  }

  addKeyboardEventListener() {
    this.keyboardBody.addEventListener('mousedown', this.handleMouseEvents);
    this.keyboardBody.addEventListener('mouseup', this.handleMouseEvents);
    document.body.addEventListener('mouseup', this.resetPressedKeys);
    document.body.addEventListener('keydown', this.handleKeyboardEvents);
    document.body.addEventListener('keyup', this.handleKeyboardEvents);
  }

  handleMouseEvents(event) {
    event.preventDefault();
    const pressedKey = event.target.closest('.key');

    this.model.resetKeyPressed(this.pressedKeys);

    if (!pressedKey) {
      return;
    }

    this.pressedKeys = {};
    const { id } = pressedKey;
    let state;
    const value = Controller.getValuePressedKey(pressedKey);

    switch (event.type) {
      case 'mousedown':
        state = true;
        break;
      case 'mouseup':
        state = false;
        break;
      default:
    }

    this.pressedKeys[id] = { id, state, value };
    this.model.updateState(this.pressedKeys);
  }

  static getValuePressedKey(keyElement) {
    let keyValue = null;

    [...keyElement.children].forEach((languageLayout) => {
      const languageLayoutDisplayProps = window.getComputedStyle(languageLayout).getPropertyValue('display');

      if (languageLayoutDisplayProps !== 'none') {
        [...languageLayout.children].forEach((value) => {
          const keyStateDisplayProps = window.getComputedStyle(value).getPropertyValue('display');

          if (keyStateDisplayProps !== 'none') {
            keyValue = value.textContent;
          }
        });
      }
    });

    return keyValue;
  }

  resetPressedKeys(event) {
    event.preventDefault();
    this.model.resetKeyPressed(this.pressedKeys);
  }

  handleKeyboardEvents(event) {
    event.preventDefault();
    const pressedKeyId = event.code;
    const pressedVirtualKey = document.getElementById(pressedKeyId);

    this.model.resetKeyPressedOnKeyboard(this.pressedKeysOnKeyboard);

    if (!pressedVirtualKey) {
      return;
    }

    const value = Controller.getValuePressedKey(pressedVirtualKey);
    let state;

    switch (event.type) {
      case 'keydown':
        state = true;
        this.model.addKeyToSwitchLayout(pressedKeyId);
        break;
      case 'keyup':
        state = false;
        this.model.removeKeyToSwitchLayout(pressedKeyId);
        break;
      default:
    }

    if (pressedKeyId === 'CapsLock' && event.repeat) {
      state = false;
    }

    this.pressedKeysOnKeyboard[pressedKeyId] = { id: pressedKeyId, state, value };
    this.model.updateState(this.pressedKeysOnKeyboard);
  }
}
