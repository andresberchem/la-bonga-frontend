// src/components/organisms/ui-order-summary.stories.js
import './ui-order-summary.js';

export default {
  title: 'Organisms/ui-order-summary',
  component: 'ui-order-summary',
  tags: ['autodocs'],
};

export const Empty = {
  render: () => `
    <div style="max-width: 420px;">
      <ui-order-summary></ui-order-summary>
    </div>
  `,
};

export const WithItems = {
  render: () => {
    const html = `
      <div style="max-width: 420px;">
        <ui-order-summary id="summaryWithItems"></ui-order-summary>
      </div>
    `;

    queueMicrotask(() => {
      const summary = document.getElementById('summaryWithItems');
      if (!summary) return;
      summary.addItem({ id: 'p5', name: 'Cazuela de Mariscos', price: 38000, quantity: 2 });
      summary.addItem({ id: 'p1', name: 'Mote de Queso', price: 22000, quantity: 1 });
      summary.addItem({ id: 'p11', name: 'Jugo de Corozo', price: 8000, quantity: 3 });
    });

    return html;
  },
};