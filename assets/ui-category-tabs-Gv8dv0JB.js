(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=document.createElement(`template`);e.innerHTML=`
  <style>
    :host {
      display: block;
      font-family: var(--font-family-base, sans-serif);
    }

    .wrapper {
      display: flex;
      align-items: center;
      gap: var(--space-sm, 8px);
      background: var(--bg-surface, #FFFFFF);
      border: 2px solid #E0E0E0;
      border-radius: var(--radius-md, 8px);
      padding: 0 var(--space-md, 16px);
      min-height: var(--touch-target-min, 48px);
      transition: border-color .2s ease, box-shadow .2s ease;
    }

    .wrapper:hover {
      border-color: #BDBDBD;
    }

    .wrapper:focus-within {
      border-color: var(--color-primary, #E65100);
      box-shadow: 0 0 0 3px rgba(230, 81, 0, .15);
    }

    .icon {
      flex-shrink: 0;
      width: 20px;
      height: 20px;
      color: var(--text-secondary, #616161);
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }

    input {
      flex: 1;
      border: none;
      outline: none;
      background: transparent;
      font-family: inherit;
      font-size: var(--font-size-body, 1rem);
      color: var(--text-primary, #212121);
      padding: var(--space-sm, 8px) 0;
      width: 100%;
    }

    input::placeholder {
      color: var(--text-secondary, #616161);
      opacity: .7;
    }

    .clear {
      flex-shrink: 0;
      width: 24px;
      height: 24px;
      border: none;
      background: transparent;
      cursor: pointer;
      border-radius: 50%;
      display: none;
      align-items: center;
      justify-content: center;
      color: var(--text-secondary, #616161);
      font-size: 1.1rem;
      line-height: 1;
      padding: 0;
    }

    .clear:hover {
      background: #F5F5F5;
      color: var(--text-primary, #212121);
    }

    :host([value]:not([value=""])) .clear,
    .clear.visible {
      display: inline-flex;
    }

    /* Variante disabled */
    :host([disabled]) .wrapper {
      background: #F5F5F5;
      border-color: #E0E0E0;
      cursor: not-allowed;
      opacity: .6;
    }
    :host([disabled]) input {
      cursor: not-allowed;
    }

    /* Variante error */
    :host([error]) .wrapper {
      border-color: var(--color-error, #C62828);
    }
    :host([error]) .wrapper:focus-within {
      box-shadow: 0 0 0 3px rgba(198, 40, 40, .15);
    }
          /* Ocultar el botón nativo del tipo search en WebKit */
    input[type="search"]::-webkit-search-cancel-button,
    input[type="search"]::-webkit-search-decoration,
    input[type="search"]::-webkit-search-results-button,
    input[type="search"]::-webkit-search-results-decoration {
      -webkit-appearance: none;
      appearance: none;
      display: none;
    }
  </style>

  <label class="wrapper" part="wrapper">
    <span class="icon" part="icon">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
    </span>
    <input type="text" part="input" />
    <button class="clear" type="button" aria-label="Limpiar" part="clear">✕</button>
  </label>
`;var t=class extends HTMLElement{static get observedAttributes(){return[`value`,`placeholder`,`type`,`disabled`,`error`]}constructor(){super(),this.attachShadow({mode:`open`}),this.shadowRoot.appendChild(e.content.cloneNode(!0)),this._input=this.shadowRoot.querySelector(`input`),this._clear=this.shadowRoot.querySelector(`.clear`)}connectedCallback(){this._syncFromAttributes(),this._input.addEventListener(`input`,()=>{let e=this._input.value;this.setAttribute(`value`,e),this.dispatchEvent(new CustomEvent(`input-change`,{bubbles:!0,composed:!0,detail:{value:e}}))}),this._input.addEventListener(`keydown`,e=>{e.key===`Enter`&&this.dispatchEvent(new CustomEvent(`input-submit`,{bubbles:!0,composed:!0,detail:{value:this._input.value}})),e.key===`Escape`&&(this._input.value=``,this.setAttribute(`value`,``),this.dispatchEvent(new CustomEvent(`input-change`,{bubbles:!0,composed:!0,detail:{value:``}})))}),this._clear.addEventListener(`click`,()=>{this._input.value=``,this.setAttribute(`value`,``),this._input.focus(),this.dispatchEvent(new CustomEvent(`input-change`,{bubbles:!0,composed:!0,detail:{value:``}}))})}attributeChangedCallback(e,t,n){this._input&&t!==n&&(e===`value`&&this._input.value!==n&&(this._input.value=n||``),e===`placeholder`&&(this._input.placeholder=n||``),e===`type`&&(this._input.type=n||`text`),e===`disabled`&&(this._input.disabled=this.hasAttribute(`disabled`)))}_syncFromAttributes(){this._input.value=this.getAttribute(`value`)||``,this._input.placeholder=this.getAttribute(`placeholder`)||``,this._input.type=this.getAttribute(`type`)||`text`,this._input.disabled=this.hasAttribute(`disabled`)}get value(){return this._input.value}set value(e){this._input.value=e,this.setAttribute(`value`,e)}focus(){this._input.focus()}};customElements.define(`ui-input`,t);var n=document.createElement(`template`);n.innerHTML=`
  <style>
    :host {
      display: inline-block;
    }

    button {
      /* Tokens de diseño */
      min-height: var(--touch-target-min, 48px);
      min-width: var(--touch-target-min, 48px);
      padding: var(--space-sm, 8px) var(--space-lg, 24px);
      font-family: var(--font-family-base, sans-serif);
      font-size: var(--font-size-body, 1rem);
      font-weight: var(--font-weight-medium, 500);
      line-height: var(--line-height-base, 1.5);
      border: none;
      border-radius: var(--radius-md, 8px);
      cursor: pointer;

      /* Layout interno */
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--space-sm, 8px);

      /* Animaciones */
      transition: background-color .2s ease, transform .1s ease, box-shadow .2s ease;
    }

    /* ---- Estados de interacción ---- */
    button:hover {
      transform: translateY(-1px);
    }

    button:active {
      transform: scale(0.97);
    }

    button:focus-visible {
      outline: 3px solid var(--color-primary, #E65100);
      outline-offset: 2px;
    }

    /* ---- Variante: primary ---- */
    :host([variant="primary"]) button,
    :host(:not([variant])) button {
      background-color: var(--color-primary, #E65100);
      color: var(--text-inverse, #FFFFFF);
    }
    :host([variant="primary"]) button:hover,
    :host(:not([variant])) button:hover {
      background-color: var(--color-primary-hover, #BF4500);
    }
    :host([variant="primary"]) button:active,
    :host(:not([variant])) button:active {
      background-color: var(--color-primary-active, #993700);
    }

    /* ---- Variante: secondary ---- */
    :host([variant="secondary"]) button {
      background-color: transparent;
      color: var(--color-secondary, #2E7D32);
      border: 2px solid var(--color-secondary, #2E7D32);
    }
    :host([variant="secondary"]) button:hover {
      background-color: var(--color-secondary, #2E7D32);
      color: var(--text-inverse, #FFFFFF);
    }

    /* ---- Variante: disabled ---- */
    :host([variant="disabled"]) button,
    button:disabled {
      background-color: #BDBDBD;
      color: #757575;
      cursor: not-allowed;
      transform: none;
      pointer-events: none;
    }

    /* ---- Estado: loading ---- */
    .spinner {
      width: 16px;
      height: 16px;
      border: 2px solid rgba(255, 255, 255, 0.4);
      border-top-color: #FFFFFF;
      border-radius: 50%;
      animation: spin .8s linear infinite;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    /* Ocultar spinner cuando no está en loading */
    :host(:not([loading])) .spinner {
      display: none;
    }

    /* Cuando está en loading, deshabilitar el botón pero mantener color */
    :host([loading]) button {
      cursor: wait;
      opacity: 0.85;
    }
  </style>

  <button part="button" type="button">
    <span class="spinner" aria-hidden="true"></span>
    <slot></slot>
  </button>
`;var r=class extends HTMLElement{static get observedAttributes(){return[`variant`,`loading`,`disabled`]}constructor(){super(),this.attachShadow({mode:`open`}),this.shadowRoot.appendChild(n.content.cloneNode(!0)),this._btn=this.shadowRoot.querySelector(`button`)}connectedCallback(){this._btn.addEventListener(`click`,this._handleClick.bind(this)),this._syncDisabled()}disconnectedCallback(){this._btn.removeEventListener(`click`,this._handleClick)}attributeChangedCallback(e,t,n){t!==n&&(e===`disabled`||e===`loading`)&&this._syncDisabled()}_handleClick(e){if(this.hasAttribute(`disabled`)||this.hasAttribute(`loading`)){e.stopImmediatePropagation(),e.preventDefault();return}this.dispatchEvent(new CustomEvent(`btn-click`,{bubbles:!0,composed:!0,detail:{originalEvent:e}}))}_syncDisabled(){if(!this._btn)return;let e=this.hasAttribute(`disabled`)||this.hasAttribute(`loading`);this._btn.disabled=e,this._btn.setAttribute(`aria-busy`,this.hasAttribute(`loading`)?`true`:`false`)}get disabled(){return this.hasAttribute(`disabled`)}set disabled(e){e?this.setAttribute(`disabled`,``):this.removeAttribute(`disabled`)}get loading(){return this.hasAttribute(`loading`)}set loading(e){e?this.setAttribute(`loading`,``):this.removeAttribute(`loading`)}};customElements.define(`ui-button`,r);var i=document.createElement(`template`);i.innerHTML=`
  <style>
    :host {
      display: block;
      font-family: var(--font-family-base, sans-serif);
    }

    .tabs {
      display: flex;
      gap: var(--space-sm, 8px);
      overflow-x: auto;
      overflow-y: hidden;
      scroll-behavior: smooth;
      padding: var(--space-xs, 4px) 0;
      scrollbar-width: thin;
      scrollbar-color: #BDBDBD transparent;
    }

    .tabs::-webkit-scrollbar {
      height: 4px;
    }
    .tabs::-webkit-scrollbar-thumb {
      background: #BDBDBD;
      border-radius: var(--radius-pill, 999px);
    }
    .tabs::-webkit-scrollbar-track {
      background: transparent;
    }

    button {
      flex-shrink: 0;
      display: inline-flex;
      align-items: center;
      gap: var(--space-xs, 4px);
      padding: var(--space-sm, 8px) var(--space-md, 16px);
      min-height: var(--touch-target-min, 48px);
      background: var(--bg-surface, #FFFFFF);
      color: var(--text-primary, #212121);
      border: 2px solid #E0E0E0;
      border-radius: var(--radius-pill, 999px);
      font-family: inherit;
      font-size: var(--font-size-label, 0.875rem);
      font-weight: var(--font-weight-medium, 500);
      cursor: pointer;
      white-space: nowrap;
      transition: all .2s ease;
    }

    button:hover {
      border-color: var(--color-primary, #E65100);
      color: var(--color-primary, #E65100);
    }

    button:focus-visible {
      outline: 3px solid var(--color-primary, #E65100);
      outline-offset: 2px;
    }

    button[aria-selected="true"] {
      background: var(--color-primary, #E65100);
      color: var(--text-inverse, #FFFFFF);
      border-color: var(--color-primary, #E65100);
    }

    button[aria-selected="true"]:hover {
      background: var(--color-primary-hover, #BF4500);
      color: var(--text-inverse, #FFFFFF);
    }

    .emoji {
      font-size: 1.1em;
      line-height: 1;
    }
  </style>

  <div class="tabs" role="tablist" part="tabs"></div>
`;var a=class extends HTMLElement{static get observedAttributes(){return[`active`]}constructor(){super(),this.attachShadow({mode:`open`}),this.shadowRoot.appendChild(i.content.cloneNode(!0)),this._tabsContainer=this.shadowRoot.querySelector(`.tabs`),this._categories=[]}setCategories(e){this._categories=e||[],this._renderTabs()}get active(){return this.getAttribute(`active`)||``}set active(e){this.setAttribute(`active`,e)}attributeChangedCallback(e,t,n){e===`active`&&t!==n&&this._updateActive()}_renderTabs(){this._tabsContainer.innerHTML=``,this._categories.forEach(e=>{let t=document.createElement(`button`);if(t.type=`button`,t.setAttribute(`role`,`tab`),t.setAttribute(`data-id`,e.id),t.setAttribute(`aria-selected`,e.id===this.active?`true`:`false`),e.emoji){let n=document.createElement(`span`);n.className=`emoji`,n.textContent=e.emoji,t.appendChild(n)}let n=document.createElement(`span`);n.textContent=e.label,t.appendChild(n),t.addEventListener(`click`,()=>this._selectCategory(e.id)),this._tabsContainer.appendChild(t)})}_updateActive(){this._tabsContainer.querySelectorAll(`button`).forEach(e=>{let t=e.getAttribute(`data-id`)===this.active;e.setAttribute(`aria-selected`,t?`true`:`false`)})}_selectCategory(e){e!==this.active&&(this.active=e,this._updateActive(),this.dispatchEvent(new CustomEvent(`category-change`,{bubbles:!0,composed:!0,detail:{id:e}})))}};customElements.define(`ui-category-tabs`,a);