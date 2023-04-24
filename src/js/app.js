import keyboardKeys from '../data/keyboard-keys.json';
import appComponents from './components/appComponents';
import Key from './components/Key';
import View from './modules/View';
import Model from './modules/Model';
import Controller from './modules/Controller';

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

    const view = new View({
      keyboard: this.keyboard,
      keyboardInput: this.keyboardInput,
      keyboardBody: this.keyboardBody,
    });
    const model = new Model(view);
    const controller = new Controller({
      keyboard: this.keyboard,
      keyboardInput: this.keyboardInput,
      keyboardBody: this.keyboardBody,
      model,
    });
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
