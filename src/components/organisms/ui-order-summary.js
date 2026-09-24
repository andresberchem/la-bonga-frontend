// src/components/organisms/ui-order-summary.js

import '../atoms/ui-button.js';

const orderSummaryTemplate = document.createElement('template');
orderSummaryTemplate.innerHTML = `
  <style>
    :host {
      display: block;
      background: var(--bg-surface, #FFFFFF);
      border-radius: var(--radius-lg, 16px);
      box-shadow: var(--shadow-md, 0 4px 8px rgba(0,0,0,.15));
      padding: var(--space-lg, 24px);
      display: flex;
      flex-direction: column;
      gap: var(--space-md, 16px);
      font-family: var(--font-family-base, sans-serif);
    }

    h2 {
      margin: 0;
      font-size: var(--font-size-h2, 1.5rem);
      font-weight: var(--font-weight-bold, 700);
      color: var(--text-primary, #212121);
    }

    .list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: var(--space-sm, 8px);
      max-height: 320px;
      overflow-y: auto;
    }

    .item {
      display: flex;
      justify-content: space-between;
      gap: var(--space-sm, 8px);
      font-size: var(--font-size-label, 0.875rem);
      color: var(--text-primary, #212121);
    }

    .item__name { flex: 1; }
    .item__qty { color: var(--text-secondary, #616161); }

    .empty {
      color: var(--text-secondary, #616161);
      font-style: italic;
      text-align: center;
      padding: var(--space-md, 16px);
    }

    .divider {
      border: none;
      border-top: 1px solid #E0E0E0;
      margin: var(--space-sm, 8px) 0;
    }

    .totals {
      display: flex;
      flex-direction: column;
      gap: var(--space-xs, 4px);
      font-size: var(--font-size-label, 0.875rem);
    }

    .row {
      display: flex;
      justify-content: space-between;
    }

    .row--total {
      font-size: var(--font-size-h3, 1.25rem);
      font-weight: var(--font-weight-bold, 700);
      color: var(--color-primary, #E65100);
      margin-top: var(--space-xs, 4px);
    }
  </style>

  <h2>Resumen del Pedido</h2>
  <ul class="list" id="list"></ul>
  <hr class="divider" />
  <div class="totals">
    <div class="row"><span>Subtotal</span><span id="subtotal">$0</span></div>
    <div class="row"><span>IVA (19%)</span><span id="iva">$0</span></div>
    <div class="row row--total"><span>Total</span><span id="total">$0</span></div>
  </div>
  <ui-button variant="primary" id="confirm">Confirmar Pedido</ui-button>
`;

const IVA_RATE = 0.19;
const fmt = (n) => `$${n.toLocaleString('es-CO')}`;

class UiOrderSummary extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(orderSummaryTemplate.content.cloneNode(true));

    this._items = [];
    this._list = this.shadowRoot.querySelector('#list');
    this._subtotalEl = this.shadowRoot.querySelector('#subtotal');
    this._ivaEl = this.shadowRoot.querySelector('#iva');
    this._totalEl = this.shadowRoot.querySelector('#total');
    this._confirmBtn = this.shadowRoot.querySelector('#confirm');
  }

  connectedCallback() {
    this._confirmBtn.addEventListener('btn-click', () => {
      if (!this._items.length) return;

      this.dispatchEvent(new CustomEvent('order-confirmed', {
        bubbles: true,
        composed: true,
        detail: { items: [...this._items], total: this._calc().total },
      }));
    });

    this.render();
  }

  addItem(product) {
    const qty = product.quantity || 1;
    const existing = this._items.find((i) => i.id === product.id);
    if (existing) {
      existing.qty += qty;
    } else {
      this._items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        qty,
      });
    }
    this.render();
  }

  clear() {
    this._items = [];
    this.render();
  }

  _calc() {
    const subtotal = this._items.reduce((s, i) => s + i.price * i.qty, 0);
    const iva = subtotal * IVA_RATE;
    return { subtotal, iva, total: subtotal + iva };
  }

  render() {
    this._list.innerHTML = '';

    if (!this._items.length) {
      const li = document.createElement('li');
      li.className = 'empty';
      li.textContent = 'Aún no hay productos agregados';
      this._list.appendChild(li);
    } else {
      this._items.forEach((item) => {
        const li = document.createElement('li');
        li.className = 'item';
        li.innerHTML = `
          <span class="item__name">
            ${item.name} <span class="item__qty">x${item.qty}</span>
          </span>
          <span>${fmt(item.price * item.qty)}</span>
        `;
        this._list.appendChild(li);
      });
    }

    const { subtotal, iva, total } = this._calc();
    this._subtotalEl.textContent = fmt(subtotal);
    this._ivaEl.textContent = fmt(iva);
    this._totalEl.textContent = fmt(total);
  }
}

customElements.define('ui-order-summary', UiOrderSummary);