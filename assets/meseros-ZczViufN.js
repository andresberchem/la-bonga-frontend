import"./ui-category-tabs-Gv8dv0JB.js";import"./ui-drawer-Btw-wjO9.js";var e=document.createElement(`template`);e.innerHTML=`
  <style>
    :host {
      display: block;
      position: relative;
      touch-action: pan-y;
      user-select: none;
      -webkit-user-select: none;
    }

    .swipe-container {
      position: relative;
      overflow: hidden;
      border-radius: inherit;
    }

    /* Fondo verde: aparece al deslizar a la derecha (acción: agregar) */
    .bg-right {
      position: absolute;
      inset: 0;
      background: var(--color-success, #2E7D32);
      color: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding: 0 20px;
      font-weight: 700;
      font-size: 1rem;
      opacity: 0;
      transition: opacity .15s ease;
      pointer-events: none;
    }

    /* Fondo azul: aparece al deslizar a la izquierda (acción: info) */
    .bg-left {
      position: absolute;
      inset: 0;
      background: var(--color-info, #1565C0);
      color: #FFFFFF;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: 0 20px;
      font-weight: 700;
      font-size: 1rem;
      opacity: 0;
      transition: opacity .15s ease;
      pointer-events: none;
    }

    .content {
      position: relative;
      transform: translateX(0);
      transition: transform .25s cubic-bezier(.2, .8, .2, 1);
      will-change: transform;
      z-index: 1;
      background: inherit;
      border-radius: inherit;
    }

    :host([dragging]) .content {
      transition: none;
    }
  </style>

  <div class="swipe-container">
    <div class="bg-right">✅ Agregar</div>
    <div class="bg-left">ℹ️ Información</div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
`;var t=class extends HTMLElement{static get observedAttributes(){return[`threshold`,`right-action`,`left-action`]}constructor(){super(),this.attachShadow({mode:`open`}),this.shadowRoot.appendChild(e.content.cloneNode(!0)),this._container=this.shadowRoot.querySelector(`.swipe-container`),this._content=this.shadowRoot.querySelector(`.content`),this._bgRight=this.shadowRoot.querySelector(`.bg-right`),this._bgLeft=this.shadowRoot.querySelector(`.bg-left`),this._startX=0,this._startY=0,this._currentX=0,this._currentY=0,this._isDragging=!1,this._isHorizontal=null}connectedCallback(){this.addEventListener(`touchstart`,this._onTouchStart.bind(this),{passive:!0}),this.addEventListener(`touchmove`,this._onTouchMove.bind(this),{passive:!1}),this.addEventListener(`touchend`,this._onTouchEnd.bind(this)),this.addEventListener(`touchcancel`,this._onTouchEnd.bind(this)),this.addEventListener(`mousedown`,this._onMouseDown.bind(this))}get threshold(){return Number(this.getAttribute(`threshold`))||80}get rightAction(){return this.getAttribute(`right-action`)||`add`}get leftAction(){return this.getAttribute(`left-action`)||`info`}_onTouchStart(e){let t=e.touches[0];this._startX=t.clientX,this._startY=t.clientY,this._currentX=0,this._currentY=0,this._isDragging=!0,this._isHorizontal=null,this.setAttribute(`dragging`,``)}_onTouchMove(e){if(!this._isDragging)return;let t=e.touches[0],n=t.clientX-this._startX,r=t.clientY-this._startY;if(this._isHorizontal===null&&(Math.abs(n)>10||Math.abs(r)>10)&&(this._isHorizontal=Math.abs(n)>Math.abs(r)),this._isHorizontal===!1)return;e.preventDefault();let i=this.threshold*1.5,a=Math.max(-i,Math.min(i,n));this._currentX=a,this._content.style.transform=`translateX(${a}px)`,a>0?(this._bgRight.style.opacity=Math.min(1,a/this.threshold),this._bgLeft.style.opacity=0):a<0?(this._bgLeft.style.opacity=Math.min(1,Math.abs(a)/this.threshold),this._bgRight.style.opacity=0):(this._bgRight.style.opacity=0,this._bgLeft.style.opacity=0)}_onTouchEnd(){if(!this._isDragging)return;this._isDragging=!1,this.removeAttribute(`dragging`);let e=this._currentX,t=Math.abs(e);this._content.style.transform=`translateX(0)`,this._bgRight.style.opacity=0,this._bgLeft.style.opacity=0,t>=this.threshold&&(e>0?(this.dispatchEvent(new CustomEvent(`swipe-right`,{bubbles:!0,composed:!0,detail:{action:this.rightAction,distance:e}})),navigator.vibrate&&navigator.vibrate(30)):(this.dispatchEvent(new CustomEvent(`swipe-left`,{bubbles:!0,composed:!0,detail:{action:this.leftAction,distance:e}})),navigator.vibrate&&navigator.vibrate(30))),this._currentX=0,this._isHorizontal=null}_onMouseDown(e){let t=e.clientX,n=e.clientY,r=!1,i=e=>{let i=e.clientX-t,a=e.clientY-n;if(!r&&(Math.abs(i)>10||Math.abs(a)>10)&&(r=!0,this.setAttribute(`dragging`,``),this._isHorizontal=Math.abs(i)>Math.abs(a)),!r||this._isHorizontal===!1)return;let o=this.threshold*1.5,s=Math.max(-o,Math.min(o,i));this._content.style.transform=`translateX(${s}px)`,s>0?(this._bgRight.style.opacity=Math.min(1,s/this.threshold),this._bgLeft.style.opacity=0):s<0&&(this._bgLeft.style.opacity=Math.min(1,Math.abs(s)/this.threshold),this._bgRight.style.opacity=0)},a=e=>{if(document.removeEventListener(`mousemove`,i),document.removeEventListener(`mouseup`,a),!r)return;let n=e.clientX-t;this._content.style.transform=`translateX(0)`,this._bgRight.style.opacity=0,this._bgLeft.style.opacity=0,this.removeAttribute(`dragging`),Math.abs(n)>=this.threshold&&(n>0?this.dispatchEvent(new CustomEvent(`swipe-right`,{bubbles:!0,composed:!0,detail:{action:this.rightAction,distance:n}})):this.dispatchEvent(new CustomEvent(`swipe-left`,{bubbles:!0,composed:!0,detail:{action:this.leftAction,distance:n}})))};document.addEventListener(`mousemove`,i),document.addEventListener(`mouseup`,a)}};customElements.define(`ui-swipeable`,t);var n=[{id:`p1`,name:`Mote de Queso`,price:22e3,category:`entradas`},{id:`p2`,name:`Sopa de Guandú`,price:24e3,category:`entradas`},{id:`p3`,name:`Patacones con Hogao`,price:12e3,category:`entradas`},{id:`p4`,name:`Ceviche de Camarón`,price:28e3,category:`entradas`},{id:`p5`,name:`Cazuela de Mariscos`,price:38e3,category:`platos`},{id:`p6`,name:`Mojarra Frita`,price:34e3,category:`platos`},{id:`p7`,name:`Arroz con Coco`,price:9e3,category:`platos`},{id:`p8`,name:`Posta Negra Cartagenera`,price:36e3,category:`platos`},{id:`p9`,name:`Arroz de Lisa`,price:3e4,category:`platos`},{id:`p10`,name:`Sancocho de Guandú con Carne`,price:32e3,category:`platos`},{id:`p11`,name:`Jugo de Corozo`,price:8e3,category:`bebidas`},{id:`p12`,name:`Limonada de Coco`,price:12e3,category:`bebidas`},{id:`p13`,name:`Jugo de Maracuyá`,price:8e3,category:`bebidas`},{id:`p14`,name:`Agua de Panela con Limón`,price:6e3,category:`bebidas`},{id:`p15`,name:`Enyucado`,price:1e4,category:`postres`},{id:`p16`,name:`Cocadas`,price:8e3,category:`postres`}],r=e=>`$${e.toLocaleString(`es-CO`)}`,i={items:[],add(e){let t=this.items.find(t=>t.id===e.id);t?t.qty+=1:this.items.push({id:e.id,name:e.name,price:e.price,qty:1}),this._sync()},remove(e){this.items=this.items.filter(t=>t.id!==e),this._sync()},updateQty(e,t){let n=this.items.find(t=>t.id===e);if(n){if(n.qty+=t,n.qty<=0)return this.remove(e);this._sync()}},clear(){this.items=[],this._sync()},count(){return this.items.reduce((e,t)=>e+t.qty,0)},total(){return this.items.reduce((e,t)=>e+t.price*t.qty,0)*1.19},_sync(){a(l),a(u),y()}};function a(e){e&&e.setItems(i.items.map(e=>({id:e.id,name:e.name,price:e.price,qty:e.qty})))}var o=document.getElementById(`meseroCatalog`),s=document.getElementById(`meseroSearch`),c=document.getElementById(`meseroTabs`),l=document.getElementById(`mesaSummary`),u=document.getElementById(`drawerSummaryM`),d=document.getElementById(`floatingCartM`),f=document.getElementById(`floatingCartCountM`),p=document.getElementById(`cartDrawerM`),m=document.getElementById(`mesaCount`);function h(e){if(o.innerHTML=``,!e.length){let e=document.createElement(`p`);e.style.cssText=`color:#888;text-align:center;padding:24px;`,e.textContent=`No se encontraron platillos.`,o.appendChild(e);return}e.forEach(e=>{let t=document.createElement(`ui-swipeable`);t.setAttribute(`threshold`,`80`);let n=document.createElement(`button`);n.className=`mesa-item`,n.setAttribute(`data-id`,e.id),n.innerHTML=`
      <div class="mesa-item__info">
        <p class="mesa-item__name">${e.name}</p>
        <span class="mesa-item__price">${r(e.price)}</span>
      </div>
      <span class="mesa-item__add" aria-hidden="true">+</span>
    `,n.addEventListener(`click`,()=>{i.add({id:e.id,name:e.name,price:e.price}),n.style.borderColor=`#2E7D32`,setTimeout(()=>{n.style.borderColor=``},250)}),t.addEventListener(`swipe-right`,()=>{i.add({id:e.id,name:e.name,price:e.price}),n.style.borderColor=`#2E7D32`,setTimeout(()=>{n.style.borderColor=``},250)}),t.addEventListener(`swipe-left`,()=>{alert(`ℹ️ ${e.name}\n\nPrecio: ${r(e.price)}\nCategoría: ${e.category}`)}),t.appendChild(n),o.appendChild(t)})}h(n);var g=``,_=`all`;function v(){h(n.filter(e=>{let t=!g||e.name.toLowerCase().includes(g),n=_===`all`||e.category===_;return t&&n}))}s.addEventListener(`input-change`,e=>{g=e.detail.value.toLowerCase().trim(),v()}),c.setCategories([{id:`all`,label:`Todos`,emoji:`🍽️`},{id:`entradas`,label:`Entradas`,emoji:`🥗`},{id:`platos`,label:`Platos`,emoji:`🍲`},{id:`bebidas`,label:`Bebidas`,emoji:`🥤`},{id:`postres`,label:`Postres`,emoji:`🍰`}]),c.addEventListener(`category-change`,e=>{_=e.detail.id,v()}),document.addEventListener(`summary-change`,e=>{i.items=e.detail.items.map(e=>({id:e.id,name:e.name,price:e.price,qty:e.qty})),i._sync()});function y(){if(!d||!f)return;let e=i.count();f.textContent=e,d.hidden=e===0,m&&(m.textContent=`${e} ${e===1?`item`:`items`}`)}d.addEventListener(`click`,()=>p.show()),document.addEventListener(`order-confirmed`,e=>{let t=e.detail.total.toLocaleString(`es-CO`),n=e.detail.items.map(e=>`• ${e.name} x${e.qty}`).join(`
`);alert(`✅ Pedido enviado a cocina\n\n${n}\n\nTotal: $${t}`),i.clear(),p.close()});var b=3;document.getElementById(`btnMesa`).addEventListener(`click`,()=>{let e=prompt(`Número de mesa (1-12):`,b),t=parseInt(e,10);t>=1&&t<=12&&(b=t,document.getElementById(`btnMesa`).textContent=`Mesa ${t} ▾`,document.getElementById(`mesaTitle`).textContent=`Mesa ${t}`,document.querySelector(`#cartDrawerM [slot="title"]`).textContent=`Mesa ${t}`,i.clear())}),document.getElementById(`btnTheme`).addEventListener(`click`,()=>{let e=document.documentElement,t=e.getAttribute(`data-theme`)===`dark`;e.setAttribute(`data-theme`,t?`light`:`dark`),document.getElementById(`btnTheme`).textContent=t?`🌙`:`☀️`}),y();