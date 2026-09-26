// src/app.js

// Importamos los componentes que usa esta página
import './components/molecules/ui-product-card.js';
import './components/organisms/ui-order-summary.js';
import './components/molecules/ui-category-tabs.js';

// ---------- Datos del menú ----------
const productos = [
  {
    id: 'p1',
    name: 'Cazuela de Mariscos',
    description: 'Tradicional cazuela con camarón, jaiba y pescado en leche de coco.',
    price: 38000,
    image: 'https://placehold.co/600x400/E65100/FFFFFF?text=La+Bonga',
    category: 'platos',
  },
  {
    id: 'p2',
    name: 'Mote de Queso',
    description: 'Sopa típica con ñame y queso costeño.',
    price: 22000,
    image: 'https://placehold.co/600x400/2E7D32/FFFFFF?text=Mote',
    category: 'entradas',
  },
  {
    id: 'p3',
    name: 'Arroz con Coco',
    description: 'Acompañamiento tradicional del Caribe colombiano.',
    price: 9000,
    image: 'https://placehold.co/600x400/F9A825/212121?text=Arroz',
    category: 'platos',
  },
  {
    id: 'p4',
    name: 'Jugo de Corozo',
    description: 'Bebida natural refrescante.',
    price: 8000,
    image: 'https://placehold.co/600x400/C62828/FFFFFF?text=Corozo',
    category: 'bebidas',
  },
];
// ---------- Render del menú ----------
const menuGrid = document.getElementById('menuGrid');

productos.forEach((p) => {
  const card = document.createElement('ui-product-card');
  card.setAttribute('data-id', p.id);
  card.setAttribute('data-category', p.category);  // ← NUEVO
  card.setAttribute('name', p.name);
  card.setAttribute('description', p.description);
  card.setAttribute('price', p.price);
  card.setAttribute('image', p.image);
  menuGrid.appendChild(card);
});
// ---------- Buscador de menú ----------
const searchInput = document.getElementById('menuSearch');

searchInput.addEventListener('input-change', (e) => {
  const query = e.detail.value.toLowerCase().trim();
  const cards = menuGrid.querySelectorAll('ui-product-card');

  cards.forEach((card) => {
    const name = (card.getAttribute('name') || '').toLowerCase();
    const desc = (card.getAttribute('description') || '').toLowerCase();
    const match = name.includes(query) || desc.includes(query);
    card.style.display = match ? '' : 'none';
  });
});

// ---------- Conectar add-to-cart con el resumen ----------
const summary = document.getElementById('summary');

document.addEventListener('add-to-cart', (e) => {
  summary.addItem(e.detail);
});

// ---------- Manejar confirmación de pedido ----------
document.addEventListener('order-confirmed', (e) => {
  const total = e.detail.total.toLocaleString('es-CO');
  const items = e.detail.items
    .map((i) => `• ${i.name} x${i.qty}`)
    .join('\n');

  alert(`✅ Pedido confirmado\n\n${items}\n\nTotal: $${total}`);

  summary.clear();
});

// ---------- Toggle de modo oscuro ----------
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
  const html = document.documentElement;
  const isDark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  themeToggle.textContent = isDark ? '🌙 Modo oscuro' : '☀️ Modo claro';
});
import './components/atoms/ui-input.js';
// ---------- Filtro por categoría ----------
const categoryTabs = document.getElementById('categoryTabs');

categoryTabs.setCategories([
  { id: 'all', label: 'Todos', emoji: '🍽️' },
  { id: 'entradas', label: 'Entradas', emoji: '🥗' },
  { id: 'platos', label: 'Platos fuertes', emoji: '🍲' },
  { id: 'bebidas', label: 'Bebidas', emoji: '🥤' },
]);

categoryTabs.addEventListener('category-change', (e) => {
  filterMenu(e.detail.id);
});

function filterMenu(categoryId) {
  const cards = menuGrid.querySelectorAll('ui-product-card');

  cards.forEach((card) => {
    const cardCategory = card.getAttribute('data-category') || 'all';
    const match = categoryId === 'all' || cardCategory === categoryId;
    card.style.display = match ? '' : 'none';
  });
}