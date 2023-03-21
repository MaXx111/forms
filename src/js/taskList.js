import ToolTip from './toolTip.js';

export default class TaskList {
  constructor(element) {
    if (typeof element === 'string') {
      element = document.querySelector(element);
    }

    this._element = element;
    this.openForm = this.openForm.bind(this);
    this.editTask = this.editTask.bind(this);
    this.onActionButtons = this.onActionButtons.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.data = [];
    this.toolTip = new ToolTip();
    this.errorsMsg = this.toolTip.errors();
    this.getErrorMsg = this.getErrorMsg.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.isHereToolTip = false;
  }

  init() {
    const form = document.querySelector('.taskList-form');
    const inputs = document.querySelectorAll('.input');
    this._element.querySelector('.task-header-iconAdd-link').addEventListener('click', this.openForm);
    form.querySelector('.cancel-btn').addEventListener('click', this.cancelBtn);
    form.addEventListener('submit', this.onSubmit);
    inputs.forEach((el) => {
      el.addEventListener('focus', () => {
        el.addEventListener('blur', this.onBlur);
      });
    });
    this._element.querySelector('.listItem-action').addEventListener('click', this.onActionButtons);
  }

  onSubmit(e) {
    e.preventDefault();
    const form = document.querySelector('.taskList-form');

    const { elements } = form;
    const trueOrFalse = [...elements].some((el) => this.removeOrShowToolTip(el));

    if (!trueOrFalse) {
      const formData = {
        id: Math.floor(Math.random() * 100),
        name: form.elements[0].value,
        price: form.elements[1].value,
      };
      this.data.push(formData);
      this.priceElement(formData.price, formData.id);
      this.nameElement(formData.name, formData.id);
      this.actionElement(formData.id);
      form.classList.add('hidden');
      form.reset();
    }
  }

  getErrorMsg(el) {
    const errorKey = Object.keys(ValidityState.prototype).find((key) => {
      if (!el.name) return;
      if (key === 'valid') return;
      return el.validity[key];
    });

    if (!errorKey) return;
    return this.errorsMsg[el.name][errorKey];
  }

  onBlur(e) {
    const el = e.target;
    this.removeOrShowToolTip(el);
    el.removeEventListener('blur', this.onBlur);
  }

  removeOrShowToolTip(el) {
    const error = this.getErrorMsg(el);
    const currentErrorMessage = this.toolTip._tooltip;
    if (!this.isHereToolTip && error) {
      this.toolTip.showTooltip(error, el);
      this.isHereToolTip = true;
      return true;
    } if (this.isHereToolTip && error) {
      this.toolTip.removeTooltip(currentErrorMessage.id);
      this.toolTip.showTooltip(error, el);
      this.isHereToolTip = true;
      return true;
    }
    if (this.isHereToolTip && !error) {
      this.toolTip.removeTooltip(currentErrorMessage.id);
      this.isHereToolTip = false;
      return false;
    }
  }

  openForm() {
    const form = document.querySelector('.taskList-form');
    form.classList.remove('hidden');
  }

  onActionButtons(e) {
    if (e.target.className === `listItem-action-removeIcon id${e.target.id}`) {
      this.removeTask(e.target.id);
    } else if (e.target.className === `listItem-action-editIcon id${e.target.id}`) {
      this.editTask(e.target.id);
    }
  }

  editTask(id) {
    const form = document.querySelector('.taskList-form');
    this.openForm();
    this.data.forEach((el) => {
      if (el.id === Number(id)) {
        form.elements[0].value = el.name;
        form.elements[1].value = el.price;
      }
    });
    this.removeTask(id);
  }

  removeTask(id) {
    const elements = this._element.querySelectorAll(`.id${id}`);
    console.log(elements.length);
    elements.forEach((el) => {
      if (el.className === `listItem-action-editIcon id${id}`) {
        el.parentNode.parentNode.remove();
      } else {
        el.remove();
      }
    });
  }

  cancelBtn() {
    const form = document.querySelector('.taskList-form');
    form.classList.add('hidden');
  }

  nameElement(name, id) {
    const elem = document.createElement('span');
    elem.className = `listItem-name-item textItem id${id}`;
    elem.textContent = name;
    this._element.querySelector('.listItem-name').appendChild(elem);
  }

  priceElement(price, id) {
    const elem = document.createElement('span');
    elem.className = `listItem-price-item textItem id${id}`;
    elem.textContent = price;
    this._element.querySelector('.listItem-price').appendChild(elem);
  }

  actionElement(id) {
    const elem = document.createElement('section');
    elem.className = 'listItem-action-buttons';
    elem.innerHTML = `<a href="#"  class="listItem-action-removeIcon-link"><img src="./image/xmark-solid.svg"
            alt="icon-xmark" class="listItem-action-removeIcon id${id}" id="${id}"></a>
            <a href="#" class="listItem-action-editIcon-link"><img src="./image/pencil.png" alt="icon-edit"
            class="listItem-action-editIcon id${id}" id="${id}"></a>`;
    this._element.querySelector('.listItem-action').appendChild(elem);
  }
}
