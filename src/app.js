// src/app.js
import './components/organisms/ui-checkout-form.js';
import './components/atoms/ui-input.js';
import './components/molecules/ui-category-tabs.js';
import './components/molecules/ui-product-card.js';
import './components/organisms/ui-order-summary.js';
import './components/organisms/ui-drawer.js';

// ============================================================
// ESTADO DEL CARRITO (fuente única de verdad)
// ============================================================
const cart = {
  items: [],

  add(product) {
    const qty = product.quantity || 1;
    const existing = this.items.find((i) => i.id === product.id);
    if (existing) existing.qty += qty;
    else this.items.push({
      id: product.id, name: product.name, price: product.price, qty,
    });
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
  subtotal() { return this.items.reduce((s, i) => s + i.price * i.qty, 0); },
  total() { return this.subtotal() * 1.19; },

  // Repinta los dos resúmenes y el botón flotante
  _sync() {
    syncSummary(summaryDesktop);
    syncSummary(summaryDrawer);
    updateFloatingCart();
  },
};

// ============================================================
// SINCRONIZAR un resumen con el estado del carrito
// Sin eventos, sin recursión: solo renderiza lo que hay en cart.items
// ============================================================
function syncSummary(summaryEl) {
  if (!summaryEl) return;
  // 1) Limpiamos silenciosamente (no emite eventos)
  summaryEl.setItems(cart.items.map((i) => ({
    id: i.id, name: i.name, price: i.price, qty: i.qty,
  })));
}

// ============================================================
// DATOS DEL MENÚ
// ============================================================
const productos = [
  { id: 'p1', name: 'Mote de Queso', description: 'Sopa típica con ñame y queso costeño.', price: 22000, image: 'platillos/mote-de-queso.jpg', category: 'entradas' },
  { id: 'p2', name: 'Sopa de Guandú', description: 'Sopa con guandú, costilla y verduras.', price: 24000, image: 'platillos/sopa-guandu.jpg', category: 'entradas' },
  { id: 'p3', name: 'Patacones con Hogao', description: 'Patacones fritos con hogao de tomate y cebolla.', price: 12000, image: 'platillos/patacones-hogao.jpg', category: 'entradas' },
  { id: 'p4', name: 'Ceviche de Camarón', description: 'Camarones frescos con limón, ají y cilantro.', price: 28000, image: 'platillos/ceviche-camaron.jpg', category: 'entradas' },
  { id: 'p5', name: 'Cazuela de Mariscos', description: 'Tradicional cazuela con camarón, jaiba y pescado en leche de coco.', price: 38000, image: 'platillos/cazuela-mariscos.jpg', category: 'platos' },
  { id: 'p6', name: 'Mojarra Frita', description: 'Mojarra frita entera con arroz de coco y patacón.', price: 34000, image: 'platillos/mojarra-frita.jpg', category: 'platos' },
  { id: 'p7', name: 'Arroz con Coco', description: 'Acompañamiento tradicional del Caribe colombiano.', price: 9000, image: 'platillos/arroz-coco.jpg', category: 'platos' },
  { id: 'p8', name: 'Posta Negra Cartagenera', description: 'Lomo de res en salsa dulce con arroz blanco.', price: 36000, image: 'platillos/posta-negra.jpg', category: 'platos' },
  { id: 'p9', name: 'Arroz de Lisa', description: 'Arroz con lisa desmechada y especias costeñas.', price: 30000, image: 'platillos/arroz-lisa.jpg', category: 'platos' },
  { id: 'p10', name: 'Sancocho de Guandú con Carne', description: 'Sancocho tradicional con guandú y carne.', price: 32000, image: 'platillos/sancocho-guandu.jpg', category: 'platos' },
  { id: 'p11', name: 'Jugo de Corozo', description: 'Bebida natural refrescante.', price: 8000, image: 'platillos/jugo-corozo.jpg', category: 'bebidas' },
  { id: 'p12', name: 'Limonada de Coco', description: 'Limonada cremosa con leche de coco.', price: 12000, image: 'platillos/limonada-coco.jpg', category: 'bebidas' },
  { id: 'p13', name: 'Jugo de Maracuyá', description: 'Jugo natural de maracuyá.', price: 8000, image: 'platillos/jugo-maracuya.jpg', category: 'bebidas' },
  { id: 'p14', name: 'Agua de Panela con Limón', description: 'Bebida tradicional refrescante.', price: 6000, image: 'platillos/agua-panela.jpg', category: 'bebidas' },
  { id: 'p15', name: 'Enyucado', description: 'Postre de yuca, coco y anís.', price: 10000, image: 'platillos/enyucado.jpg', category: 'postres' },
  { id: 'p16', name: 'Cocadas', description: 'Dulce tradicional de coco.', price: 8000, image: 'platillos/cocadas.jpg', category: 'postres' },
];

// ============================================================
// RENDER DEL MENÚ
// ============================================================
const menuGrid = document.getElementById('menuGrid');

productos.forEach((p) => {
  const card = document.createElement('ui-product-card');
  card.setAttribute('data-id', p.id);
  card.setAttribute('data-category', p.category);
  card.setAttribute('name', p.name);
  card.setAttribute('description', p.description);
  card.setAttribute('price', p.price);
  card.setAttribute('image', p.image);
  menuGrid.appendChild(card);
});

// ============================================================
// REFERENCIAS A LOS RESÚMENES
// ============================================================
const summaryDesktop = document.getElementById('summaryDesktop');
const summaryDrawer  = document.getElementById('summaryDrawer');

// ============================================================
// LISTENERS DE EVENTOS DE LA UI
// ============================================================

// El usuario hace click en "Agregar" en una card
document.addEventListener('add-to-cart', (e) => {
  cart.add(e.detail);
});

// El usuario edita/elimina items DESDE un resumen
// (los botones −, +, ✕, Vaciar emiten este evento)
document.addEventListener('summary-change', (e) => {
  // El summary que emitió ya cambió internamente; nosotros
  // actualizamos el carrito y, con eso, los dos resúmenes se sincronizan.
  const items = e.detail.items.map((i) => ({
    id: i.id, name: i.name, price: i.price, qty: i.qty,
  }));

  // Reemplazamos el estado interno del carrito y re-sincronizamos
  cart.items = items;
  cart._sync();
});

// Confirmar pedido
// ---------- Confirmar pedido: abrir formulario ----------
const checkoutDialog = document.getElementById('checkoutDialog');
let pendingOrder = null;

document.addEventListener('order-confirmed', (e) => {
  pendingOrder = e.detail;
  checkoutDialog.showModal();
});

// ---------- Formulario enviado ----------
document.addEventListener('checkout-submit', (e) => {
  const { nombre, telefono, barrio, direccion, notas } = e.detail;

  if (!pendingOrder) return;

  const total = pendingOrder.total.toLocaleString('es-CO');
  const items = pendingOrder.items.map((i) => `• ${i.name} x${i.qty}`).join('\n');

  alert(
    `✅ Pedido confirmado\n\n` +
    `Cliente: ${nombre}\n` +
    `Teléfono: ${telefono}\n` +
    `Dirección: ${direccion}, ${barrio}\n` +
    (notas ? `Notas: ${notas}\n` : '') +
    `\n${items}\n\nTotal: $${total}`
  );

  cart.clear();
  pendingOrder = null;
  checkoutDialog.close();

  const drawer = document.getElementById('cartDrawer');
  if (drawer) drawer.close();
});

// ---------- Formulario cancelado ----------
document.addEventListener('checkout-cancel', () => {
  pendingOrder = null;
  checkoutDialog.close();
});

// ============================================================
// BOTÓN FLOTANTE
// ============================================================
const floatingCart = document.getElementById('floatingCart');
const floatingCartCount = document.getElementById('floatingCartCount');
const cartDrawer = document.getElementById('cartDrawer');

function updateFloatingCart() {
  if (!floatingCartCount || !floatingCart) return;
  const totalQty = cart.count();
  floatingCartCount.textContent = totalQty;
  floatingCart.hidden = totalQty === 0;
}

floatingCart.addEventListener('click', () => cartDrawer.show());

// ============================================================
// BUSCADOR Y FILTROS
// ============================================================
const searchInput = document.getElementById('menuSearch');
let searchQuery = '';
let currentCategory = 'all';

searchInput.addEventListener('input-change', (e) => {
  searchQuery = e.detail.value.toLowerCase().trim();
  applyFilters();
});

const categoryTabs = document.getElementById('categoryTabs');
categoryTabs.setCategories([
  { id: 'all', label: 'Todos', emoji: '🍽️' },
  { id: 'entradas', label: 'Entradas', emoji: '🥗' },
  { id: 'platos', label: 'Platos fuertes', emoji: '🍲' },
  { id: 'bebidas', label: 'Bebidas', emoji: '🥤' },
  { id: 'postres', label: 'Postres', emoji: '🍰' },
]);

categoryTabs.addEventListener('category-change', (e) => {
  currentCategory = e.detail.id;
  applyFilters();
});

function applyFilters() {
  const cards = menuGrid.querySelectorAll('ui-product-card');
  cards.forEach((card) => {
    const name = (card.getAttribute('name') || '').toLowerCase();
    const desc = (card.getAttribute('description') || '').toLowerCase();
    const cat  = card.getAttribute('data-category') || 'all';
    const matchesSearch = !searchQuery || name.includes(searchQuery) || desc.includes(searchQuery);
    const matchesCategory = currentCategory === 'all' || cat === currentCategory;
    card.style.display = matchesSearch && matchesCategory ? '' : 'none';
  });
}

// ============================================================
// MODO OSCURO
// ============================================================
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
  const html = document.documentElement;
  const isDark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  themeToggle.textContent = isDark ? '🌙 Modo oscuro' : '☀️ Modo claro';
});

// ============================================================
// ESTADO INICIAL
// ============================================================
updateFloatingCart();

// ---------- Título responsive ----------
const appTitle = document.getElementById('appTitle');

function updateTitle() {
  if (!appTitle) return;
  if (window.innerWidth <= 900) {
    appTitle.textContent = '🍽️ La Bonga';
  } else {
    appTitle.textContent = '🍽️ La Bonga del Sinú';
  }
}

updateTitle();
window.addEventListener('resize', updateTitle);