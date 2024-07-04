const template = document.createElement("template");
template.innerHTML = `<style> label{display: block}</style>
<label>
    <input type="checkbox" />
    <slot/>
    <span class="description"><slot name="description"/></span>
</label>`;

class TodoItem extends HTMLElement {
  checkbox: HTMLInputElement;
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.append(template.content.cloneNode(true));
    this.checkbox = shadow.querySelector("input")!;
  }

  static get observedAttributes() {
    return ["checked"];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === "checked") {
      this.updateChecked(newValue);
    }
  }

  connectedCallback() {
    console.log("connected");
  }

  disconnectedCallback() {
    console.log("disconnected");
  }

  updateChecked(value: string) {
    this.checkbox.checked = value !== null && value !== "false";
  }
}

customElements.define("todo-item", TodoItem);
