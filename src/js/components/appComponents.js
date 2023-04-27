const Header = {
  render: (classes = '') => `
      <header class="header ${classes}">
        <h1 class="header__title">Virtual Keyboard</h1>
      </header>`,
};

const Content = {
  render: (classes = '') => `
    <main class="keyboard ${classes}" id="keyboard-container">
      <textarea class="keyboard__input" name="" id="keyboard-input"></textarea>
      <div class="keyboard__body" id="keyboard-body"></div>
    </main>`,
};

const Footer = {
  render: (classes = '') => `
      <footer class="footer ${classes}">
        <p class="text">The keyboard was created in the Windows operating system</p>
        <p class="text">To switch the language between English and Russian, use the keys combination: left ctrl + alt</p>
      </footer>`,
};

const appComponents = {
  header: Header,
  content: Content,
  footer: Footer,
};

export default appComponents;
