// src/components/organisms/ui-checkout-form.stories.js
import './ui-checkout-form.js';

export default {
  title: 'Organisms/ui-checkout-form',
  component: 'ui-checkout-form',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Formulario de datos de entrega a domicilio. Valida nombre, teléfono, barrio y dirección. Emite `checkout-submit` con los datos.',
      },
    },
  },
};

export const Default = {
  render: () => `
    <div style="max-width: 480px;padding:16px;">
      <ui-checkout-form id="form"></ui-checkout-form>
      <p id="log" style="font-family:monospace;font-size:12px;color:#888;margin-top:12px;">Esperando envío...</p>
    </div>
  `,
};