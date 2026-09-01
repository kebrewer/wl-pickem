import AbstractView from './AbstractView.js';

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('Payment');
  }

  enableListeners(){}

  showPaymentPage(){
    const template = document.getElementById('stripebttn');
        const firstClone = template.content.cloneNode(true);
        document.getElementById('maincontent').innerHTML = '';
        document.getElementById('maincontent').append(firstClone);
     }

  async getHtml() {
    return `
    <div style="width: 100%; text-align: center">
    <stripe-buy-button
      buy-button-id="buy_btn_1O0deKFD6FDvUpvf90deDz9s"
      publishable-key="pk_live_51NzK2mFD6FDvUpvfgIDrt4Yvr7EdLmBPvv2KhTz1ZeMxOEGBhVCZc9wo6yNvPH04fFJcrnecWsjAsCrEOjm17KN0006C3fXt9H"
    >
    </stripe-buy-button>
  </div>
        `;
  }
}
