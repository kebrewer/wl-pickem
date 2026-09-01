import rulesTemplate from "../pages/pickem-rules.html?raw";

export class PickemRules extends HTMLElement {
    connectedCallback() {
      this.innerHTML = rulesTemplate;
    }
  }
  
  customElements.define("pickem-rules", PickemRules);