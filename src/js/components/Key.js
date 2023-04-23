const Key = {
  render: (key) => `
      <div class="keyboard__key key ${key.classes ?? ''}" id="${key.code}">
        <div class="key__english">
          <span class="key__case-up">${key.english.caseUp}</span>
          <span class="key__case-down">${key.english.caseDown}</span>
          <span class="key__caps-lock">${key.english.capsLock}</span>
          <span class="key__shift-caps-lock">${key.english.shiftCapsLock}</span>
        </div>
        <div class="key__russian">
          <span class="key__case-up">${key.russian.caseUp}</span>
          <span class="key__case-down">${key.russian.caseDown}</span>
          <span class="key__caps-lock">${key.russian.capsLock}</span>
          <span class="key__shift-caps-lock">${key.russian.shiftCapsLock}</span>
        </div>
      </div>`,
};

export default Key;
