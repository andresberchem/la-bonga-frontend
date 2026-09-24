// src/components/atoms/ui-badge.js

const badgeTemplate = document.createElement('template');
badgeTemplate.innerHTML = `
  <style>
    :host {
      display: inline-block;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      gap: var(--space-xs, 4px);
      padding: var(--space-xs, 4px) var(--space-md, 16px);
      font-family: var(--font-family-base, sans-serif);
      font-size: var(--font-size-label, 0.875rem);
      font-weight: var(--font-weight-bold, 700);
      line-height: 1.4;
      border-radius: var(--radius-pill, 999px);
      white-space: nowrap;
      transition: background-color .2s ease;
    }

    /* ---- Variante: price (por defecto) ---- */
    :host(:not([variant])) .badge,
    :host([variant="price"]) .badge {
      background-color: var(--color-secondary, #2E7D32);
      color: var(--text-inverse, #FFFFFF);
    }

    /* ---- Variante: primary ---- */
    :host([variant="primary"]) .badge {
      background-color: var(--color-primary, #E65100);
      color: var(--text-inverse, #FFFFFF);
    }

    /* ---- Variante: success ---- */
    :host([variant="success"]) .badge {
      background-color: var(--color-success, #2E7D32);
      color: var(--text-inverse, #FFFFFF);
    }

    /* ---- Variante: warning ---- */
    :host([variant="warning"]) .badge {
      background-color: var(--color-warning, #F9A825);
      color: var(--text-primary, #212121);
    }

    /* ---- Variante: error ---- */
    :host([variant="error"]) .badge {
      background-color: var(--color-error, #C62828);
      color: var(--text-inverse, #FFFFFF);
    }

    /* ---- Variante: outline ---- */
    :host([variant="outline"]) .badge {
      background-color: transparent;
      color: var(--color-primary, #E65100);
      border: 2px solid var(--color-primary, #E65100);
    }
  </style>

  <span class="badge" part="badge">
    <slot></slot>
  </span>
`;

class UiBadge extends HTMLElement {
  static get observedAttributes() {
    return ['variant'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(badgeTemplate.content.cloneNode(true));
  }
}

customElements.define('ui-badge', UiBadge);