export default class ToolTip {
  constructor() {
    this._tooltip;
  }

  showTooltip(msg, elem) {
    const element = document.createElement('div');
    element.classList.add('tooltip');
    element.textContent = msg;
    const id = Math.floor(Math.random() * 100);
    this._tooltip = {
      id,
      elem: element,
    };

    document.body.appendChild(element);
    const { right, top } = elem.getBoundingClientRect();
    element.style.left = `${right + 5}px`;
    element.style.top = `${top + elem.offsetHeight / 2 - element.offsetHeight / 2}px`;
  }

  removeTooltip(id) {
    const tooltip = document.querySelector('.tooltip');
    tooltip.remove();
    this._tooltips = {};
  }

  errors() {
    return {
      name: {
        valueMissing: 'Напишите товар, пожалуйста',
      },
      price: {
        valueMissing: 'Нам потребуется цена',
        patternMismatch: 'Не точная стоимость',
      },
    };
  }
}