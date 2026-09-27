// src/components/organisms/ui-drawer.js

import '../atoms/ui-button.js';

const drawerTemplate = document.createElement('template');
drawerTemplate.innerHTML = `
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
`;

class UiDrawer extends HTMLElement {
  static get observedAttributes() {
    return ['open'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(drawerTemplate.content.cloneNode(true));

    this._drawer = this.shadowRoot.querySelector('.drawer');
    this._backdrop = this.shadowRoot.querySelector('.backdrop');
    this._closeBtn = this.shadowRoot.querySelector('.close-btn');
    this._handleArea = this.shadowRoot.querySelector('.handle-area');

    // Estado del drag
    this._dragStartY = 0;
    this._dragCurrentY = 0;
    this._isDragging = false;
  }

  connectedCallback() {
    this._backdrop.addEventListener('click', () => this.close());
    this._closeBtn.addEventListener('click', () => this.close());

    // Cerrar con Escape
    this._onKeyDown = (e) => {
      if (e.key === 'Escape' && this.open) this.close();
    };
    document.addEventListener('keydown', this._onKeyDown);

    // ---- Gestos de swipe (touch + pointer) ----
    this._handleArea.addEventListener('pointerdown', (e) => this._dragStart(e));
    document.addEventListener('pointermove', this._dragMove.bind(this));
    document.addEventListener('pointerup', this._dragEnd.bind(this));
  }

  disconnectedCallback() {
    document.removeEventListener('keydown', this._onKeyDown);
  }

  get open() {
    return this.hasAttribute('open');
  }
  set open(value) {
    if (value) this.setAttribute('open', '');
    else this.removeAttribute('open');
  }

  show() {
    this.open = true;
    this.dispatchEvent(new CustomEvent('drawer-open', {
      bubbles: true, composed: true,
    }));
  }

  close() {
    this.open = false;
    this._resetDrag();
    this.dispatchEvent(new CustomEvent('drawer-close', {
      bubbles: true, composed: true,
    }));
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'open' && oldValue !== newValue) {
      // Bloquea el scroll del body cuando está abierto
      document.body.style.overflow = this.open ? 'hidden' : '';
    }
  }

  // ---- Drag handlers ----
  _dragStart(e) {
    this._isDragging = true;
    this._dragStartY = e.clientY;
    this._dragCurrentY = 0;
    this._drawer.style.transition = 'none';
  }

  _dragMove(e) {
    if (!this._isDragging) return;
    const delta = e.clientY - this._dragStartY;
    if (delta < 0) return; // solo hacia abajo
    this._dragCurrentY = delta;
    this._drawer.style.transform = `translateY(${delta}px)`;
  }

  _dragEnd() {
    if (!this._isDragging) return;
    this._isDragging = false;
    this._drawer.style.transition = '';
    this._drawer.style.transform = '';

    // Si arrastró más de 100px hacia abajo, cierra
    if (this._dragCurrentY > 100) {
      this.close();
    }

    this._dragCurrentY = 0;
  }

  _resetDrag() {
    this._isDragging = false;
    this._dragCurrentY = 0;
    if (this._drawer) {
      this._drawer.style.transition = '';
      this._drawer.style.transform = '';
    }
  }
}

customElements.define('ui-drawer', UiDrawer);