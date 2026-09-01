import AbstractView from './AbstractView.js';

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('Score');
  }

  async getHtml() {
    return `
            <h1>Settings</h1>
            <p>Manage score.</p>
        `;
  }

  //How this is used in scoring
// if (userPick.beginners["1st"] === results.beginners["1st"]) {
//   score += 10;
// }
// if (userPick.beginners["2nd"] === results.beginners["2nd"]) {
//     score += 7;
// }   
}