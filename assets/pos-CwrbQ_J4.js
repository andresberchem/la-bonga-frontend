import"./ui-button-BUPy334S.js";var e=document.createElement(`template`);e.innerHTML=`
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
`;var t=.19,n=e=>`$${e.toLocaleString(`es-CO`)}`,r=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:`open`}),this.shadowRoot.appendChild(e.content.cloneNode(!0)),this._items=[],this._tbody=this.shadowRoot.querySelector(`#tbody`),this._countEl=this.shadowRoot.querySelector(`#count`),this._subtotalEl=this.shadowRoot.querySelector(`#subtotal`),this._ivaEl=this.shadowRoot.querySelector(`#iva`),this._totalEl=this.shadowRoot.querySelector(`#total`),this._clearBtn=this.shadowRoot.querySelector(`#clearBtn`),this._payBtn=this.shadowRoot.querySelector(`#payBtn`)}connectedCallback(){this._clearBtn.addEventListener(`btn-click`,()=>this.clear()),this._payBtn.addEventListener(`btn-click`,()=>{this._items.length&&this.dispatchEvent(new CustomEvent(`pos-pay`,{bubbles:!0,composed:!0,detail:{items:[...this._items],total:this._calc().total}}))}),this.render()}addItem(e){let t=e.quantity||1,n=this._items.find(t=>t.id===e.id);n?n.qty+=t:this._items.push({id:e.id,name:e.name,price:e.price,qty:t}),this.render()}removeItem(e){this._items=this._items.filter(t=>t.id!==e),this.render()}updateQty(e,t){let n=this._items.find(t=>t.id===e);if(n){if(n.qty+=t,n.qty<=0){this.removeItem(e);return}this.render()}}clear(){this._items=[],this.render(),this.dispatchEvent(new CustomEvent(`pos-clear`,{bubbles:!0,composed:!0}))}cobrar(){if(!this._items.length){alert(`No hay productos en el pedido.`);return}let e=this._calc().total.toLocaleString(`es-CO`),t=this._items.map(e=>`• ${e.name} x${e.qty}`).join(`
`);confirm(`¿Cobrar el pedido?\n\n${t}\n\nTotal: $${e}`)&&this.dispatchEvent(new CustomEvent(`pos-pay`,{bubbles:!0,composed:!0,detail:{items:[...this._items],total:this._calc().total}}))}setLastQty(e){if(!this._items.length)return;let t=this._items[this._items.length-1];t&&(t.qty=e,this.render())}_calc(){let e=this._items.reduce((e,t)=>e+t.price*t.qty,0),n=e*t;return{subtotal:e,iva:n,total:e+n}}render(){if(this._tbody.innerHTML=``,this._items.length)this._items.forEach(e=>{let t=document.createElement(`tr`);t.setAttribute(`data-id`,e.id);let r=document.createElement(`td`);r.className=`name`,r.textContent=e.name,r.title=e.name,t.appendChild(r);let i=document.createElement(`td`);i.className=`center`,i.innerHTML=`
          <div class="qty-controls">
            <button class="qty-btn" data-action="dec" aria-label="Disminuir">−</button>
            <span class="qty-value">${e.qty}</span>
            <button class="qty-btn" data-action="inc" aria-label="Aumentar">+</button>
          </div>
        `,t.appendChild(i);let a=document.createElement(`td`);a.className=`num`,a.textContent=n(e.price),t.appendChild(a);let o=document.createElement(`td`);o.className=`num subtotal`,o.textContent=n(e.price*e.qty),t.appendChild(o);let s=document.createElement(`td`);s.className=`center`,s.innerHTML=`<button class="remove-btn" data-action="remove" aria-label="Eliminar">✕</button>`,t.appendChild(s),i.querySelectorAll(`.qty-btn`).forEach(t=>{t.addEventListener(`click`,()=>{let n=t.getAttribute(`data-action`);this.updateQty(e.id,n===`inc`?1:-1)})}),s.querySelector(`.remove-btn`).addEventListener(`click`,()=>{this.removeItem(e.id)}),this._tbody.appendChild(t)});else{let e=document.createElement(`tr`);e.innerHTML=`<td colspan="5" class="empty">Sin productos en el pedido</td>`,this._tbody.appendChild(e)}let{subtotal:e,iva:t,total:r}=this._calc();this._subtotalEl.textContent=n(e),this._ivaEl.textContent=n(t),this._totalEl.textContent=n(r);let i=this._items.reduce((e,t)=>e+t.qty,0);this._countEl.textContent=`${i} ${i===1?`ítem`:`ítems`}`,this._payBtn.disabled=!this._items.length}};customElements.define(`ui-pos-table`,r);var i=[{id:`p1`,name:`Mote de Queso`,price:22e3,category:`entradas`},{id:`p2`,name:`Sopa de Guandú`,price:24e3,category:`entradas`},{id:`p3`,name:`Patacones con Hogao`,price:12e3,category:`entradas`},{id:`p4`,name:`Ceviche de Camarón`,price:28e3,category:`entradas`},{id:`p5`,name:`Cazuela de Mariscos`,price:38e3,category:`platos`},{id:`p6`,name:`Mojarra Frita`,price:34e3,category:`platos`},{id:`p7`,name:`Arroz con Coco`,price:9e3,category:`platos`},{id:`p8`,name:`Posta Negra Cartagenera`,price:36e3,category:`platos`},{id:`p9`,name:`Arroz de Lisa`,price:3e4,category:`platos`},{id:`p10`,name:`Sancocho de Guandú con Carne`,price:32e3,category:`platos`},{id:`p11`,name:`Jugo de Corozo`,price:8e3,category:`bebidas`},{id:`p12`,name:`Limonada de Coco`,price:12e3,category:`bebidas`},{id:`p13`,name:`Jugo de Maracuyá`,price:8e3,category:`bebidas`},{id:`p14`,name:`Agua de Panela con Limón`,price:6e3,category:`bebidas`},{id:`p15`,name:`Enyucado`,price:1e4,category:`postres`},{id:`p16`,name:`Cocadas`,price:8e3,category:`postres`}],a=e=>`$${e.toLocaleString(`es-CO`)}`,o=document.getElementById(`posCatalog`),s=document.getElementById(`posSearch`),c=document.getElementById(`posTabs`),l=document.getElementById(`posTable`);function u(e){o.innerHTML=``,e.forEach(e=>{let t=document.createElement(`button`);t.className=`pos-item`,t.setAttribute(`data-id`,e.id),t.setAttribute(`data-category`,e.category),t.innerHTML=`
      <div class="pos-item__info">
        <p class="pos-item__name">${e.name}</p>
        <span class="pos-item__price">${a(e.price)}</span>
      </div>
      <span class="pos-item__add" aria-hidden="true">+</span>
    `,t.addEventListener(`click`,()=>{l.addItem({id:e.id,name:e.name,price:e.price,quantity:1})}),o.appendChild(t)})}u(i);var d=``,f=`all`;function p(){u(i.filter(e=>{let t=!d||e.name.toLowerCase().includes(d),n=f===`all`||e.category===f;return t&&n}))}s.addEventListener(`input-change`,e=>{d=e.detail.value.toLowerCase().trim(),p()}),c.setCategories([{id:`all`,label:`Todos`,emoji:`🍽️`},{id:`entradas`,label:`Entradas`,emoji:`🥗`},{id:`platos`,label:`Platos`,emoji:`🍲`},{id:`bebidas`,label:`Bebidas`,emoji:`🥤`},{id:`postres`,label:`Postres`,emoji:`🍰`}]),c.addEventListener(`category-change`,e=>{f=e.detail.id,p()}),l.addEventListener(`pos-pay`,e=>{let t=e.detail.total.toLocaleString(`es-CO`),n=e.detail.items.length;alert(`✅ Pago registrado\n\n${n} productos\nTotal: $${t}`),l.clear()}),l.addEventListener(`pos-clear`,()=>{}),document.getElementById(`btnCerrar`).addEventListener(`click`,()=>{confirm(`¿Cerrar la caja del día?`)&&alert(`Caja cerrada. ¡Buen trabajo!`)}),document.addEventListener(`keydown`,e=>{if(e.key===`F1`){e.preventDefault(),s.focus();return}if(e.key===`F2`){e.preventDefault(),m();return}if(e.key===`F3`){e.preventDefault(),l&&l.cobrar();return}if(e.key===`F4`){e.preventDefault(),l&&confirm(`¿Limpiar el pedido actual?`)&&l.clear();return}if(e.key===`Escape`){document.activeElement===s.shadowRoot?.querySelector(`input`)&&(s.value=``,s.dispatchEvent(new CustomEvent(`input-change`,{bubbles:!0,composed:!0,detail:{value:``}})),s.blur());return}if(e.ctrlKey&&e.key>=`1`&&e.key<=`9`){e.preventDefault();let t=parseInt(e.key,10);l&&l.setLastQty(t);return}});function m(){alert(`
╔══════════════════════════════════════╗
║   ATAJOS DE TECLADO — POS LA BONGA   ║
╠══════════════════════════════════════╣
║  F1   → Enfocar buscador             ║
║  F2   → Ver esta ayuda               ║
║  F3   → Cobrar el pedido             ║
║  F4   → Limpiar el pedido            ║
║  Esc  → Limpiar búsqueda             ║
║  Ctrl + 1-9 → Cantidad rápida        ║
║                                       ║
║  (también puedes hacer click en       ║
║   cualquier producto para agregarlo)  ║
╚══════════════════════════════════════╝
  `)}