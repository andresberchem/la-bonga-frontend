// src/pos.js

import './components/atoms/ui-input.js';
import './components/molecules/ui-category-tabs.js';
import './components/organisms/ui-pos-table.js';

// ============================================================
// DATOS DEL MENÚ (los mismos 16 platos del menú web)
// ============================================================
const productos = [
  { id: 'p1', name: 'Mote de Queso', price: 22000, category: 'entradas' },
  { id: 'p2', name: 'Sopa de Guandú', price: 24000, category: 'entradas' },
  { id: 'p3', name: 'Patacones con Hogao', price: 12000, category: 'entradas' },
  { id: 'p4', name: 'Ceviche de Camarón', price: 28000, category: 'entradas' },
  { id: 'p5', name: 'Cazuela de Mariscos', price: 38000, category: 'platos' },
  { id: 'p6', name: 'Mojarra Frita', price: 34000, category: 'platos' },
  { id: 'p7', name: 'Arroz con Coco', price: 9000, category: 'platos' },
  { id: 'p8', name: 'Posta Negra Cartagenera', price: 36000, category: 'platos' },
  { id: 'p9', name: 'Arroz de Lisa', price: 30000, category: 'platos' },
  { id: 'p10', name: 'Sancocho de Guandú con Carne', price: 32000, category: 'platos' },
  { id: 'p11', name: 'Jugo de Corozo', price: 8000, category: 'bebidas' },
  { id: 'p12', name: 'Limonada de Coco', price: 12000, category: 'bebidas' },
  { id: 'p13', name: 'Jugo de Maracuyá', price: 8000, category: 'bebidas' },
  { id: 'p14', name: 'Agua de Panela con Limón', price: 6000, category: 'bebidas' },
  { id: 'p15', name: 'Enyucado', price: 10000, category: 'postres' },
  { id: 'p16', name: 'Cocadas', price: 8000, category: 'postres' },
];

const fmt = (n) => `$${n.toLocaleString('es-CO')}`;

// ============================================================
// REFERENCIAS
// ============================================================
const catalog = document.getElementById('posCatalog');
const search = document.getElementById('posSearch');
const tabs = document.getElementById('posTabs');
const table = document.getElementById('posTable');

// ============================================================
// RENDER DEL CATÁLOGO
// ============================================================
function renderCatalog(items) {
  catalog.innerHTML = '';

  items.forEach((p) => {
    const btn = document.createElement('button');
    btn.className = 'pos-item';
    btn.setAttribute('data-id', p.id);
    btn.setAttribute('data-category', p.category);
    btn.innerHTML = `
      <div class="pos-item__info">
        <p class="pos-item__name">${p.name}</p>
        <span class="pos-item__price">${fmt(p.price)}</span>
      </div>
      <span class="pos-item__add" aria-hidden="true">+</span>
    `;

    btn.addEventListener('click', () => {
      table.addItem({ id: p.id, name: p.name, price: p.price, quantity: 1 });
    });

    catalog.appendChild(btn);
  });
}

// Render inicial
renderCatalog(productos);

// ============================================================
// FILTROS: búsqueda + categoría
// ============================================================
let currentQuery = '';
let currentCategory = 'all';

function applyFilters() {
  const items = productos.filter((p) => {
    const matchesSearch = !currentQuery
      || p.name.toLowerCase().includes(currentQuery);
    const matchesCategory = currentCategory === 'all'
      || p.category === currentCategory;
    return matchesSearch && matchesCategory;
  });
  renderCatalog(items);
}

search.addEventListener('input-change', (e) => {
  currentQuery = e.detail.value.toLowerCase().trim();
  applyFilters();
});

tabs.setCategories([
  { id: 'all', label: 'Todos', emoji: '🍽️' },
  { id: 'entradas', label: 'Entradas', emoji: '🥗' },
  { id: 'platos', label: 'Platos', emoji: '🍲' },
  { id: 'bebidas', label: 'Bebidas', emoji: '🥤' },
  { id: 'postres', label: 'Postres', emoji: '🍰' },
]);

tabs.addEventListener('category-change', (e) => {
  currentCategory = e.detail.id;
  applyFilters();
});

// ============================================================
// EVENTOS DE LA TABLA
// ============================================================
table.addEventListener('pos-pay', (e) => {
  const total = e.detail.total.toLocaleString('es-CO');
  const count = e.detail.items.length;
  alert(`✅ Pago registrado\n\n${count} productos\nTotal: $${total}`);
  table.clear();
});

table.addEventListener('pos-clear', () => {
  // opcional: confirmación
});

// ============================================================
// BOTÓN CERRAR CAJA
// ============================================================
document.getElementById('btnCerrar').addEventListener('click', () => {
  if (confirm('¿Cerrar la caja del día?')) {
    alert('Caja cerrada. ¡Buen trabajo!');
  }
});
// ============================================================
// ATAJOS DE TECLADO PARA CAJEROS
// ============================================================
document.addEventListener('keydown', (e) => {
  // F1: enfocar buscador
  if (e.key === 'F1') {
    e.preventDefault();
    search.focus();
    return;
  }

  // F2: mostrar ayuda de atajos
  if (e.key === 'F2') {
    e.preventDefault();
    mostrarAyuda();
    return;
  }

  // F3: cobrar
  if (e.key === 'F3') {
    e.preventDefault();
    if (table) table.cobrar();
    return;
  }

  // F4: limpiar pedido
  if (e.key === 'F4') {
    e.preventDefault();
    if (table && confirm('¿Limpiar el pedido actual?')) table.clear();
    return;
  }

  // Esc: limpiar búsqueda o cerrar diálogos
  if (e.key === 'Escape') {
    const activo = document.activeElement;
    if (activo === search.shadowRoot?.querySelector('input')) {
      search.value = '';
      search.dispatchEvent(new CustomEvent('input-change', {
        bubbles: true, composed: true, detail: { value: '' }
      }));
      search.blur();
    }
    return;
  }

  // Ctrl + número: cantidad rápida
  if (e.ctrlKey && e.key >= '1' && e.key <= '9') {
    e.preventDefault();
    const qty = parseInt(e.key, 10);
    if (table) table.setLastQty(qty);
    return;
  }
});

// ============================================================
// MODAL DE AYUDA DE ATAJOS
// ============================================================
function mostrarAyuda() {
  const ayuda = `
╔══════════════════════════════════════╗
║   ATAJOS DE TECLADO — POS LA BONGA   ║
╠══════════════════════════════════════╣
║  F1   → Enfocar buscador             ║
║  F2   → Ver esta ayuda               ║
║  F3   → Cobrar el pedido             ║
║  F4   → Limpiar el pedido            ║
║  Esc  → Limpiar búsqueda             ║
║  Ctrl + 1-9 → Cantidad rápida        ║
║                                       ║
║  (también puedes hacer click en       ║
║   cualquier producto para agregarlo)  ║
╚══════════════════════════════════════╝
  `;
  alert(ayuda);
}