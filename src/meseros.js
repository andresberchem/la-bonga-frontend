// src/meseros.js
import './components/atoms/ui-input.js';
import './components/atoms/ui-swipeable.js';
import './components/molecules/ui-category-tabs.js';
import './components/organisms/ui-order-summary.js';
import './components/organisms/ui-drawer.js';

// ============================================================
// DATOS DEL MENÚ
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
// ESTADO DEL CARRITO
// ============================================================
const cart = {
  items: [],
  add(product) {
    const existing = this.items.find((i) => i.id === product.id);
    if (existing) existing.qty += 1;
    else this.items.push({ id: product.id, name: product.name, price: product.price, qty: 1 });
    this._sync();
  },
  remove(id) {
    this.items = this.items.filter((i) => i.id !== id);
    this._sync();
  },
  updateQty(id, delta) {
    const item = this.items.find((i) => i.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) return this.remove(id);
    this._sync();
  },
  clear() {
    this.items = [];
    this._sync();
  },
  count() { return this.items.reduce((s, i) => s + i.qty, 0); },
  total() {
    const sub = this.items.reduce((s, i) => s + i.price * i.qty, 0);
    return sub * 1.19;
  },
  _sync() {
    syncSummary(mesaSummary);
    syncSummary(drawerSummaryM);
    updateFloatingCart();
  },
};

function syncSummary(el) {
  if (!el) return;
  el.setItems(cart.items.map((i) => ({ id: i.id, name: i.name, price: i.price, qty: i.qty })));
}

// ============================================================
// REFERENCIAS
// ============================================================
const catalog = document.getElementById('meseroCatalog');
const search = document.getElementById('meseroSearch');
const tabs = document.getElementById('meseroTabs');
const mesaSummary = document.getElementById('mesaSummary');
const drawerSummaryM = document.getElementById('drawerSummaryM');
const floatingCartM = document.getElementById('floatingCartM');
const floatingCartCountM = document.getElementById('floatingCartCountM');
const cartDrawerM = document.getElementById('cartDrawerM');
const mesaCount = document.getElementById('mesaCount');

// ============================================================
// RENDER DEL CATÁLOGO
// ============================================================
// ============================================================
// RENDER DEL CATÁLOGO (con swipe)
// ============================================================
function renderCatalog(items) {
  catalog.innerHTML = '';

  if (!items.length) {
    const empty = document.createElement('p');
    empty.style.cssText = 'color:#888;text-align:center;padding:24px;';
    empty.textContent = 'No se encontraron platillos.';
    catalog.appendChild(empty);
    return;
  }

  items.forEach((p) => {
    // Envolvemos el item en un swipeable
    const wrapper = document.createElement('ui-swipeable');
    wrapper.setAttribute('threshold', '80');

    const btn = document.createElement('button');
    btn.className = 'mesa-item';
    btn.setAttribute('data-id', p.id);
    btn.innerHTML = `
      <div class="mesa-item__info">
        <p class="mesa-item__name">${p.name}</p>
        <span class="mesa-item__price">${fmt(p.price)}</span>
      </div>
      <span class="mesa-item__add" aria-hidden="true">+</span>
    `;

    // Tap: agregar
    btn.addEventListener('click', () => {
      cart.add({ id: p.id, name: p.name, price: p.price });
      btn.style.borderColor = '#2E7D32';
      setTimeout(() => { btn.style.borderColor = ''; }, 250);
    });

    // Swipe derecha: agregar rápido
    wrapper.addEventListener('swipe-right', () => {
      cart.add({ id: p.id, name: p.name, price: p.price });
      btn.style.borderColor = '#2E7D32';
      setTimeout(() => { btn.style.borderColor = ''; }, 250);
    });

    // Swipe izquierda: mostrar info del plato
    wrapper.addEventListener('swipe-left', () => {
      alert(`ℹ️ ${p.name}\n\nPrecio: ${fmt(p.price)}\nCategoría: ${p.category}`);
    });

    wrapper.appendChild(btn);
    catalog.appendChild(wrapper);
  });
}

renderCatalog(productos);

// ============================================================
// FILTROS
// ============================================================
let currentQuery = '';
let currentCategory = 'all';

function applyFilters() {
  const items = productos.filter((p) => {
    const matchesSearch = !currentQuery || p.name.toLowerCase().includes(currentQuery);
    const matchesCategory = currentCategory === 'all' || p.category === currentCategory;
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
// SINCRONIZAR EDICIÓN DESDE EL RESUMEN
// ============================================================
document.addEventListener('summary-change', (e) => {
  const items = e.detail.items.map((i) => ({ id: i.id, name: i.name, price: i.price, qty: i.qty }));
  cart.items = items;
  cart._sync();
});

// ============================================================
// BOTÓN FLOTANTE + DRAWER
// ============================================================
function updateFloatingCart() {
  if (!floatingCartM || !floatingCartCountM) return;
  const totalQty = cart.count();
  floatingCartCountM.textContent = totalQty;
  floatingCartM.hidden = totalQty === 0;
  if (mesaCount) mesaCount.textContent = `${totalQty} ${totalQty === 1 ? 'item' : 'items'}`;
}

floatingCartM.addEventListener('click', () => cartDrawerM.show());

// ============================================================
// CONFIRMAR PEDIDO (enviar a cocina)
// ============================================================
document.addEventListener('order-confirmed', (e) => {
  const total = e.detail.total.toLocaleString('es-CO');
  const items = e.detail.items.map((i) => `• ${i.name} x${i.qty}`).join('\n');
  alert(`✅ Pedido enviado a cocina\n\n${items}\n\nTotal: $${total}`);
  cart.clear();
  cartDrawerM.close();
});

// ============================================================
// SELECTOR DE MESA (solo UI por ahora)
// ============================================================
let currentMesa = 3;
document.getElementById('btnMesa').addEventListener('click', () => {
  const nueva = prompt('Número de mesa (1-12):', currentMesa);
  const num = parseInt(nueva, 10);
  if (num >= 1 && num <= 12) {
    currentMesa = num;
    document.getElementById('btnMesa').textContent = `Mesa ${num} ▾`;
    document.getElementById('mesaTitle').textContent = `Mesa ${num}`;
    document.querySelector('#cartDrawerM [slot="title"]').textContent = `Mesa ${num}`;
    cart.clear(); // Cambiar de mesa vacía el carrito actual
  }
});

// ============================================================
// MODO CLARO/OSCURO
// ============================================================
document.getElementById('btnTheme').addEventListener('click', () => {
  const html = document.documentElement;
  const isDark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  document.getElementById('btnTheme').textContent = isDark ? '🌙' : '☀️';
});

// ============================================================
// ESTADO INICIAL
// ============================================================
updateFloatingCart();