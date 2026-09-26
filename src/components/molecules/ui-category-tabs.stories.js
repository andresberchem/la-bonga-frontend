// src/components/molecules/ui-category-tabs.stories.js
import './ui-category-tabs.js';

export default {
  title: 'Molecules/ui-category-tabs',
  component: 'ui-category-tabs',
  tags: ['autodocs'],
};

const CATEGORIES = [
  { id: 'all', label: 'Todos', emoji: '🍽️' },
  { id: 'entradas', label: 'Entradas', emoji: '🥗' },
  { id: 'platos', label: 'Platos fuertes', emoji: '🍲' },
  { id: 'bebidas', label: 'Bebidas', emoji: '🥤' },
  { id: 'postres', label: 'Postres', emoji: '🍰' },
];

const renderWithCategories = (active) => {
  const html = `
    <div style="max-width: 720px;">
      <ui-category-tabs id="tabs" active="${active}"></ui-category-tabs>
    </div>
  `;

  queueMicrotask(() => {
    const tabs = document.getElementById('tabs');
    if (tabs) tabs.setCategories(CATEGORIES);
  });

  return html;
};

export const Default = {
  render: () => renderWithCategories('all'),
};

export const PlatosActive = {
  render: () => renderWithCategories('platos'),
};

export const BebidasActive = {
  render: () => renderWithCategories('bebidas'),
};
