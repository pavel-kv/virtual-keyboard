export default class Model {
  constructor(view) {
    this.view = view;
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
}
