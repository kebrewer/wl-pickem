// JavaScript

class ContestantRow extends HTMLElement {
    static get observedAttributes() {
      return ['row', 'names', 'percent', 'checkbox-class', 'checked'];
    }
  
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
  
    attributeChangedCallback() {
      this.render();
    }
  
    render() {
      const row = this.getAttribute('row') || '';
      const names = this.getAttribute('names') || '';
      const percent = this.getAttribute('percent') || '0';
      const checkboxClass = this.getAttribute('checkbox-class') || '';
      const checked = this.hasAttribute('checked') ? 'checked' : '';
  
      this.shadowRoot.innerHTML = `
        <tr>
          <th>${row}</th>
          <td>${names}</td>
          <td>
            <span style="padding-right: 5px">${percent}%</span>
            <progress class="progress progress-primary w-56" value="${percent}" max="100"></progress>
          </td>
          <td>
            <input type="checkbox" class="checkbox ${checkboxClass}" ${checked} />
          </td>
        </tr>
        <style>
          :host { display: table-row; }
        </style>
      `;
    }
  
    connectedCallback() {
      this.render();
    }
  }
  
  customElements.define('contestant-row', ContestantRow);