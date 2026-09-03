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

  getSelections(category) {
    try {
      return JSON.parse(sessionStorage.getItem(`selections_${category}`)) ?? {};
    } catch {
      return {};
    }
  }

  renderSelectionsList() {
    const categories = [
      ['BEGINNERS', 'BEGINNERS'],
      ['NEW_SCHOOL', 'NEW SCHOOL'],
      ['OLD_SCHOOL', 'OLD SCHOOL'],
      ['OVER_60', '60 PLUS'],
      ['WALKERS', 'WALKERS'],
    ];
    const places = ['1st', '2nd', '3rd'];

    return categories
      .map(([category, label]) => {
        const selections = this.getSelections(category);

        return `
          <section>
          <span class="inline-flex items-center gap-2">
            <h2 class="mb-1 font-semibold">${label} </h2><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6 text-yellow-500">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
      </svg></span>
            <ul class="list list-disc pl-6">
              ${places
                .map(
                  (place, index) => `
                    <li class="list-row py-1">
                      <span>${index + 1}. ${selections[place] || 'No selection'}</span>
                    </li>`,
                )
                .join('')}
            </ul>
          </section>`;
      })
      .join('');
  }

  async getHtml() {
    return `
      <main class="mx-auto w-full max-w-xl px-4 pt-2 pb-8">
        <section class="rounded-lg border border-[#F9D72F] ring-2 ring-2 ring-[#F9D72F] ring-offset-2 ring-offset-white p-4 mb-4">
          <div class="card-body">
            <h1 class="card-title">Review your selections</h1>
             <div class="divider"></div>
            <div class="space-y-5 pt-4">
              ${this.renderSelectionsList()}
            </div>
          </div>
        </section>

        <div class="mt-6 text-center">
          <stripe-buy-button
            buy-button-id="buy_btn_1O0deKFD6FDvUpvf90deDz9s"
            publishable-key="pk_live_51NzK2mFD6FDvUpvfgIDrt4Yvr7EdLmBPvv2KhTz1ZeMxOEGBhVCZc9wo6yNvPH04fFJcrnecWsjAsCrEOjm17KN0006C3fXt9H"
          >
          </stripe-buy-button>
        </div>
      </main>
        `;
  }
}
