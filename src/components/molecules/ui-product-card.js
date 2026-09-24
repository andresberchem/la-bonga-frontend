// src/components/molecules/ui-product-card.js

// Importamos las dependencias que la card va a usar internamente
import '../atoms/ui-badge.js';
import '../atoms/ui-button.js';
import './ui-quantity-selector.js';

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
      display: block;
      background: var(--bg-surface, #FFFFFF);
      border-radius: var(--radius-lg, 16px);
      box-shadow: var(--shadow-sm, 0 1px 3px rgba(0,0,0,.12));
      overflow: hidden;
      transition: transform .2s ease, box-shadow .2s ease;
      height: 100%;
    }

    :host(:hover) {
      transform: translateY(-4px);
      box-shadow: var(--shadow-md, 0 4px 8px rgba(0,0,0,.15));
    }

    .card {
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .card__img {
      width: 100%;
      aspect-ratio: 16 / 9;
      object-fit: cover;
      background: #EEEEEE;
      display: block;
    }

    .card__body {
      padding: var(--space-md, 16px);
      display: flex;
      flex-direction: column;
      gap: var(--space-sm, 8px);
      flex: 1;
    }

    .card__title {
      margin: 0;
      font-size: var(--font-size-h3, 1.25rem);
      font-weight: var(--font-weight-bold, 700);
      color: var(--text-primary, #212121);
    }

    .card__desc {
      margin: 0;
      font-size: var(--font-size-label, 0.875rem);
      color: var(--text-secondary, #616161);
      line-height: 1.4;
      flex: 1;
    }

    .card__footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: var(--space-sm, 8px);
      margin-top: var(--space-sm, 8px);
    }

    .card__actions {
      display: flex;
      align-items: center;
      gap: var(--space-sm, 8px);
    }

    /* Adaptación a pantallas pequeñas */
    @media (max-width: 480px) {
      .card__footer {
        flex-direction: column;
        align-items: stretch;
      }
      .card__actions {
        justify-content: space-between;
      }
    }
  </style>

  <article class="card">
    <img class="card__img" alt="" />
    <div class="card__body">
      <h3 class="card__title"></h3>
      <p class="card__desc"></p>
      <div class="card__footer">
        <ui-badge variant="price"></ui-badge>
        <div class="card__actions">
          <ui-quantity-selector value="1" min="1" max="99"></ui-quantity-selector>
          <ui-button variant="primary">Agregar</ui-button>
        </div>
      </div>
    </div>
  </article>
`;

class UiProductCard extends HTMLElement {
  static get observedAttributes() {
    return ['name', 'description', 'price', 'image'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this._img = this.shadowRoot.querySelector('.card__img');
    this._title = this.shadowRoot.querySelector('.card__title');
    this._desc = this.shadowRoot.querySelector('.card__desc');
    this._badge = this.shadowRoot.querySelector('ui-badge');
    this._quantity = this.shadowRoot.querySelector('ui-quantity-selector');
    this._addBtn = this.shadowRoot.querySelector('ui-button');
  }

  connectedCallback() {
    this._addBtn.addEventListener('btn-click', () => {
      this.dispatchEvent(new CustomEvent('add-to-cart', {
        bubbles: true,
        composed: true,
        detail: {
          id: this.getAttribute('data-id') || this.getAttribute('name'),
          name: this.getAttribute('name'),
          price: Number(this.getAttribute('price')) || 0,
          quantity: this._quantity.value,
        },
      }));
    });
  }

  attributeChangedCallback(name, _old, value) {
    if (!this._title) return;

    switch (name) {
      case 'name':
        this._title.textContent = value || '';
        this._img.alt = value || '';
        break;
      case 'description':
        this._desc.textContent = value || '';
        break;
      case 'image':
        this._img.src = value || '';
        break;
      case 'price':
        const price = Number(value) || 0;
        this._badge.textContent = `$${price.toLocaleString('es-CO')}`;
        break;
    }
  }
}

customElements.define('ui-product-card', UiProductCard);