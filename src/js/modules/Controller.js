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

    this.handleMouseEvents = this.handleMouseEvents.bind(this);
    this.resetPressedKeys = this.resetPressedKeys.bind(this);

    this.addKeyboardEventListener();
  }

  addKeyboardEventListener() {
    this.keyboardBody.addEventListener('mousedown', this.handleMouseEvents);
    this.keyboardBody.addEventListener('mouseup', this.handleMouseEvents);
    document.body.addEventListener('mouseup', this.resetPressedKeys);
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
}
