// src/components/atoms/ui-button.js
const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: inline-block;
    }

    button {
      /* Tokens de diseño */
      min-height: var(--touch-target-min, 48px);
      min-width: var(--touch-target-min, 48px);
      padding: var(--space-sm, 8px) var(--space-lg, 24px);
      font-family: var(--font-family-base, sans-serif);
      font-size: var(--font-size-body, 1rem);
      font-weight: var(--font-weight-medium, 500);
      line-height: var(--line-height-base, 1.5);
      border: none;
      border-radius: var(--radius-md, 8px);
      cursor: pointer;

      /* Layout interno */
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--space-sm, 8px);

      /* Animaciones */
      transition: background-color .2s ease, transform .1s ease, box-shadow .2s ease;
    }

    /* ---- Estados de interacción ---- */
    button:hover {
      transform: translateY(-1px);
    }

    button:active {
      transform: scale(0.97);
    }

    button:focus-visible {
      outline: 3px solid var(--color-primary, #E65100);
      outline-offset: 2px;
    }

    /* ---- Variante: primary ---- */
    :host([variant="primary"]) button,
    :host(:not([variant])) button {
      background-color: var(--color-primary, #E65100);
      color: var(--text-inverse, #FFFFFF);
    }
    :host([variant="primary"]) button:hover,
    :host(:not([variant])) button:hover {
      background-color: var(--color-primary-hover, #BF4500);
    }
    :host([variant="primary"]) button:active,
    :host(:not([variant])) button:active {
      background-color: var(--color-primary-active, #993700);
    }

    /* ---- Variante: secondary ---- */
    :host([variant="secondary"]) button {
      background-color: transparent;
      color: var(--color-secondary, #2E7D32);
      border: 2px solid var(--color-secondary, #2E7D32);
    }
    :host([variant="secondary"]) button:hover {
      background-color: var(--color-secondary, #2E7D32);
      color: var(--text-inverse, #FFFFFF);
    }

    /* ---- Variante: disabled ---- */
    :host([variant="disabled"]) button,
    button:disabled {
      background-color: #BDBDBD;
      color: #757575;
      cursor: not-allowed;
      transform: none;
      pointer-events: none;
    }

    /* ---- Estado: loading ---- */
    .spinner {
      width: 16px;
      height: 16px;
      border: 2px solid rgba(255, 255, 255, 0.4);
      border-top-color: #FFFFFF;
      border-radius: 50%;
      animation: spin .8s linear infinite;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    /* Ocultar spinner cuando no está en loading */
    :host(:not([loading])) .spinner {
      display: none;
    }

    /* Cuando está en loading, deshabilitar el botón pero mantener color */
    :host([loading]) button {
      cursor: wait;
      opacity: 0.85;
    }
  </style>

  <button part="button" type="button">
    <span class="spinner" aria-hidden="true"></span>
    <slot></slot>
  </button>
`;

class UiButton extends HTMLElement {
  static get observedAttributes() {
    return ['variant', 'loading', 'disabled'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this._btn = this.shadowRoot.querySelector('button');
  }

  connectedCallback() {
    this._btn.addEventListener('click', this._handleClick.bind(this));

    // Sincronizar atributo disabled con el botón interno
    this._syncDisabled();
  }

  disconnectedCallback() {
    this._btn.removeEventListener('click', this._handleClick);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;

    if (name === 'disabled' || name === 'loading') {
      this._syncDisabled();
    }
  }

  _handleClick(event) {
    // Si está disabled o loading, no propagar el click
    if (this.hasAttribute('disabled') || this.hasAttribute('loading')) {
      event.stopImmediatePropagation();
      event.preventDefault();
      return;
    }

    this.dispatchEvent(new CustomEvent('btn-click', {
      bubbles: true,
      composed: true,
      detail: { originalEvent: event }
    }));
  }

  _syncDisabled() {
    if (!this._btn) return;
    const isDisabled = this.hasAttribute('disabled') || this.hasAttribute('loading');
    this._btn.disabled = isDisabled;
    this._btn.setAttribute('aria-busy', this.hasAttribute('loading') ? 'true' : 'false');
  }

  // API pública por si la quieres usar desde JS
  get disabled() {
    return this.hasAttribute('disabled');
  }
  set disabled(value) {
    if (value) this.setAttribute('disabled', '');
    else this.removeAttribute('disabled');
  }

  get loading() {
    return this.hasAttribute('loading');
  }
  set loading(value) {
    if (value) this.setAttribute('loading', '');
    else this.removeAttribute('loading');
  }
}

customElements.define('ui-button', UiButton);