import"./ui-button-BUPy334S.js";import"./ui-drawer-e-olNJtB.js";var e=document.createElement(`template`);e.innerHTML=`
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
`;var t=class extends HTMLElement{static get observedAttributes(){return[`variant`]}constructor(){super(),this.attachShadow({mode:`open`}),this.shadowRoot.appendChild(e.content.cloneNode(!0))}};customElements.define(`ui-badge`,t);var n=document.createElement(`template`);n.innerHTML=`
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
`;var r=class extends HTMLElement{static get observedAttributes(){return[`value`,`min`,`max`]}constructor(){super(),this.attachShadow({mode:`open`}),this.shadowRoot.appendChild(n.content.cloneNode(!0)),this._decrementBtn=this.shadowRoot.querySelector(`.decrement`),this._incrementBtn=this.shadowRoot.querySelector(`.increment`),this._valueEl=this.shadowRoot.querySelector(`.value`)}connectedCallback(){this._decrementBtn.addEventListener(`click`,()=>this._change(-1)),this._incrementBtn.addEventListener(`click`,()=>this._change(1)),this._syncUI()}attributeChangedCallback(e,t,n){t!==n&&this._syncUI()}get value(){return Number(this.getAttribute(`value`))||1}set value(e){this.setAttribute(`value`,e)}get min(){return Number(this.getAttribute(`min`))||1}set min(e){this.setAttribute(`min`,e)}get max(){return Number(this.getAttribute(`max`))||99}set max(e){this.setAttribute(`max`,e)}_change(e){let t=this.value+e;t<this.min||t>this.max||(this.value=t,this.dispatchEvent(new CustomEvent(`quantity-change`,{bubbles:!0,composed:!0,detail:{value:t}})))}_syncUI(){this._valueEl&&(this._valueEl.textContent=this.value,this._decrementBtn.disabled=this.value<=this.min,this._incrementBtn.disabled=this.value>=this.max)}};customElements.define(`ui-quantity-selector`,r);var i=document.createElement(`template`);i.innerHTML=`
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
  object-position: center;
  background: linear-gradient(135deg, #F5F5F5, #E0E0E0);
  display: block;
  transition: transform .3s ease;
}

:host(:hover) .card__img {
  transform: scale(1.03);
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
`;var a=class extends HTMLElement{static get observedAttributes(){return[`name`,`description`,`price`,`image`]}constructor(){super(),this.attachShadow({mode:`open`}),this.shadowRoot.appendChild(i.content.cloneNode(!0)),this._img=this.shadowRoot.querySelector(`.card__img`),this._title=this.shadowRoot.querySelector(`.card__title`),this._desc=this.shadowRoot.querySelector(`.card__desc`),this._badge=this.shadowRoot.querySelector(`ui-badge`),this._quantity=this.shadowRoot.querySelector(`ui-quantity-selector`),this._addBtn=this.shadowRoot.querySelector(`ui-button`)}connectedCallback(){this._addBtn.addEventListener(`btn-click`,()=>{this.dispatchEvent(new CustomEvent(`add-to-cart`,{bubbles:!0,composed:!0,detail:{id:this.getAttribute(`data-id`)||this.getAttribute(`name`),name:this.getAttribute(`name`),price:Number(this.getAttribute(`price`))||0,quantity:this._quantity.value}}))})}attributeChangedCallback(e,t,n){if(this._title)switch(e){case`name`:this._title.textContent=n||``,this._img.alt=n||``;break;case`description`:this._desc.textContent=n||``;break;case`image`:this._img.src=n||``;break;case`price`:let e=Number(n)||0;this._badge.textContent=`$${e.toLocaleString(`es-CO`)}`}}};customElements.define(`ui-product-card`,a);var o={items:[],add(e){let t=e.quantity||1,n=this.items.find(t=>t.id===e.id);n?n.qty+=t:this.items.push({id:e.id,name:e.name,price:e.price,qty:t}),this._sync()},remove(e){this.items=this.items.filter(t=>t.id!==e),this._sync()},updateQty(e,t){let n=this.items.find(t=>t.id===e);if(n){if(n.qty+=t,n.qty<=0)return this.remove(e);this._sync()}},clear(){this.items=[],this._sync()},count(){return this.items.reduce((e,t)=>e+t.qty,0)},subtotal(){return this.items.reduce((e,t)=>e+t.price*t.qty,0)},total(){return this.subtotal()*1.19},_sync(){s(u),s(d),h()}};function s(e){e&&e.setItems(o.items.map(e=>({id:e.id,name:e.name,price:e.price,qty:e.qty})))}var c=[{id:`p1`,name:`Mote de Queso`,description:`Sopa típica con ñame y queso costeño.`,price:22e3,image:`platillos/mote-de-queso.jpg`,category:`entradas`},{id:`p2`,name:`Sopa de Guandú`,description:`Sopa con guandú, costilla y verduras.`,price:24e3,image:`platillos/sopa-guandu.jpg`,category:`entradas`},{id:`p3`,name:`Patacones con Hogao`,description:`Patacones fritos con hogao de tomate y cebolla.`,price:12e3,image:`platillos/patacones-hogao.jpg`,category:`entradas`},{id:`p4`,name:`Ceviche de Camarón`,description:`Camarones frescos con limón, ají y cilantro.`,price:28e3,image:`platillos/ceviche-camaron.jpg`,category:`entradas`},{id:`p5`,name:`Cazuela de Mariscos`,description:`Tradicional cazuela con camarón, jaiba y pescado en leche de coco.`,price:38e3,image:`platillos/cazuela-mariscos.jpg`,category:`platos`},{id:`p6`,name:`Mojarra Frita`,description:`Mojarra frita entera con arroz de coco y patacón.`,price:34e3,image:`platillos/mojarra-frita.jpg`,category:`platos`},{id:`p7`,name:`Arroz con Coco`,description:`Acompañamiento tradicional del Caribe colombiano.`,price:9e3,image:`platillos/arroz-coco.jpg`,category:`platos`},{id:`p8`,name:`Posta Negra Cartagenera`,description:`Lomo de res en salsa dulce con arroz blanco.`,price:36e3,image:`platillos/posta-negra.jpg`,category:`platos`},{id:`p9`,name:`Arroz de Lisa`,description:`Arroz con lisa desmechada y especias costeñas.`,price:3e4,image:`platillos/arroz-lisa.jpg`,category:`platos`},{id:`p10`,name:`Sancocho de Guandú con Carne`,description:`Sancocho tradicional con guandú y carne.`,price:32e3,image:`platillos/sancocho-guandu.jpg`,category:`platos`},{id:`p11`,name:`Jugo de Corozo`,description:`Bebida natural refrescante.`,price:8e3,image:`platillos/jugo-corozo.jpg`,category:`bebidas`},{id:`p12`,name:`Limonada de Coco`,description:`Limonada cremosa con leche de coco.`,price:12e3,image:`platillos/limonada-coco.jpg`,category:`bebidas`},{id:`p13`,name:`Jugo de Maracuyá`,description:`Jugo natural de maracuyá.`,price:8e3,image:`platillos/jugo-maracuya.jpg`,category:`bebidas`},{id:`p14`,name:`Agua de Panela con Limón`,description:`Bebida tradicional refrescante.`,price:6e3,image:`platillos/agua-panela.jpg`,category:`bebidas`},{id:`p15`,name:`Enyucado`,description:`Postre de yuca, coco y anís.`,price:1e4,image:`platillos/enyucado.jpg`,category:`postres`},{id:`p16`,name:`Cocadas`,description:`Dulce tradicional de coco.`,price:8e3,image:`platillos/cocadas.jpg`,category:`postres`}],l=document.getElementById(`menuGrid`);c.forEach(e=>{let t=document.createElement(`ui-product-card`);t.setAttribute(`data-id`,e.id),t.setAttribute(`data-category`,e.category),t.setAttribute(`name`,e.name),t.setAttribute(`description`,e.description),t.setAttribute(`price`,e.price),t.setAttribute(`image`,e.image),l.appendChild(t)});var u=document.getElementById(`summaryDesktop`),d=document.getElementById(`summaryDrawer`);document.addEventListener(`add-to-cart`,e=>{o.add(e.detail)}),document.addEventListener(`summary-change`,e=>{o.items=e.detail.items.map(e=>({id:e.id,name:e.name,price:e.price,qty:e.qty})),o._sync()}),document.addEventListener(`order-confirmed`,e=>{let t=e.detail.total.toLocaleString(`es-CO`),n=e.detail.items.map(e=>`• ${e.name} x${e.qty}`).join(`
`);alert(`✅ Pedido confirmado\n\n${n}\n\nTotal: $${t}`),o.clear();let r=document.getElementById(`cartDrawer`);r&&r.close()});var f=document.getElementById(`floatingCart`),p=document.getElementById(`floatingCartCount`),m=document.getElementById(`cartDrawer`);function h(){if(!p||!f)return;let e=o.count();p.textContent=e,f.hidden=e===0}f.addEventListener(`click`,()=>m.show());var g=document.getElementById(`menuSearch`),_=``,v=`all`;g.addEventListener(`input-change`,e=>{_=e.detail.value.toLowerCase().trim(),b()});var y=document.getElementById(`categoryTabs`);y.setCategories([{id:`all`,label:`Todos`,emoji:`🍽️`},{id:`entradas`,label:`Entradas`,emoji:`🥗`},{id:`platos`,label:`Platos fuertes`,emoji:`🍲`},{id:`bebidas`,label:`Bebidas`,emoji:`🥤`},{id:`postres`,label:`Postres`,emoji:`🍰`}]),y.addEventListener(`category-change`,e=>{v=e.detail.id,b()});function b(){l.querySelectorAll(`ui-product-card`).forEach(e=>{let t=(e.getAttribute(`name`)||``).toLowerCase(),n=(e.getAttribute(`description`)||``).toLowerCase(),r=e.getAttribute(`data-category`)||`all`,i=!_||t.includes(_)||n.includes(_),a=v===`all`||r===v;e.style.display=i&&a?``:`none`})}var x=document.getElementById(`themeToggle`);x.addEventListener(`click`,()=>{let e=document.documentElement,t=e.getAttribute(`data-theme`)===`dark`;e.setAttribute(`data-theme`,t?`light`:`dark`),x.textContent=t?`🌙 Modo oscuro`:`☀️ Modo claro`}),h();var S=document.getElementById(`appTitle`);function C(){S&&(S.textContent=window.innerWidth<=900?`🍽️ La Bonga`:`🍽️ La Bonga del Sinú`)}C(),window.addEventListener(`resize`,C);