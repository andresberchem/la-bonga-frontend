// src/components/organisms/ui-drawer.stories.js
import './ui-drawer.js';
import '../atoms/ui-button.js';

export default {
  title: 'Organisms/ui-drawer',
  component: 'ui-drawer',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

const openDrawer = (id) => {
  queueMicrotask(() => {
    const drawer = document.getElementById(id);
    if (drawer) drawer.show();
  });
};

export const Closed = {
  render: () => {
    const html = `
      <div style="padding:24px;">
        <p>El drawer está cerrado. Abajo hay un botón para abrirlo.</p>
        <ui-button variant="primary" id="openBtn">Abrir drawer</ui-button>
        <ui-drawer id="drawer1">
          <span slot="title">Resumen del Pedido</span>
          <p>Aquí va el contenido del drawer.</p>
        </ui-drawer>
      </div>
    `;
    queueMicrotask(() => {
      const btn = document.getElementById('openBtn');
      const drawer = document.getElementById('drawer1');
      if (btn && drawer) btn.addEventListener('btn-click', () => drawer.show());
    });
    return html;
  },
};

export const Open = {
  render: () => {
    const html = `
      <div style="padding:24px;">
        <p>Drawer abierto. Haz click fuera o presiona Esc para cerrarlo.</p>
        <ui-drawer id="drawer2">
          <span slot="title">Resumen del Pedido</span>
          <h3>Cazuela de Mariscos</h3>
          <p>x2 — $76.000</p>
          <hr>
          <p><strong>Total: $90.440</strong></p>
        </ui-drawer>
      </div>
    `;
    openDrawer('drawer2');
    return html;
  },
};

export const WithOrderSummary = {
  render: () => {
    const html = `
      <div style="padding:24px;">
        <ui-button variant="primary" id="openCartBtn">Ver pedido</ui-button>
        <ui-drawer id="drawer3">
          <span slot="title">Tu pedido</span>
          <ui-order-summary id="drawerSummary"></ui-order-summary>
        </ui-drawer>
      </div>
    `;
    queueMicrotask(async () => {
      await import('./ui-order-summary.js');

      const btn = document.getElementById('openCartBtn');
      const drawer = document.getElementById('drawer3');
      const summary = document.getElementById('drawerSummary');

      if (summary) {
        summary.addItem({ id: 'p5', name: 'Cazuela de Mariscos', price: 38000, quantity: 2 });
        summary.addItem({ id: 'p11', name: 'Jugo de Corozo', price: 8000, quantity: 3 });
      }

      if (btn && drawer) btn.addEventListener('btn-click', () => drawer.show());
    });
    return html;
  },
};