export class PickemRules extends HTMLElement {
    connectedCallback() {
      fetch("/src/js/pages/pickem-rules.html")
        .then(res => res.text())
        .then(html => {
          this.innerHTML = html;
        });
    }
  }
  
  customElements.define("pickem-rules", PickemRules);