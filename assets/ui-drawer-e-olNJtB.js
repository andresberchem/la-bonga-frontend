import"./ui-button-BUPy334S.js";var e=document.createElement(`template`);e.innerHTML=`
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
`;var t=.19,n=e=>`$${e.toLocaleString(`es-CO`)}`,r=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:`open`}),this.shadowRoot.appendChild(e.content.cloneNode(!0)),this._items=[],this._list=this.shadowRoot.querySelector(`#list`),this._subtotalEl=this.shadowRoot.querySelector(`#subtotal`),this._ivaEl=this.shadowRoot.querySelector(`#iva`),this._totalEl=this.shadowRoot.querySelector(`#total`),this._confirmBtn=this.shadowRoot.querySelector(`#confirm`),this._clearAllBtn=this.shadowRoot.querySelector(`#clearAll`)}connectedCallback(){this._confirmBtn.addEventListener(`btn-click`,()=>{this._items.length&&this.dispatchEvent(new CustomEvent(`order-confirmed`,{bubbles:!0,composed:!0,detail:{items:[...this._items],total:this._calc().total}}))}),this._clearAllBtn.addEventListener(`click`,()=>this.clear()),this.render()}addItem(e){let t=e.quantity||1,n=this._items.find(t=>t.id===e.id);n?n.qty+=t:this._items.push({id:e.id,name:e.name,price:e.price,qty:t}),this._notifyChange(),this.render()}removeItem(e){this._items=this._items.filter(t=>t.id!==e),this._notifyChange(),this.render()}updateQty(e,t){let n=this._items.find(t=>t.id===e);if(n){if(n.qty+=t,n.qty<=0){this.removeItem(e);return}this._notifyChange(),this.render()}}clear(){this._items=[],this._notifyChange(),this.render()}setItems(e){this._items=e.map(e=>({id:e.id,name:e.name,price:e.price,qty:e.qty})),this.render()}_notifyChange(){this.dispatchEvent(new CustomEvent(`summary-change`,{bubbles:!0,composed:!0,detail:{items:[...this._items],total:this._calc().total}}))}_calc(){let e=this._items.reduce((e,t)=>e+t.price*t.qty,0),n=e*t;return{subtotal:e,iva:n,total:e+n}}render(){if(this._list.innerHTML=``,this._items.length)this._clearAllBtn.hidden=!1,this._items.forEach(e=>{let t=document.createElement(`li`);t.className=`item`,t.setAttribute(`data-id`,e.id),t.innerHTML=`
          <div class="item__info">
            <span class="item__name" title="${e.name}">${e.name}</span>
            <span class="item__unit">${n(e.price)} c/u</span>
          </div>
          <div class="qty-controls">
            <button class="qty-btn" data-action="dec" aria-label="Disminuir">−</button>
            <span class="qty-value">${e.qty}</span>
            <button class="qty-btn" data-action="inc" aria-label="Aumentar">+</button>
          </div>
          <div class="item__right">
            <span class="item__subtotal">${n(e.price*e.qty)}</span>
            <button class="remove-btn" data-action="remove" aria-label="Eliminar">✕ Quitar</button>
          </div>
        `,t.querySelectorAll(`.qty-btn`).forEach(t=>{t.addEventListener(`click`,()=>{let n=t.getAttribute(`data-action`);this.updateQty(e.id,n===`inc`?1:-1)})}),t.querySelector(`.remove-btn`).addEventListener(`click`,()=>{this.removeItem(e.id)}),this._list.appendChild(t)});else{let e=document.createElement(`li`);e.className=`empty`,e.textContent=`Aún no hay productos agregados`,this._list.appendChild(e),this._clearAllBtn.hidden=!0}let{subtotal:e,iva:t,total:r}=this._calc();this._subtotalEl.textContent=n(e),this._ivaEl.textContent=n(t),this._totalEl.textContent=n(r)}};customElements.define(`ui-order-summary`,r);var i=document.createElement(`template`);i.innerHTML=`
  <style>
    :host {
      display: contents;
    }

    /* ---- Backdrop (fondo oscuro) ---- */
    .backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, .5);
      opacity: 0;
      pointer-events: none;
      transition: opacity .3s ease;
      z-index: 40;
    }

    :host([open]) .backdrop {
      opacity: 1;
      pointer-events: auto;
    }

    /* ---- Panel deslizable ---- */
    .drawer {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      background: var(--bg-surface, #FFFFFF);
      border-top-left-radius: var(--radius-lg, 16px);
      border-top-right-radius: var(--radius-lg, 16px);
      box-shadow: 0 -8px 24px rgba(0, 0, 0, .2);
      transform: translateY(100%);
      transition: transform .35s cubic-bezier(.32, .72, 0, 1);
      z-index: 50;
      max-height: 85vh;
      display: flex;
      flex-direction: column;
      font-family: var(--font-family-base, sans-serif);
    }

    :host([open]) .drawer {
      transform: translateY(0);
    }

    /* ---- Handle para arrastrar ---- */
    .handle-area {
      flex-shrink: 0;
      padding: var(--space-sm, 8px) 0 var(--space-xs, 4px);
      cursor: grab;
      display: flex;
      justify-content: center;
      touch-action: none;
    }

    .handle-area:active {
      cursor: grabbing;
    }

    .handle {
      width: 40px;
      height: 4px;
      background: #BDBDBD;
      border-radius: var(--radius-pill, 999px);
    }

    /* ---- Header con título y cerrar ---- */
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: var(--space-xs, 4px) var(--space-md, 16px) var(--space-sm, 8px);
      border-bottom: 1px solid #F0F0F0;
      flex-shrink: 0;
    }

    .header h2 {
      margin: 0;
      font-size: var(--font-size-h3, 1.25rem);
      font-weight: var(--font-weight-bold, 700);
      color: var(--text-primary, #212121);
    }

    .close-btn {
      width: 36px;
      height: 36px;
      padding: 0;
      border: none;
      background: transparent;
      color: var(--text-secondary, #616161);
      font-size: 1.25rem;
      cursor: pointer;
      border-radius: 50%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transition: background-color .15s ease;
    }

    .close-btn:hover {
      background: #F5F5F5;
      color: var(--text-primary, #212121);
    }

    /* ---- Contenido (scroll) ---- */
    .content {
      flex: 1;
      overflow-y: auto;
      padding: var(--space-md, 16px);
      -webkit-overflow-scrolling: touch;
    }

    /* ---- Variante fullscreen ---- */
    :host([fullscreen]) .drawer {
      max-height: 100vh;
      border-radius: 0;
    }

    /* ---- Adaptación a desktop: drawer lateral ---- */
    @media (min-width: 1024px) {
      .drawer {
        left: auto;
        right: 0;
        top: 0;
        bottom: 0;
        width: 420px;
        max-height: 100vh;
        border-radius: 0;
        border-top-left-radius: var(--radius-lg, 16px);
        border-bottom-left-radius: var(--radius-lg, 16px);
        transform: translateX(100%);
      }

      :host([open]) .drawer {
        transform: translateX(0);
      }

      .handle-area {
        display: none;
      }
    }
  </style>

  <div class="backdrop" part="backdrop"></div>

  <div class="drawer" part="drawer" role="dialog" aria-modal="true">
    <div class="handle-area" part="handle-area">
      <div class="handle"></div>
    </div>

    <div class="header">
      <h2 part="title"><slot name="title">Panel</slot></h2>
      <button class="close-btn" type="button" aria-label="Cerrar">✕</button>
    </div>

    <div class="content" part="content">
      <slot></slot>
    </div>
  </div>
`;var a=class extends HTMLElement{static get observedAttributes(){return[`open`]}constructor(){super(),this.attachShadow({mode:`open`}),this.shadowRoot.appendChild(i.content.cloneNode(!0)),this._drawer=this.shadowRoot.querySelector(`.drawer`),this._backdrop=this.shadowRoot.querySelector(`.backdrop`),this._closeBtn=this.shadowRoot.querySelector(`.close-btn`),this._handleArea=this.shadowRoot.querySelector(`.handle-area`),this._dragStartY=0,this._dragCurrentY=0,this._isDragging=!1}connectedCallback(){this._backdrop.addEventListener(`click`,()=>this.close()),this._closeBtn.addEventListener(`click`,()=>this.close()),this._onKeyDown=e=>{e.key===`Escape`&&this.open&&this.close()},document.addEventListener(`keydown`,this._onKeyDown),this._handleArea.addEventListener(`pointerdown`,e=>this._dragStart(e)),document.addEventListener(`pointermove`,this._dragMove.bind(this)),document.addEventListener(`pointerup`,this._dragEnd.bind(this))}disconnectedCallback(){document.removeEventListener(`keydown`,this._onKeyDown)}get open(){return this.hasAttribute(`open`)}set open(e){e?this.setAttribute(`open`,``):this.removeAttribute(`open`)}show(){this.open=!0,this.dispatchEvent(new CustomEvent(`drawer-open`,{bubbles:!0,composed:!0}))}close(){this.open=!1,this._resetDrag(),this.dispatchEvent(new CustomEvent(`drawer-close`,{bubbles:!0,composed:!0}))}attributeChangedCallback(e,t,n){e===`open`&&t!==n&&(document.body.style.overflow=this.open?`hidden`:``)}_dragStart(e){this._isDragging=!0,this._dragStartY=e.clientY,this._dragCurrentY=0,this._drawer.style.transition=`none`}_dragMove(e){if(!this._isDragging)return;let t=e.clientY-this._dragStartY;t<0||(this._dragCurrentY=t,this._drawer.style.transform=`translateY(${t}px)`)}_dragEnd(){this._isDragging&&(this._isDragging=!1,this._drawer.style.transition=``,this._drawer.style.transform=``,this._dragCurrentY>100&&this.close(),this._dragCurrentY=0)}_resetDrag(){this._isDragging=!1,this._dragCurrentY=0,this._drawer&&(this._drawer.style.transition=``,this._drawer.style.transform=``)}};customElements.define(`ui-drawer`,a);