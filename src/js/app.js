import keyboardKeys from '../data/keyboard-keys.json';
import appComponents from './components/appComponents';
import Key from './components/Key';

class AppVirtualKeyboard {
  constructor(settings) {
    const {
      appContainer,
      components,
      keyboardId,
      keyboardInputId,
      keyboardBodyId,
      keyboardKeyData,
    } = settings;

    this.renderComponents(appContainer, components);

    const keyboard = document.querySelector(keyboardId);
    const keyboardInput = document.querySelector(keyboardInputId);
    const keyboardBody = document.querySelector(keyboardBodyId);

    this.renderKeyboard(keyboardBody, keyboardKeyData);
  }

  renderComponents(container, components) {
    const root = document.createElement('div');
    root.classList.add(container);
    const componentsList = Object.keys(components);

    componentsList.forEach((item) => {
      root.innerHTML += components[item].render();
    });

    document.body.prepend(root);
  }

  renderKeyboard(keyboard, keys) {
    keys.forEach((row) => {
      const keyboardRow = document.createElement('div');
      keyboardRow.classList.add('keyboard__row');

      row.forEach((key) => {
        keyboardRow.innerHTML += Key.render(key);
      });

      keyboard.append(keyboardRow);
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
