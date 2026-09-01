import AbstractView from './AbstractView.js';

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('Confirmation');
  }

  async getHtml() {
    return `
            <h1>Settings</h1>
            <p>Manage confirmation.</p>
        `;
  }
}
