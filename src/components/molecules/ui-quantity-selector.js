// src/components/molecules/ui-quantity-selector.js

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: inline-flex;
      align-items: center;
      gap: var(--space-sm, 8px);
      font-family: var(--font-family-base, sans-serif);
    }

    button {
      width: 40px;
      height: 40px;
      padding: 0;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
      font-weight: var(--font-weight-bold, 700);
      line-height: 1;
      border: 2px solid var(--color-primary, #E65100);
      background-color: transparent;
      color: var(--color-primary, #E65100);
      border-radius: var(--radius-md, 8px);
      cursor: pointer;
      transition: background-color .2s ease, color .2s ease, transform .1s ease;
      user-select: none;
    }

    button:hover:not(:disabled) {
      background-color: var(--color-primary, #E65100);
      color: var(--text-inverse, #FFFFFF);
    }

    button:active:not(:disabled) {
      transform: scale(0.95);
    }

    button:focus-visible {
      outline: 3px solid var(--color-primary, #E65100);
      outline-offset: 2px;
    }

    button:disabled {
      border-color: #BDBDBD;
      color: #BDBDBD;
      cursor: not-allowed;
    }

    .value {
      min-width: 40px;
      text-align: center;
      font-size: var(--font-size-body, 1rem);
      font-weight: var(--font-weight-medium, 500);
      color: var(--text-primary, #212121);
    }
  </style>

  <button class="decrement" type="button" aria-label="Disminuir cantidad">−</button>
  <span class="value" aria-live="polite">1</span>
  <button class="increment" type="button" aria-label="Aumentar cantidad">+</button>
`;

class UiQuantitySelector extends HTMLElement {
  static get observedAttributes() {
    return ['value', 'min', 'max'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this._decrementBtn = this.shadowRoot.querySelector('.decrement');
    this._incrementBtn = this.shadowRoot.querySelector('.increment');
    this._valueEl = this.shadowRoot.querySelector('.value');
  }

  connectedCallback() {
    this._decrementBtn.addEventListener('click', () => this._change(-1));
    this._incrementBtn.addEventListener('click', () => this._change(+1));

    this._syncUI();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    this._syncUI();
  }

  get value() {
    return Number(this.getAttribute('value')) || 1;
  }
  set value(val) {
    this.setAttribute('value', val);
  }

  get min() {
    return Number(this.getAttribute('min')) || 1;
  }
  set min(val) {
    this.setAttribute('min', val);
  }

  get max() {
    return Number(this.getAttribute('max')) || 99;
  }
  set max(val) {
    this.setAttribute('max', val);
  }

  _change(delta) {
    const next = this.value + delta;
    if (next < this.min || next > this.max) return;
    this.value = next;

    this.dispatchEvent(new CustomEvent('quantity-change', {
      bubbles: true,
      composed: true,
      detail: { value: next }
    }));
  }

  _syncUI() {
    if (!this._valueEl) return;
    this._valueEl.textContent = this.value;
    this._decrementBtn.disabled = this.value <= this.min;
    this._incrementBtn.disabled = this.value >= this.max;
  }
}

customElements.define('ui-quantity-selector', UiQuantitySelector);