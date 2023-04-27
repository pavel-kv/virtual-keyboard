/*  Settings object for switching the language layout
    switchKeys - keyboard shortcut to switch language layout
    key - local storage key name
    default - default language layout
    layouts - language switching layouts
*/

const language = {
  switchKeys: ['ControlLeft', 'AltLeft'],
  key: 'custom_keyboard_layout',
  default: 'english',
  layouts: {
    english: 'russian',
    russian: 'english',
  },
};

export default language;
