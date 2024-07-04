class ExpandableList extends HTMLUListElement {
  toggleBtn: HTMLButtonElement;
  constructor() {
    super();
    this.style.position = "relative";
    this.toggleBtn = document.createElement("button");
    this.toggleBtn.style.position = "absolute";
    this.toggleBtn.style.border = "none";
    this.toggleBtn.style.background = "none";
    this.toggleBtn.style.padding = "0px";
    this.toggleBtn.style.margin = "0px";
    this.toggleBtn.style.top = "0px";
    this.toggleBtn.style.left = "5px";
    this.toggleBtn.style.cursor = "pointer";
    this.toggleBtn.innerText = ">";
    this.toggleBtn.addEventListener("click", () => {
      this.dataset.expanded = String(!this.isExpanded);
    });
    this.appendChild(this.toggleBtn);
  }

  get isExpanded() {
    return this.dataset.expanded !== "false" && this.dataset.expanded !== null;
  }

  static get observedAttributes() {
    return ["data-expanded"];
  }
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    console.log("attributeChangedCallback", name, oldValue, newValue);
    this.updateSyles();
  }

  connectedCallback() {
    this.updateSyles();
  }

  updateSyles() {
    const transform = this.isExpanded ? "rotate(90deg)" : "rotate(0deg)";
    this.toggleBtn.style.transform = transform;
    [...this.children].forEach((child, index) => {
      if (child !== this.toggleBtn) {
        const htmlElement = child as HTMLElement;
        htmlElement.style.display = this.isExpanded ? "" : "none";
      }
    });
  }
}

customElements.define("expandable-list", ExpandableList, { extends: "ul" });
