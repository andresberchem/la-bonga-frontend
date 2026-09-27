// src/components/atoms/ui-swipeable.js

const swipeableTemplate = document.createElement('template');
swipeableTemplate.innerHTML = `
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
`;

class UiSwipeable extends HTMLElement {
  static get observedAttributes() {
    return ['threshold', 'right-action', 'left-action'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(swipeableTemplate.content.cloneNode(true));

    this._container = this.shadowRoot.querySelector('.swipe-container');
    this._content = this.shadowRoot.querySelector('.content');
    this._bgRight = this.shadowRoot.querySelector('.bg-right');
    this._bgLeft = this.shadowRoot.querySelector('.bg-left');

    // Estado del gesto
    this._startX = 0;
    this._startY = 0;
    this._currentX = 0;
    this._currentY = 0;
    this._isDragging = false;
    this._isHorizontal = null; // null = aún no decidido, true = horizontal, false = vertical
  }

  connectedCallback() {
    this.addEventListener('touchstart', this._onTouchStart.bind(this), { passive: true });
    this.addEventListener('touchmove', this._onTouchMove.bind(this), { passive: false });
    this.addEventListener('touchend', this._onTouchEnd.bind(this));
    this.addEventListener('touchcancel', this._onTouchEnd.bind(this));

    // Soporte para mouse (útil para probar en PC)
    this.addEventListener('mousedown', this._onMouseDown.bind(this));
  }

  get threshold() {
    return Number(this.getAttribute('threshold')) || 80;
  }
  get rightAction() {
    return this.getAttribute('right-action') || 'add';
  }
  get leftAction() {
    return this.getAttribute('left-action') || 'info';
  }

  // ============================================================
  // TOUCH EVENTS
  // ============================================================
  _onTouchStart(e) {
    const touch = e.touches[0];
    this._startX = touch.clientX;
    this._startY = touch.clientY;
    this._currentX = 0;
    this._currentY = 0;
    this._isDragging = true;
    this._isHorizontal = null;
    this.setAttribute('dragging', '');
  }

  _onTouchMove(e) {
    if (!this._isDragging) return;

    const touch = e.touches[0];
    const deltaX = touch.clientX - this._startX;
    const deltaY = touch.clientY - this._startY;

    // Decidir dirección en el primer move
    if (this._isHorizontal === null) {
      if (Math.abs(deltaX) > 10 || Math.abs(deltaY) > 10) {
        this._isHorizontal = Math.abs(deltaX) > Math.abs(deltaY);
      }
    }

    // Si el gesto es vertical, no lo bloqueamos (dejar hacer scroll)
    if (this._isHorizontal === false) return;

    // Gesto horizontal: prevenimos scroll y aplicamos transform
    e.preventDefault();

    // Limitar a un máximo de threshold * 1.5
    const max = this.threshold * 1.5;
    const clampedX = Math.max(-max, Math.min(max, deltaX));
    this._currentX = clampedX;

    this._content.style.transform = `translateX(${clampedX}px)`;

    // Mostrar los fondos según dirección
    if (clampedX > 0) {
      this._bgRight.style.opacity = Math.min(1, clampedX / this.threshold);
      this._bgLeft.style.opacity = 0;
    } else if (clampedX < 0) {
      this._bgLeft.style.opacity = Math.min(1, Math.abs(clampedX) / this.threshold);
      this._bgRight.style.opacity = 0;
    } else {
      this._bgRight.style.opacity = 0;
      this._bgLeft.style.opacity = 0;
    }
  }

  _onTouchEnd() {
    if (!this._isDragging) return;
    this._isDragging = false;
    this.removeAttribute('dragging');

    const delta = this._currentX;
    const abs = Math.abs(delta);

    // Resetear transformación (con animación)
    this._content.style.transform = 'translateX(0)';
    this._bgRight.style.opacity = 0;
    this._bgLeft.style.opacity = 0;

    // Si superó el threshold, emitir evento
    if (abs >= this.threshold) {
      if (delta > 0) {
        // Swipe derecha
        this.dispatchEvent(new CustomEvent('swipe-right', {
          bubbles: true,
          composed: true,
          detail: { action: this.rightAction, distance: delta },
        }));
        if (navigator.vibrate) navigator.vibrate(30);
      } else {
        // Swipe izquierda
        this.dispatchEvent(new CustomEvent('swipe-left', {
          bubbles: true,
          composed: true,
          detail: { action: this.leftAction, distance: delta },
        }));
        if (navigator.vibrate) navigator.vibrate(30);
      }
    }

    this._currentX = 0;
    this._isHorizontal = null;
  }

  // ============================================================
  // MOUSE EVENTS (para probar en PC)
  // ============================================================
  _onMouseDown(e) {
    const startX = e.clientX;
    const startY = e.clientY;
    let moved = false;

    const onMove = (ev) => {
      const dx = ev.clientX - startX;
      const dy = ev.clientY - startY;
      if (!moved && (Math.abs(dx) > 10 || Math.abs(dy) > 10)) {
        moved = true;
        this.setAttribute('dragging', '');
        this._isHorizontal = Math.abs(dx) > Math.abs(dy);
      }
      if (!moved || this._isHorizontal === false) return;

      const max = this.threshold * 1.5;
      const clamped = Math.max(-max, Math.min(max, dx));
      this._content.style.transform = `translateX(${clamped}px)`;
      if (clamped > 0) {
        this._bgRight.style.opacity = Math.min(1, clamped / this.threshold);
        this._bgLeft.style.opacity = 0;
      } else if (clamped < 0) {
        this._bgLeft.style.opacity = Math.min(1, Math.abs(clamped) / this.threshold);
        this._bgRight.style.opacity = 0;
      }
    };

    const onUp = (ev) => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);

      if (!moved) return;

      const dx = ev.clientX - startX;
      this._content.style.transform = 'translateX(0)';
      this._bgRight.style.opacity = 0;
      this._bgLeft.style.opacity = 0;
      this.removeAttribute('dragging');

      if (Math.abs(dx) >= this.threshold) {
        if (dx > 0) {
          this.dispatchEvent(new CustomEvent('swipe-right', {
            bubbles: true, composed: true,
            detail: { action: this.rightAction, distance: dx },
          }));
        } else {
          this.dispatchEvent(new CustomEvent('swipe-left', {
            bubbles: true, composed: true,
            detail: { action: this.leftAction, distance: dx },
          }));
        }
      }
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  }
}

customElements.define('ui-swipeable', UiSwipeable);