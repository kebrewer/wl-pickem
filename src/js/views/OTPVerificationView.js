import AbstractView from './AbstractView.js';

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle('Verify your phone');
  }

  async getHtml() {
    return `
      <main class="mx-auto flex min-h-[70vh] w-full max-w-xl items-start px-4 pt-4 pb-10">
        <section class="card w-full border border-base-300 bg-base-100 shadow-sm">
          <div class="card-body gap-6">
            <div class="text-center">
              <p class="text-sm font-semibold uppercase text-primary">WL Pickem Pool</p>
              <h1 class="card-title justify-center text-3xl">Verify your phone</h1>
              <p class="mt-2 text-base-content/70">Use your mobile number to continue.</p>
            </div>

            <form id="phoneForm" class="space-y-5" novalidate>
              <fieldset class="fieldset">
                <legend class="fieldset-legend">Mobile number</legend>
                <label class="input w-full">
                  <span>+1</span>
                  <input id="phoneNumber" type="tel" inputmode="tel" autocomplete="tel" placeholder="614 555 0123" required />
                </label>
                <p class="label">United States phone numbers only</p>
              </fieldset>

              <div id="phoneError" class="alert alert-error hidden" role="alert">
                Enter a valid 10-digit mobile number.
              </div>

              <button class="btn btn-primary btn-block" type="submit">Continue</button>
            </form>

            <form id="otpForm" class="hidden space-y-5" novalidate>
              <div class="text-center">
                <h2 class="text-xl font-semibold">Enter verification code</h2>
                <p id="otpPhone" class="mt-1 text-sm text-base-content/70"></p>
              </div>

              <div class="flex justify-center">
                <label class="otp otp-joined otp-primary otp-lg" aria-label="Six digit verification code">
                  <span></span><span></span><span></span><span></span><span></span><span></span>
                  <input id="otpCode" type="text" autocomplete="one-time-code" inputmode="numeric" maxlength="6" pattern="[0-9]{6}" required />
                </label>
              </div>

              <div id="otpError" class="alert alert-error hidden" role="alert">
                Enter the six-digit verification code.
              </div>

              <button class="btn btn-primary btn-block" type="submit">Verify and continue</button>
              <button id="changePhone" class="btn btn-ghost btn-block" type="button">Use a different number</button>
            </form>
          </div>
        </section>
      </main>
        `;
  }

  enableListeners() {
    const phoneForm = document.querySelector('#phoneForm');
    const otpForm = document.querySelector('#otpForm');
    const phoneInput = document.querySelector('#phoneNumber');
    const phoneError = document.querySelector('#phoneError');
    const otpInput = document.querySelector('#otpCode');
    const otpError = document.querySelector('#otpError');

    phoneForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const digits = phoneInput.value.replace(/\D/g, '');

      if (digits.length !== 10) {
        phoneError.classList.remove('hidden');
        phoneInput.focus();
        return;
      }

      phoneError.classList.add('hidden');
      sessionStorage.setItem('voterPhoneNumber', `+1${digits}`);
      document.querySelector('#otpPhone').textContent = `Enter the code sent to +1 ${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
      phoneForm.classList.add('hidden');
      otpForm.classList.remove('hidden');
      otpInput.focus();
    });

    otpInput.addEventListener('input', () => {
      otpInput.value = otpInput.value.replace(/\D/g, '');
      otpError.classList.add('hidden');
    });

    otpForm.addEventListener('submit', (event) => {
      event.preventDefault();

      if (!/^\d{6}$/.test(otpInput.value)) {
        otpError.classList.remove('hidden');
        otpInput.focus();
        return;
      }

      window.location.hash = '#payment';
    });

    document.querySelector('#changePhone').addEventListener('click', () => {
      otpForm.classList.add('hidden');
      phoneForm.classList.remove('hidden');
      phoneInput.focus();
    });
  }
}
