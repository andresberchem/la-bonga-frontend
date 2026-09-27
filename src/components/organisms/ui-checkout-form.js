// src/components/organisms/ui-checkout-form.js

import '../atoms/ui-input.js';
import '../atoms/ui-button.js';

const checkoutTemplate = document.createElement('template');
checkoutTemplate.innerHTML = `
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
`;

class UiCheckoutForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(checkoutTemplate.content.cloneNode(true));

    this._nombre    = this.shadowRoot.querySelector('#nombre');
    this._telefono  = this.shadowRoot.querySelector('#telefono');
    this._barrio    = this.shadowRoot.querySelector('#barrio');
    this._direccion = this.shadowRoot.querySelector('#direccion');
    this._notas     = this.shadowRoot.querySelector('#notas');

    this._errNombre    = this.shadowRoot.querySelector('#errNombre');
    this._errTelefono  = this.shadowRoot.querySelector('#errTelefono');
    this._errBarrio    = this.shadowRoot.querySelector('#errBarrio');
    this._errDireccion = this.shadowRoot.querySelector('#errDireccion');

    this._btnEnviar   = this.shadowRoot.querySelector('#btnEnviar');
    this._btnCancelar = this.shadowRoot.querySelector('#btnCancelar');
  }

  connectedCallback() {
    this._btnEnviar.addEventListener('btn-click', () => this._submit());
    this._btnCancelar.addEventListener('btn-click', () => this._cancel());
  }

  _submit() {
    const nombre    = this._nombre.value.trim();
    const telefono  = this._telefono.value.replace(/\D/g, '');
    const barrio    = this._barrio.value.trim();
    const direccion = this._direccion.value.trim();
    const notas     = this._notas.value.trim();

    let valid = true;

    // Validar nombre
    if (!nombre) {
      this._errNombre.classList.add('visible');
      this._nombre.setAttribute('error', '');
      valid = false;
    } else {
      this._errNombre.classList.remove('visible');
      this._nombre.removeAttribute('error');
    }

    // Validar teléfono (mín. 7 dígitos)
    if (telefono.length < 7) {
      this._errTelefono.classList.add('visible');
      this._telefono.setAttribute('error', '');
      valid = false;
    } else {
      this._errTelefono.classList.remove('visible');
      this._telefono.removeAttribute('error');
    }

    // Validar barrio
    if (!barrio) {
      this._errBarrio.classList.add('visible');
      this._barrio.setAttribute('error', '');
      valid = false;
    } else {
      this._errBarrio.classList.remove('visible');
      this._barrio.removeAttribute('error');
    }

    // Validar dirección
    if (!direccion) {
      this._errDireccion.classList.add('visible');
      this._direccion.setAttribute('error', '');
      valid = false;
    } else {
      this._errDireccion.classList.remove('visible');
      this._direccion.removeAttribute('error');
    }

    if (!valid) return;

    this.dispatchEvent(new CustomEvent('checkout-submit', {
      bubbles: true,
      composed: true,
      detail: { nombre, telefono, barrio, direccion, notas },
    }));
  }

  _cancel() {
    this.dispatchEvent(new CustomEvent('checkout-cancel', {
      bubbles: true,
      composed: true,
    }));
  }
}

customElements.define('ui-checkout-form', UiCheckoutForm);