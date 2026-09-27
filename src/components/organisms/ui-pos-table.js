// src/components/organisms/ui-pos-table.js

import '../atoms/ui-button.js';

const posTableTemplate = document.createElement('template');
posTableTemplate.innerHTML = `
  <style>
    :host {
      display: block;
      background: var(--bg-surface, #FFFFFF);
      border-radius: var(--radius-md, 8px);
      box-shadow: var(--shadow-sm, 0 1px 3px rgba(0,0,0,.12));
      font-family: var(--font-family-base, sans-serif);
      overflow: hidden;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--space-sm, 8px) var(--space-md, 16px);
      background: #F5F5F5;
      border-bottom: 1px solid #E0E0E0;
    }

    .header h2 {
      margin: 0;
      font-size: var(--font-size-label, 0.875rem);
      font-weight: var(--font-weight-bold, 700);
      text-transform: uppercase;
      letter-spacing: .5px;
      color: var(--text-secondary, #616161);
    }

    .header .count {
      font-size: var(--font-size-small, 0.75rem);
      color: var(--text-secondary, #616161);
    }

    table {
      width: 100%;
      border-collapse: collapse;
      font-size: var(--font-size-label, 0.875rem);
    }

    thead {
      background: #FAFAFA;
    }

    th {
      text-align: left;
      padding: var(--space-sm, 8px) var(--space-md, 16px);
      font-size: var(--font-size-small, 0.75rem);
      font-weight: var(--font-weight-bold, 700);
      text-transform: uppercase;
      letter-spacing: .3px;
      color: var(--text-secondary, #616161);
      border-bottom: 1px solid #E0E0E0;
    }

    th.num, td.num { text-align: right; }
    th.center, td.center { text-align: center; }

    tbody tr {
      border-bottom: 1px solid #F0F0F0;
      transition: background-color .15s ease;
    }

    tbody tr:hover {
      background: #FAFAFA;
    }

    tbody tr:last-child {
      border-bottom: none;
    }

    td {
      padding: var(--space-sm, 8px) var(--space-md, 16px);
      color: var(--text-primary, #212121);
      vertical-align: middle;
    }

    td.name {
      font-weight: var(--font-weight-medium, 500);
      max-width: 260px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    td.subtotal {
      font-weight: var(--font-weight-bold, 700);
      color: var(--color-secondary, #2E7D32);
    }

    .qty-controls {
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }

    .qty-btn {
      width: 28px;
      height: 28px;
      padding: 0;
      border: 1px solid #E0E0E0;
      background: #FFFFFF;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
      line-height: 1;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: var(--text-primary, #212121);
    }

    .qty-btn:hover:not(:disabled) {
      background: #F5F5F5;
      border-color: #BDBDBD;
    }

    .qty-btn:disabled {
      opacity: .4;
      cursor: not-allowed;
    }

    .qty-value {
      min-width: 28px;
      text-align: center;
      font-weight: var(--font-weight-medium, 500);
    }

    .remove-btn {
      width: 28px;
      height: 28px;
      padding: 0;
      border: none;
      background: transparent;
      color: #C62828;
      cursor: pointer;
      border-radius: 4px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 1rem;
    }

    .remove-btn:hover {
      background: rgba(198, 40, 40, .1);
    }

    .empty {
      padding: var(--space-lg, 24px);
      text-align: center;
      color: var(--text-secondary, #616161);
      font-style: italic;
      font-size: var(--font-size-label, 0.875rem);
    }

    .footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--space-md, 16px);
      background: #FAFAFA;
      border-top: 1px solid #E0E0E0;
      gap: var(--space-md, 16px);
    }

    .totals {
      display: flex;
      flex-direction: column;
      gap: 2px;
      font-size: var(--font-size-label, 0.875rem);
      flex: 1;
    }

    .totals .row {
      display: flex;
      justify-content: space-between;
      max-width: 320px;
    }

    .totals .row.total {
      font-size: var(--font-size-h3, 1.25rem);
      font-weight: var(--font-weight-bold, 700);
      color: var(--color-primary, #E65100);
      margin-top: var(--space-xs, 4px);
    }

    .footer .actions {
      display: flex;
      gap: var(--space-sm, 8px);
    }

    /* Compacto para pantallas chicas */
    @media (max-width: 720px) {
      td.name { max-width: 140px; }
      .footer { flex-direction: column; align-items: stretch; }
    }
          /* ============================================================
       RESPONSIVE — En pantallas chicas convertir tabla en tarjetas
       ============================================================ */
    @media (max-width: 900px) {
      table, thead, tbody, th, td, tr {
        display: block;
      }

      thead {
        display: none; /* ocultar encabezados de columnas */
      }

      tbody tr {
        display: grid;
        grid-template-columns: 1fr auto;
        grid-template-areas:
          "name     price"
          "qty      remove";
        gap: 8px;
        padding: 12px;
        border-bottom: 1px solid #E0E0E0;
        align-items: center;
      }

      td.name {
        grid-area: name;
        padding: 0;
        font-size: 0.95rem;
        max-width: 100%;
        white-space: normal;
      }

      td.num {
        grid-area: price;
        padding: 0;
        font-size: 0.85rem;
        color: var(--text-secondary, #616161);
        text-align: right;
      }

      td.num.subtotal {
        display: none; /* el subtotal no cabe, lo mostramos abajo */
      }

      td.center {
        padding: 0;
      }

      /* Cantidad (fila con −, N, +) */
      td.center:nth-child(2) {
        grid-area: qty;
        justify-self: start;
      }

      /* Botón eliminar */
      td.center:last-child {
        grid-area: remove;
        justify-self: end;
      }

      .qty-controls {
        gap: 8px;
      }

      .qty-btn {
        width: 36px;
        height: 36px;
      }

      .qty-value {
        min-width: 32px;
        font-size: 1rem;
      }
    }
  </style>

  <div class="header">
    <h2>Pedido Actual</h2>
    <div style="display:flex;align-items:center;gap:12px;">
      <span class="count" id="count">0 ítems</span>
      <small style="color:#888;font-size:11px;">F1 Buscar · F3 Cobrar · F4 Limpiar</small>
    </div>
  </div>

  <table>
    <thead>
      <tr>
        <th>Producto</th>
        <th class="center" style="width: 130px;">Cantidad</th>
        <th class="num" style="width: 100px;">Precio</th>
        <th class="num" style="width: 110px;">Subtotal</th>
        <th class="center" style="width: 60px;"></th>
      </tr>
    </thead>
    <tbody id="tbody"></tbody>
  </table>

  <div class="footer">
    <div class="totals">
      <div class="row"><span>Subtotal</span><span id="subtotal">$0</span></div>
      <div class="row"><span>IVA (19%)</span><span id="iva">$0</span></div>
      <div class="row total"><span>Total</span><span id="total">$0</span></div>
    </div>
    <div class="actions">
      <ui-button variant="secondary" id="clearBtn">Limpiar</ui-button>
      <ui-button variant="primary" id="payBtn">Cobrar (F3)</ui-button>
    </div>
  </div>
`;

