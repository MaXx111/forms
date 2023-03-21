export default class Popover {
  constructor(element) {
    if (typeof element === 'string') {
      element = document.querySelector(element);
    }

    this._element = element;
    this.showToolTip = this.showToolTip.bind(this);
    this._element.addEventListener('click', this.showToolTip);
    this.tooltip = [];
    this.isEmpty = true;
  }

  showToolTip() {
    if (this.isEmpty) {
      this.isEmpty = false;
      const tooltip = this.createToolTip();
      document.body.appendChild(tooltip);
      const { left, top } = this._element.getBoundingClientRect();
      tooltip.style.top = `${top - this._element.offsetHeight - 10}px`;
      tooltip.style.left = `${left + this._element.offsetWidth / 2 - tooltip.offsetWidth / 2}px`;
    } else {
      this.isEmpty = true;
      this.clearToolTip();
    }
  }

  createToolTip() {
    const tooltipElement = document.createElement('DIV');

    tooltipElement.classList.add('msg');
    tooltipElement.textContent = 'And here\'s some amazing content. It\'s very engaging. Right?';
    this.tooltip = tooltipElement;
    return tooltipElement;
  }

  clearToolTip() {
    this.tooltip.remove();
    this.tooltip = [];
  }
}
