import"./ui-category-tabs-Gv8dv0JB.js";import"./ui-drawer-Btw-wjO9.js";var e=document.createElement(`template`);e.innerHTML=`
  <style>
    :host {
      display: block;
      font-family: var(--font-family-base, sans-serif);
      background: var(--bg-surface, #FFFFFF);
      border-radius: var(--radius-lg, 16px);
      padding: var(--space-lg, 24px);
      box-shadow: var(--shadow-md, 0 4px 8px rgba(0,0,0,.15));
      color: var(--text-primary, #212121);
    }

    h2 {
      margin: 0 0 var(--space-md, 16px);
      font-size: var(--font-size-h3, 1.25rem);
      font-weight: var(--font-weight-bold, 700);
    }

    .field {
      margin-bottom: var(--space-md, 16px);
    }

    .field label {
      display: block;
      font-size: var(--font-size-label, 0.875rem);
      font-weight: var(--font-weight-medium, 500);
      color: var(--text-secondary, #616161);
      margin-bottom: var(--space-xs, 4px);
    }

    .field .required {
      color: var(--color-error, #C62828);
      margin-left: 2px;
    }

    textarea {
      width: 100%;
      min-height: 72px;
      padding: var(--space-sm, 8px) var(--space-md, 16px);
      border: 2px solid #E0E0E0;
      border-radius: var(--radius-md, 8px);
      background: var(--bg-surface, #FFFFFF);
      color: var(--text-primary, #212121);
      font-family: inherit;
      font-size: var(--font-size-body, 1rem);
      resize: vertical;
      box-sizing: border-box;
      transition: border-color .2s ease, box-shadow .2s ease;
    }

    textarea:hover { border-color: #BDBDBD; }
    textarea:focus {
      outline: none;
      border-color: var(--color-primary, #E65100);
      box-shadow: 0 0 0 3px rgba(230, 81, 0, .15);
    }

    .row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: var(--space-md, 16px);
    }

    @media (max-width: 480px) {
      .row { grid-template-columns: 1fr; }
    }

    .actions {
      display: flex;
      gap: var(--space-sm, 8px);
      justify-content: flex-end;
      margin-top: var(--space-lg, 24px);
    }

    .error-msg {
      color: var(--color-error, #C62828);
      font-size: var(--font-size-label, 0.875rem);
      margin-top: var(--space-xs, 4px);
      display: none;
    }

    .error-msg.visible { display: block; }
  </style>

  <h2>Datos de entrega</h2>

  <div class="field">
    <label>Nombre completo <span class="required">*</span></label>
    <ui-input id="nombre" placeholder="Ej: María González" type="text"></ui-input>
    <p class="error-msg" id="errNombre">Ingresa tu nombre.</p>
  </div>

  <div class="row">
    <div class="field">
      <label>Teléfono celular <span class="required">*</span></label>
      <ui-input id="telefono" placeholder="Ej: 3001234567" type="tel"></ui-input>
      <p class="error-msg" id="errTelefono">Ingresa un teléfono válido (mín. 7 dígitos).</p>
    </div>

    <div class="field">
      <label>Barrio <span class="required">*</span></label>
      <ui-input id="barrio" placeholder="Ej: El Prado" type="text"></ui-input>
      <p class="error-msg" id="errBarrio">Ingresa tu barrio.</p>
    </div>
  </div>

  <div class="field">
    <label>Dirección de entrega <span class="required">*</span></label>
    <ui-input id="direccion" placeholder="Ej: Cra 45 #32-10, Apto 201" type="text"></ui-input>
    <p class="error-msg" id="errDireccion">Ingresa tu dirección completa.</p>
  </div>

  <div class="field">
    <label>Notas para el repartidor (opcional)</label>
    <textarea id="notas" placeholder="Ej: Timbre 3B, dejar en portería..."></textarea>
  </div>

  <div class="actions">
    <ui-button variant="secondary" id="btnCancelar">Cancelar</ui-button>
    <ui-button variant="primary" id="btnEnviar">Confirmar pedido</ui-button>
  </div>
`;var t=class extends HTMLElement{constructor(){super(),this.attachShadow({mode:`open`}),this.shadowRoot.appendChild(e.content.cloneNode(!0)),this._nombre=this.shadowRoot.querySelector(`#nombre`),this._telefono=this.shadowRoot.querySelector(`#telefono`),this._barrio=this.shadowRoot.querySelector(`#barrio`),this._direccion=this.shadowRoot.querySelector(`#direccion`),this._notas=this.shadowRoot.querySelector(`#notas`),this._errNombre=this.shadowRoot.querySelector(`#errNombre`),this._errTelefono=this.shadowRoot.querySelector(`#errTelefono`),this._errBarrio=this.shadowRoot.querySelector(`#errBarrio`),this._errDireccion=this.shadowRoot.querySelector(`#errDireccion`),this._btnEnviar=this.shadowRoot.querySelector(`#btnEnviar`),this._btnCancelar=this.shadowRoot.querySelector(`#btnCancelar`)}connectedCallback(){this._btnEnviar.addEventListener(`btn-click`,()=>this._submit()),this._btnCancelar.addEventListener(`btn-click`,()=>this._cancel())}_submit(){let e=this._nombre.value.trim(),t=this._telefono.value.replace(/\D/g,``),n=this._barrio.value.trim(),r=this._direccion.value.trim(),i=this._notas.value.trim(),a=!0;e?(this._errNombre.classList.remove(`visible`),this._nombre.removeAttribute(`error`)):(this._errNombre.classList.add(`visible`),this._nombre.setAttribute(`error`,``),a=!1),t.length<7?(this._errTelefono.classList.add(`visible`),this._telefono.setAttribute(`error`,``),a=!1):(this._errTelefono.classList.remove(`visible`),this._telefono.removeAttribute(`error`)),n?(this._errBarrio.classList.remove(`visible`),this._barrio.removeAttribute(`error`)):(this._errBarrio.classList.add(`visible`),this._barrio.setAttribute(`error`,``),a=!1),r?(this._errDireccion.classList.remove(`visible`),this._direccion.removeAttribute(`error`)):(this._errDireccion.classList.add(`visible`),this._direccion.setAttribute(`error`,``),a=!1),a&&this.dispatchEvent(new CustomEvent(`checkout-submit`,{bubbles:!0,composed:!0,detail:{nombre:e,telefono:t,barrio:n,direccion:r,notas:i}}))}_cancel(){this.dispatchEvent(new CustomEvent(`checkout-cancel`,{bubbles:!0,composed:!0}))}};customElements.define(`ui-checkout-form`,t);var n=document.createElement(`template`);n.innerHTML=`
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
`;var r=class extends HTMLElement{static get observedAttributes(){return[`variant`]}constructor(){super(),this.attachShadow({mode:`open`}),this.shadowRoot.appendChild(n.content.cloneNode(!0))}};customElements.define(`ui-badge`,r);var i=document.createElement(`template`);i.innerHTML=`
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
`;var a=class extends HTMLElement{static get observedAttributes(){return[`value`,`min`,`max`]}constructor(){super(),this.attachShadow({mode:`open`}),this.shadowRoot.appendChild(i.content.cloneNode(!0)),this._decrementBtn=this.shadowRoot.querySelector(`.decrement`),this._incrementBtn=this.shadowRoot.querySelector(`.increment`),this._valueEl=this.shadowRoot.querySelector(`.value`)}connectedCallback(){this._decrementBtn.addEventListener(`click`,()=>this._change(-1)),this._incrementBtn.addEventListener(`click`,()=>this._change(1)),this._syncUI()}attributeChangedCallback(e,t,n){t!==n&&this._syncUI()}get value(){return Number(this.getAttribute(`value`))||1}set value(e){this.setAttribute(`value`,e)}get min(){return Number(this.getAttribute(`min`))||1}set min(e){this.setAttribute(`min`,e)}get max(){return Number(this.getAttribute(`max`))||99}set max(e){this.setAttribute(`max`,e)}_change(e){let t=this.value+e;t<this.min||t>this.max||(this.value=t,this.dispatchEvent(new CustomEvent(`quantity-change`,{bubbles:!0,composed:!0,detail:{value:t}})))}_syncUI(){this._valueEl&&(this._valueEl.textContent=this.value,this._decrementBtn.disabled=this.value<=this.min,this._incrementBtn.disabled=this.value>=this.max)}};customElements.define(`ui-quantity-selector`,a);var o=document.createElement(`template`);o.innerHTML=`
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
`;var s=class extends HTMLElement{static get observedAttributes(){return[`name`,`description`,`price`,`image`]}constructor(){super(),this.attachShadow({mode:`open`}),this.shadowRoot.appendChild(o.content.cloneNode(!0)),this._img=this.shadowRoot.querySelector(`.card__img`),this._title=this.shadowRoot.querySelector(`.card__title`),this._desc=this.shadowRoot.querySelector(`.card__desc`),this._badge=this.shadowRoot.querySelector(`ui-badge`),this._quantity=this.shadowRoot.querySelector(`ui-quantity-selector`),this._addBtn=this.shadowRoot.querySelector(`ui-button`)}connectedCallback(){this._addBtn.addEventListener(`btn-click`,()=>{this.dispatchEvent(new CustomEvent(`add-to-cart`,{bubbles:!0,composed:!0,detail:{id:this.getAttribute(`data-id`)||this.getAttribute(`name`),name:this.getAttribute(`name`),price:Number(this.getAttribute(`price`))||0,quantity:this._quantity.value}}))})}attributeChangedCallback(e,t,n){if(this._title)switch(e){case`name`:this._title.textContent=n||``,this._img.alt=n||``;break;case`description`:this._desc.textContent=n||``;break;case`image`:this._img.src=n||``;break;case`price`:let e=Number(n)||0;this._badge.textContent=`$${e.toLocaleString(`es-CO`)}`}}};customElements.define(`ui-product-card`,s);var c={items:[],add(e){let t=e.quantity||1,n=this.items.find(t=>t.id===e.id);n?n.qty+=t:this.items.push({id:e.id,name:e.name,price:e.price,qty:t}),this._sync()},remove(e){this.items=this.items.filter(t=>t.id!==e),this._sync()},updateQty(e,t){let n=this.items.find(t=>t.id===e);if(n){if(n.qty+=t,n.qty<=0)return this.remove(e);this._sync()}},clear(){this.items=[],this._sync()},count(){return this.items.reduce((e,t)=>e+t.qty,0)},subtotal(){return this.items.reduce((e,t)=>e+t.price*t.qty,0)},total(){return this.subtotal()*1.19},_sync(){l(f),l(p),y()}};function l(e){e&&e.setItems(c.items.map(e=>({id:e.id,name:e.name,price:e.price,qty:e.qty})))}var u=[{id:`p1`,name:`Mote de Queso`,description:`Sopa típica con ñame y queso costeño.`,price:22e3,image:`platillos/mote-de-queso.jpg`,category:`entradas`},{id:`p2`,name:`Sopa de Guandú`,description:`Sopa con guandú, costilla y verduras.`,price:24e3,image:`platillos/sopa-guandu.jpg`,category:`entradas`},{id:`p3`,name:`Patacones con Hogao`,description:`Patacones fritos con hogao de tomate y cebolla.`,price:12e3,image:`platillos/patacones-hogao.jpg`,category:`entradas`},{id:`p4`,name:`Ceviche de Camarón`,description:`Camarones frescos con limón, ají y cilantro.`,price:28e3,image:`platillos/ceviche-camaron.jpg`,category:`entradas`},{id:`p5`,name:`Cazuela de Mariscos`,description:`Tradicional cazuela con camarón, jaiba y pescado en leche de coco.`,price:38e3,image:`platillos/cazuela-mariscos.jpg`,category:`platos`},{id:`p6`,name:`Mojarra Frita`,description:`Mojarra frita entera con arroz de coco y patacón.`,price:34e3,image:`platillos/mojarra-frita.jpg`,category:`platos`},{id:`p7`,name:`Arroz con Coco`,description:`Acompañamiento tradicional del Caribe colombiano.`,price:9e3,image:`platillos/arroz-coco.jpg`,category:`platos`},{id:`p8`,name:`Posta Negra Cartagenera`,description:`Lomo de res en salsa dulce con arroz blanco.`,price:36e3,image:`platillos/posta-negra.jpg`,category:`platos`},{id:`p9`,name:`Arroz de Lisa`,description:`Arroz con lisa desmechada y especias costeñas.`,price:3e4,image:`platillos/arroz-lisa.jpg`,category:`platos`},{id:`p10`,name:`Sancocho de Guandú con Carne`,description:`Sancocho tradicional con guandú y carne.`,price:32e3,image:`platillos/sancocho-guandu.jpg`,category:`platos`},{id:`p11`,name:`Jugo de Corozo`,description:`Bebida natural refrescante.`,price:8e3,image:`platillos/jugo-corozo.jpg`,category:`bebidas`},{id:`p12`,name:`Limonada de Coco`,description:`Limonada cremosa con leche de coco.`,price:12e3,image:`platillos/limonada-coco.jpg`,category:`bebidas`},{id:`p13`,name:`Jugo de Maracuyá`,description:`Jugo natural de maracuyá.`,price:8e3,image:`platillos/jugo-maracuya.jpg`,category:`bebidas`},{id:`p14`,name:`Agua de Panela con Limón`,description:`Bebida tradicional refrescante.`,price:6e3,image:`platillos/agua-panela.jpg`,category:`bebidas`},{id:`p15`,name:`Enyucado`,description:`Postre de yuca, coco y anís.`,price:1e4,image:`platillos/enyucado.jpg`,category:`postres`},{id:`p16`,name:`Cocadas`,description:`Dulce tradicional de coco.`,price:8e3,image:`platillos/cocadas.jpg`,category:`postres`}],d=document.getElementById(`menuGrid`);u.forEach(e=>{let t=document.createElement(`ui-product-card`);t.setAttribute(`data-id`,e.id),t.setAttribute(`data-category`,e.category),t.setAttribute(`name`,e.name),t.setAttribute(`description`,e.description),t.setAttribute(`price`,e.price),t.setAttribute(`image`,e.image),d.appendChild(t)});var f=document.getElementById(`summaryDesktop`),p=document.getElementById(`summaryDrawer`);document.addEventListener(`add-to-cart`,e=>{c.add(e.detail)}),document.addEventListener(`summary-change`,e=>{c.items=e.detail.items.map(e=>({id:e.id,name:e.name,price:e.price,qty:e.qty})),c._sync()});var m=document.getElementById(`checkoutDialog`),h=null;document.addEventListener(`order-confirmed`,e=>{h=e.detail,m.showModal()}),document.addEventListener(`checkout-submit`,e=>{let{nombre:t,telefono:n,barrio:r,direccion:i,notas:a}=e.detail;if(!h)return;let o=h.total.toLocaleString(`es-CO`),s=h.items.map(e=>`• ${e.name} x${e.qty}`).join(`
`);alert(`✅ Pedido confirmado\n\nCliente: ${t}\nTeléfono: ${n}\nDirección: ${i}, ${r}\n`+(a?`Notas: ${a}\n`:``)+`\n${s}\n\nTotal: $${o}`),c.clear(),h=null,m.close();let l=document.getElementById(`cartDrawer`);l&&l.close()}),document.addEventListener(`checkout-cancel`,()=>{h=null,m.close()});var g=document.getElementById(`floatingCart`),_=document.getElementById(`floatingCartCount`),v=document.getElementById(`cartDrawer`);function y(){if(!_||!g)return;let e=c.count();_.textContent=e,g.hidden=e===0}g.addEventListener(`click`,()=>v.show());var b=document.getElementById(`menuSearch`),x=``,S=`all`;b.addEventListener(`input-change`,e=>{x=e.detail.value.toLowerCase().trim(),w()});var C=document.getElementById(`categoryTabs`);C.setCategories([{id:`all`,label:`Todos`,emoji:`🍽️`},{id:`entradas`,label:`Entradas`,emoji:`🥗`},{id:`platos`,label:`Platos fuertes`,emoji:`🍲`},{id:`bebidas`,label:`Bebidas`,emoji:`🥤`},{id:`postres`,label:`Postres`,emoji:`🍰`}]),C.addEventListener(`category-change`,e=>{S=e.detail.id,w()});function w(){d.querySelectorAll(`ui-product-card`).forEach(e=>{let t=(e.getAttribute(`name`)||``).toLowerCase(),n=(e.getAttribute(`description`)||``).toLowerCase(),r=e.getAttribute(`data-category`)||`all`,i=!x||t.includes(x)||n.includes(x),a=S===`all`||r===S;e.style.display=i&&a?``:`none`})}var T=document.getElementById(`themeToggle`);T.addEventListener(`click`,()=>{let e=document.documentElement,t=e.getAttribute(`data-theme`)===`dark`;e.setAttribute(`data-theme`,t?`light`:`dark`),T.textContent=t?`🌙 Modo oscuro`:`☀️ Modo claro`}),y();var E=document.getElementById(`appTitle`);function D(){E&&(E.textContent=window.innerWidth<=900?`🍽️ La Bonga`:`🍽️ La Bonga del Sinú`)}D(),window.addEventListener(`resize`,D);