const IVA_RATE = 0.19;
const fmt = (n) => `$${n.toLocaleString('es-CO')}`;

class UiPosTable extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(posTableTemplate.content.cloneNode(true));

    this._items = [];
    this._tbody = this.shadowRoot.querySelector('#tbody');
    this._countEl = this.shadowRoot.querySelector('#count');
    this._subtotalEl = this.shadowRoot.querySelector('#subtotal');
    this._ivaEl = this.shadowRoot.querySelector('#iva');
    this._totalEl = this.shadowRoot.querySelector('#total');
    this._clearBtn = this.shadowRoot.querySelector('#clearBtn');
    this._payBtn = this.shadowRoot.querySelector('#payBtn');
  }

  connectedCallback() {
    this._clearBtn.addEventListener('btn-click', () => this.clear());

    this._payBtn.addEventListener('btn-click', () => {
      if (!this._items.length) return;
      this.dispatchEvent(new CustomEvent('pos-pay', {
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
    if (existing) existing.qty += qty;
    else this._items.push({
      id: product.id,
      name: product.name,
      price: product.price,
      qty,
    });
    this.render();
  }

  removeItem(id) {
    this._items = this._items.filter((i) => i.id !== id);
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
    this.render();
  }

  clear() {
    this._items = [];
    this.render();
    this.dispatchEvent(new CustomEvent('pos-clear', {
      bubbles: true, composed: true,
      
    }));
    
  }
    /**
   * Ejecuta el cobro (lo mismo que el botón "Cobrar").
   * Se usa desde el atajo F3.
   */
  cobrar() {
    if (!this._items.length) {
      alert('No hay productos en el pedido.');
      return;
    }
    const total = this._calc().total.toLocaleString('es-CO');
    const items = this._items.map((i) => `• ${i.name} x${i.qty}`).join('\n');

    if (confirm(`¿Cobrar el pedido?\n\n${items}\n\nTotal: $${total}`)) {
      this.dispatchEvent(new CustomEvent('pos-pay', {
        bubbles: true,
        composed: true,
        detail: { items: [...this._items], total: this._calc().total },
      }));
    }
  }

  /**
   * Cambia la cantidad del último producto agregado (para Ctrl+1..9).
   * @param {number} qty
   */
  setLastQty(qty) {
    if (!this._items.length) return;
    const last = this._items[this._items.length - 1];
    if (!last) return;
    last.qty = qty;
    this.render();
  }

  _calc() {
    const subtotal = this._items.reduce((s, i) => s + i.price * i.qty, 0);
    const iva = subtotal * IVA_RATE;
    return { subtotal, iva, total: subtotal + iva };
  }

  render() {
    this._tbody.innerHTML = '';

    if (!this._items.length) {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td colspan="5" class="empty">Sin productos en el pedido</td>`;
      this._tbody.appendChild(tr);
    } else {
      this._items.forEach((item) => {
        const tr = document.createElement('tr');
        tr.setAttribute('data-id', item.id);

        // Columna: Nombre
        const tdName = document.createElement('td');
        tdName.className = 'name';
        tdName.textContent = item.name;
        tdName.title = item.name;
        tr.appendChild(tdName);

        // Columna: Cantidad con +/- 
        const tdQty = document.createElement('td');
        tdQty.className = 'center';
        tdQty.innerHTML = `
          <div class="qty-controls">
            <button class="qty-btn" data-action="dec" aria-label="Disminuir">−</button>
            <span class="qty-value">${item.qty}</span>
            <button class="qty-btn" data-action="inc" aria-label="Aumentar">+</button>
          </div>
        `;
        tr.appendChild(tdQty);

        // Columna: Precio unitario
        const tdPrice = document.createElement('td');
        tdPrice.className = 'num';
        tdPrice.textContent = fmt(item.price);
        tr.appendChild(tdPrice);

        // Columna: Subtotal
        const tdSub = document.createElement('td');
        tdSub.className = 'num subtotal';
        tdSub.textContent = fmt(item.price * item.qty);
        tr.appendChild(tdSub);

        // Columna: Eliminar
        const tdDel = document.createElement('td');
        tdDel.className = 'center';
        tdDel.innerHTML = `<button class="remove-btn" data-action="remove" aria-label="Eliminar">✕</button>`;
        tr.appendChild(tdDel);

        // Listeners de los botones
        tdQty.querySelectorAll('.qty-btn').forEach((btn) => {
          btn.addEventListener('click', () => {
            const action = btn.getAttribute('data-action');
            this.updateQty(item.id, action === 'inc' ? 1 : -1);
          });
        });

        tdDel.querySelector('.remove-btn').addEventListener('click', () => {
          this.removeItem(item.id);
        });

        this._tbody.appendChild(tr);
      });
    }

    // Totales
    const { subtotal, iva, total } = this._calc();
    this._subtotalEl.textContent = fmt(subtotal);
    this._ivaEl.textContent = fmt(iva);
    this._totalEl.textContent = fmt(total);

    // Contador
    const itemCount = this._items.reduce((s, i) => s + i.qty, 0);
    this._countEl.textContent = `${itemCount} ${itemCount === 1 ? 'ítem' : 'ítems'}`;

    // Estado del botón cobrar
    this._payBtn.disabled = !this._items.length;
  }
}

customElements.define('ui-pos-table', UiPosTable);