// src/components/organisms/ui-pos-table.stories.js
import './ui-pos-table.js';

export default {
  title: 'Organisms/ui-pos-table',
  component: 'ui-pos-table',
  tags: ['autodocs'],
};

export const Empty = {
  render: () => `
    <div style="max-width: 780px;">
      <ui-pos-table></ui-pos-table>
    </div>
  `,
};

export const WithItems = {
  render: () => {
    const html = `
      <div style="max-width: 780px;">
        <ui-pos-table id="posTable"></ui-pos-table>
      </div>
    `;

    queueMicrotask(() => {
      const table = document.getElementById('posTable');
      if (!table) return;
      table.addItem({ id: 'p5', name: 'Cazuela de Mariscos', price: 38000, quantity: 2 });
      table.addItem({ id: 'p1', name: 'Mote de Queso', price: 22000, quantity: 1 });
      table.addItem({ id: 'p11', name: 'Jugo de Corozo', price: 8000, quantity: 3 });
      table.addItem({ id: 'p15', name: 'Enyucado', price: 10000, quantity: 2 });
    });

    return html;
  },
};