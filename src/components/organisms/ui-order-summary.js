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
      max-height: 360px;
      overflow-y: auto;
    }

    .item {
      display: grid;
      grid-template-columns: 1fr auto auto;
      gap: var(--space-sm, 8px);
      align-items: center;
      font-size: var(--font-size-label, 0.875rem);
      color: var(--text-primary, #212121);
      padding: var(--space-sm, 8px) 0;
      border-bottom: 1px solid #F0F0F0;
    }

    .item:last-child {
      border-bottom: none;
    }

    .item__info {
      display: flex;
      flex-direction: column;
      gap: 2px;
      min-width: 0;
    }

    .item__name {
      font-weight: var(--font-weight-medium, 500);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .item__unit {
      font-size: var(--font-size-small, 0.75rem);
      color: var(--text-secondary, #616161);
    }

    .qty-controls {
      display: inline-flex;
      align-items: center;
      gap: 2px;
    }

    .qty-btn {
      width: 28px;
      height: 28px;
      padding: 0;
      border: 1px solid #E0E0E0;
      background: #FFFFFF;
      color: var(--text-primary, #212121);
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
      line-height: 1;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transition: background-color .15s ease;
    }

    .qty-btn:hover {
      background: #F5F5F5;
      border-color: #BDBDBD;
    }

    .qty-value {
      min-width: 24px;
      text-align: center;
      font-weight: var(--font-weight-medium, 500);
    }

    .item__right {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 2px;
      min-width: 90px;
    }

    .item__subtotal {
      font-weight: var(--font-weight-bold, 700);
      color: var(--color-secondary, #2E7D32);
    }

    .remove-btn {
      width: 24px;
      height: 24px;
      padding: 0;
      border: none;
      background: transparent;
      color: var(--color-error, #C62828);
      cursor: pointer;
      border-radius: 4px;
      font-size: .9rem;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    .remove-btn:hover {
      background: rgba(198, 40, 40, .1);
    }

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

    .clear-all {
      background: transparent;
      border: none;
      color: var(--text-secondary, #616161);
      font-size: var(--font-size-small, 0.75rem);
      cursor: pointer;
      text-decoration: underline;
      align-self: flex-end;
      padding: 0;
    }

    .clear-all:hover {
      color: var(--color-error, #C62828);
    }
  </style>

  <div style="display:flex;justify-content:space-between;align-items:center;">
    <h2>Resumen del Pedido</h2>
    <button class="clear-all" id="clearAll" type="button" hidden>Vaciar</button>
  </div>

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
    this._clearAllBtn = this.shadowRoot.querySelector('#clearAll');
    
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

    this._clearAllBtn.addEventListener('click', () => this.clear());

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
    this._notifyChange();
    this.render();
  }

  removeItem(id) {
    this._items = this._items.filter((i) => i.id !== id);
    this._notifyChange();
    this.render();
  }

  updateQty(id, delta) {
    const item = this._items.find((i) => i.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
      this.removeItem(id);
      return;
    }
    this._notifyChange();
    this.render();
  }

  /**
   * Vacía el carrito desde la UI (botón "Vaciar").
   * Sí dispara summary-change.
   */
  clear() {
    this._items = [];
    this._notifyChange();
    this.render();
  }

  /**
   * Reemplaza todos los items SIN disparar summary-change.
   * Se usa para sincronizar desde app.js (fuente de verdad).
   */
  setItems(newItems) {
    this._items = newItems.map((i) => ({
      id: i.id,
      name: i.name,
      price: i.price,
      qty: i.qty,
    }));
    this.render();
  }
  _notifyChange() {
    // Notifica a la app para que actualice el contador del botón flotante
    this.dispatchEvent(new CustomEvent('summary-change', {
      bubbles: true,
      composed: true,
      detail: { items: [...this._items], total: this._calc().total },
    }));
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
      this._clearAllBtn.hidden = true;
    } else {
      this._clearAllBtn.hidden = false;

      this._items.forEach((item) => {
        const li = document.createElement('li');
        li.className = 'item';
        li.setAttribute('data-id', item.id);

        li.innerHTML = `
          <div class="item__info">
            <span class="item__name" title="${item.name}">${item.name}</span>
            <span class="item__unit">${fmt(item.price)} c/u</span>
          </div>
          <div class="qty-controls">
            <button class="qty-btn" data-action="dec" aria-label="Disminuir">−</button>
            <span class="qty-value">${item.qty}</span>
            <button class="qty-btn" data-action="inc" aria-label="Aumentar">+</button>
          </div>
          <div class="item__right">
            <span class="item__subtotal">${fmt(item.price * item.qty)}</span>
            <button class="remove-btn" data-action="remove" aria-label="Eliminar">✕ Quitar</button>
          </div>
        `;

        li.querySelectorAll('.qty-btn').forEach((btn) => {
          btn.addEventListener('click', () => {
            const action = btn.getAttribute('data-action');
            this.updateQty(item.id, action === 'inc' ? 1 : -1);
          });
        });

        li.querySelector('.remove-btn').addEventListener('click', () => {
          this.removeItem(item.id);
        });

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