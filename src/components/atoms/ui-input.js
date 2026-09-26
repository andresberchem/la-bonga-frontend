// src/components/atoms/ui-input.js

const inputTemplate = document.createElement('template');
inputTemplate.innerHTML = `
  <style>
    :host {
      display: block;
      font-family: var(--font-family-base, sans-serif);
    }

    .wrapper {
      display: flex;
      align-items: center;
      gap: var(--space-sm, 8px);
      background: var(--bg-surface, #FFFFFF);
      border: 2px solid #E0E0E0;
      border-radius: var(--radius-md, 8px);
      padding: 0 var(--space-md, 16px);
      min-height: var(--touch-target-min, 48px);
      transition: border-color .2s ease, box-shadow .2s ease;
    }

    .wrapper:hover {
      border-color: #BDBDBD;
    }

    .wrapper:focus-within {
      border-color: var(--color-primary, #E65100);
      box-shadow: 0 0 0 3px rgba(230, 81, 0, .15);
    }

    .icon {
      flex-shrink: 0;
      width: 20px;
      height: 20px;
      color: var(--text-secondary, #616161);
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    input {
      flex: 1;
      border: none;
      outline: none;
      background: transparent;
      font-family: inherit;
      font-size: var(--font-size-body, 1rem);
      color: var(--text-primary, #212121);
      padding: var(--space-sm, 8px) 0;
      width: 100%;
    }

    input::placeholder {
      color: var(--text-secondary, #616161);
      opacity: .7;
    }

    .clear {
      flex-shrink: 0;
      width: 24px;
      height: 24px;
      border: none;
      background: transparent;
      cursor: pointer;
      border-radius: 50%;
      display: none;
      align-items: center;
      justify-content: center;
      color: var(--text-secondary, #616161);
      font-size: 1.1rem;
      line-height: 1;
      padding: 0;
    }

    .clear:hover {
      background: #F5F5F5;
      color: var(--text-primary, #212121);
    }

    :host([value]:not([value=""])) .clear,
    .clear.visible {
      display: inline-flex;
    }

    /* Variante disabled */
    :host([disabled]) .wrapper {
      background: #F5F5F5;
      border-color: #E0E0E0;
      cursor: not-allowed;
      opacity: .6;
    }
    :host([disabled]) input {
      cursor: not-allowed;
    }

    /* Variante error */
    :host([error]) .wrapper {
      border-color: var(--color-error, #C62828);
    }
    :host([error]) .wrapper:focus-within {
      box-shadow: 0 0 0 3px rgba(198, 40, 40, .15);
    }
          /* Ocultar el botón nativo del tipo search en WebKit */
    input[type="search"]::-webkit-search-cancel-button,
    input[type="search"]::-webkit-search-decoration,
    input[type="search"]::-webkit-search-results-button,
    input[type="search"]::-webkit-search-results-decoration {
      -webkit-appearance: none;
      appearance: none;
      display: none;
    }
  </style>

  <label class="wrapper" part="wrapper">
    <span class="icon" part="icon">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
    </span>
    <input type="text" part="input" />
    <button class="clear" type="button" aria-label="Limpiar" part="clear">✕</button>
  </label>
`;

class UiInput extends HTMLElement {
  static get observedAttributes() {
    return ['value', 'placeholder', 'type', 'disabled', 'error'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(inputTemplate.content.cloneNode(true));

    this._input = this.shadowRoot.querySelector('input');
    this._clear = this.shadowRoot.querySelector('.clear');
  }

  connectedCallback() {
    this._syncFromAttributes();

    this._input.addEventListener('input', () => {
      const value = this._input.value;
      this.setAttribute('value', value);

      this.dispatchEvent(new CustomEvent('input-change', {
        bubbles: true,
        composed: true,
        detail: { value },
      }));
    });

    this._input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        this.dispatchEvent(new CustomEvent('input-submit', {
          bubbles: true,
          composed: true,
          detail: { value: this._input.value },
        }));
      }
      if (e.key === 'Escape') {
        this._input.value = '';
        this.setAttribute('value', '');
        this.dispatchEvent(new CustomEvent('input-change', {
          bubbles: true, composed: true, detail: { value: '' },
        }));
      }
    });

    this._clear.addEventListener('click', () => {
      this._input.value = '';
      this.setAttribute('value', '');
      this._input.focus();
      this.dispatchEvent(new CustomEvent('input-change', {
        bubbles: true, composed: true, detail: { value: '' },
      }));
    });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (!this._input) return;
    if (oldValue === newValue) return;

    if (name === 'value') {
      if (this._input.value !== newValue) this._input.value = newValue || '';
    }
    if (name === 'placeholder') {
      this._input.placeholder = newValue || '';
    }
    if (name === 'type') {
      this._input.type = newValue || 'text';
    }
    if (name === 'disabled') {
      this._input.disabled = this.hasAttribute('disabled');
    }
  }

  _syncFromAttributes() {
    this._input.value = this.getAttribute('value') || '';
    this._input.placeholder = this.getAttribute('placeholder') || '';
    this._input.type = this.getAttribute('type') || 'text';
    this._input.disabled = this.hasAttribute('disabled');
  }

  get value() { return this._input.value; }
  set value(v) {
    this._input.value = v;
    this.setAttribute('value', v);
  }

  focus() { this._input.focus(); }
}

customElements.define('ui-input', UiInput);