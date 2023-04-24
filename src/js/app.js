import keyboardKeys from '../data/keyboard-keys.json';
import appComponents from './components/appComponents';
import Key from './components/Key';

class AppVirtualKeyboard {
  constructor({
    appContainer,
    keyboardId,
    keyboardInputId,
    keyboardBodyId,
    components,
    keyboardKeyData,
  }) {
    this.components = components;
    this.keyboardKeyData = keyboardKeyData;

    this.renderComponents(appContainer);

    this.keyboard = document.querySelector(keyboardId);
    this.keyboardInput = document.querySelector(keyboardInputId);
    this.keyboardBody = document.querySelector(keyboardBodyId);

    this.renderKeyboard();
  }

  renderComponents(container) {
    const root = document.createElement('div');
    root.classList.add(container);
    const componentsList = Object.keys(this.components);

    componentsList.forEach((item) => {
      root.innerHTML += this.components[item].render();
    });

    document.body.prepend(root);
  }

  renderKeyboard() {
    this.keyboardKeyData.forEach((row) => {
      const keyboardRow = document.createElement('div');
      keyboardRow.classList.add('keyboard__row');

      row.forEach((key) => {
        keyboardRow.innerHTML += Key.render(key);
      });

      this.keyboardBody.append(keyboardRow);
    });
  }
}

document.addEventListener('load', new AppVirtualKeyboard({
  appContainer: 'app',
  keyboardId: '#keyboard-container',
  keyboardInputId: '#keyboard-input',
  keyboardBodyId: '#keyboard-body',
  components: appComponents,
  keyboardKeyData: keyboardKeys,
}));
