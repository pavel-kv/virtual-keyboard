export default class View {
  constructor({ keyboard, keyboardInput, keyboardBody }) {
    this.keyboard = keyboard;
    this.keyboardInput = keyboardInput;
    this.keyboardBody = keyboardBody;

    this.cursorPosition = 0;
  }

  updateView(pressedKeys) {
    this.getCursorPosition();
    this.updateKeyboardKeys(pressedKeys);
  }

  updateKeyboardKeys(pressedKeys) {
    Object.values(pressedKeys).forEach((key) => {
      const element = this.keyboardBody.querySelector(`#${key.id}`);
      switch (key.value) {
        case 'CapsLock':
          if (key.state) {
            element.classList.toggle('key_pressed');
            this.keyboardBody.classList.toggle('keyboard_caps-lock-pressed');
          }
          break;
        case 'Shift':
          if (key.state) {
            this.keyboardBody.classList.add('keyboard_shift-pressed');
          } else {
            this.keyboardBody.classList.remove('keyboard_shift-pressed');
          }
          break;
        case 'Tab':
          if (key.state) {
            this.updateText('\t');
          }
          break;
        case 'Backspace':
          if (key.state) {
            this.removeSymbol(key.value);
          }
          break;
        case 'Del':
          if (key.state) {
            this.removeSymbol(key.value);
          }
          break;
        case 'Enter':
          if (key.state) {
            this.updateText('\n');
          }
          break;
        case 'Ctrl':
        case 'Alt':
        case 'Win':
          break;
        default:
          if (key.state) {
            this.updateText(key.value);
          }
      }

      if (key.value !== 'CapsLock') {
        if (key.state) {
          element.classList.add('key_pressed');
        } else {
          element.classList.remove('key_pressed');
        }
      }
    });
  }

  updateText(keyValue) {
    this.keyboardInput.setRangeText(keyValue, this.cursorPosition, this.cursorPosition);
    this.cursorPosition += keyValue.length;
    this.setCursorPosition();
  }

  removeSymbol(key) {
    let offset;

    switch (key) {
      case 'Backspace':
        offset = 0;
        break;
      case 'Del':
        offset = 1;
        break;
      default:
        offset = 0;
    }

    if (this.cursorPosition > 0 || offset) {
      this.keyboardInput.setRangeText('', this.cursorPosition - 1 + offset, this.cursorPosition + offset);
    }

    this.cursorPosition += (offset - 1);
    this.setCursorPosition();
  }

  getCursorPosition() {
    this.cursorPosition = this.keyboardInput.selectionStart;
  }

  setCursorPosition() {
    if (this.cursorPosition < 0) {
      this.cursorPosition = 0;
    }
    this.keyboardInput.selectionStart = this.cursorPosition;
    this.keyboardInput.setSelectionRange(this.cursorPosition, this.cursorPosition);
  }

  switchLanguageLayout() {
    this.keyboardBody.classList.toggle('keyboard_lang-russian');
  }

  setLanguageLayout() {
    this.keyboardBody.classList.add('keyboard_lang-russian');
  }

  removeLanguageLayout() {
    this.keyboardBody.classList.remove('keyboard_lang-russian');
  }
}
