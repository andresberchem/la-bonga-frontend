// src/app.js

// ---- Imports de componentes ----
import './components/atoms/ui-input.js';
import './components/molecules/ui-category-tabs.js';
import './components/molecules/ui-product-card.js';
import './components/organisms/ui-order-summary.js';
import './components/organisms/ui-drawer.js';

// ---------- Datos del menú ----------
const productos = [
  // ---- ENTRADAS ----
  {
    id: 'p1', name: 'Mote de Queso',
    description: 'Sopa típica con ñame y queso costeño.',
    price: 22000, image: '/src/assets/images/platillos/mote-de-queso.jpg',
    category: 'entradas',
  },
  {
    id: 'p2', name: 'Sopa de Guandú',
    description: 'Sopa con guandú, costilla y verduras.',
    price: 24000, image: '/src/assets/images/platillos/sopa-guandu.jpg',
    category: 'entradas',
  },
  {
    id: 'p3', name: 'Patacones con Hogao',
    description: 'Patacones fritos con hogao de tomate y cebolla.',
    price: 12000, image: '/src/assets/images/platillos/patacones-hogao.jpg',
    category: 'entradas',
  },
  {
    id: 'p4', name: 'Ceviche de Camarón',
    description: 'Camarones frescos con limón, ají y cilantro.',
    price: 28000, image: '/src/assets/images/platillos/ceviche-camaron.jpg',
    category: 'entradas',
  },
  // ---- PLATOS FUERTES ----
  {
    id: 'p5', name: 'Cazuela de Mariscos',
    description: 'Tradicional cazuela con camarón, jaiba y pescado en leche de coco.',
    price: 38000, image: '/src/assets/images/platillos/cazuela-mariscos.jpg',
    category: 'platos',
  },
  {
    id: 'p6', name: 'Mojarra Frita',
    description: 'Mojarra frita entera con arroz de coco y patacón.',
    price: 34000, image: '/src/assets/images/platillos/mojarra-frita.jpg',
    category: 'platos',
  },
  {
    id: 'p7', name: 'Arroz con Coco',
    description: 'Acompañamiento tradicional del Caribe colombiano.',
    price: 9000, image: '/src/assets/images/platillos/arroz-coco.jpg',
    category: 'platos',
  },
  {
    id: 'p8', name: 'Posta Negra Cartagenera',
    description: 'Lomo de res en salsa dulce con arroz blanco.',
    price: 36000, image: '/src/assets/images/platillos/posta-negra.jpg',
    category: 'platos',
  },
  {
    id: 'p9', name: 'Arroz de Lisa',
    description: 'Arroz con lisa desmechada y especias costeñas.',
    price: 30000, image: '/src/assets/images/platillos/arroz-lisa.jpg',
    category: 'platos',
  },
  {
    id: 'p10', name: 'Sancocho de Guandú con Carne',
    description: 'Sancocho tradicional con guandú y carne.',
    price: 32000, image: '/src/assets/images/platillos/sancocho-guandu.jpg',
    category: 'platos',
  },
  // ---- BEBIDAS ----
  {
    id: 'p11', name: 'Jugo de Corozo',
    description: 'Bebida natural refrescante.',
    price: 8000, image: '/src/assets/images/platillos/jugo-corozo.jpg',
    category: 'bebidas',
  },
  {
    id: 'p12', name: 'Limonada de Coco',
    description: 'Limonada cremosa con leche de coco.',
    price: 12000, image: '/src/assets/images/platillos/limonada-coco.jpg',
    category: 'bebidas',
  },
  {
    id: 'p13', name: 'Jugo de Maracuyá',
    description: 'Jugo natural de maracuyá.',
    price: 8000, image: '/src/assets/images/platillos/jugo-maracuya.jpg',
    category: 'bebidas',
  },
  {
    id: 'p14', name: 'Agua de Panela con Limón',
    description: 'Bebida tradicional refrescante.',
    price: 6000, image: '/src/assets/images/platillos/agua-panela.jpg',
    category: 'bebidas',
  },
  // ---- POSTRES ----
  {
    id: 'p15', name: 'Enyucado',
    description: 'Postre de yuca, coco y anís.',
    price: 10000, image: '/src/assets/images/platillos/enyucado.jpg',
    category: 'postres',
  },
  {
    id: 'p16', name: 'Cocadas',
    description: 'Dulce tradicional de coco.',
    price: 8000, image: '/src/assets/images/platillos/cocadas.jpg',
    category: 'postres',
  },
];

// ---------- Render del menú ----------
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

// ---------- Resúmenes: desktop y drawer ----------
const summaryDesktop = document.getElementById('summaryDesktop');
const summaryDrawer  = document.getElementById('summaryDrawer');

// Ambos escuchan el mismo evento y se mantienen sincronizados
document.addEventListener('add-to-cart', (e) => {
  summaryDesktop.addItem(e.detail);
  summaryDrawer.addItem(e.detail);
  updateFloatingCart();
});

// ---------- Confirmar pedido (desde cualquiera de los dos) ----------
document.addEventListener('order-confirmed', (e) => {
  const total = e.detail.total.toLocaleString('es-CO');
  const items = e.detail.items.map((i) => `• ${i.name} x${i.qty}`).join('\n');

  alert(`✅ Pedido confirmado\n\n${items}\n\nTotal: $${total}`);

  summaryDesktop.clear();
  summaryDrawer.clear();
  updateFloatingCart();

  // Cierra el drawer si está abierto
  const drawer = document.getElementById('cartDrawer');
  if (drawer) drawer.close();
});

// ---------- Botón flotante del carrito ----------
const floatingCart = document.getElementById('floatingCart');
const floatingCartCount = document.getElementById('floatingCartCount');
const cartDrawer = document.getElementById('cartDrawer');

function updateFloatingCart() {
  if (!floatingCartCount) return;
  // El contador lee del drawer porque así evitamos duplicar lógica
  // (ambos resúmenes tienen los mismos items)
  const items = summaryDrawer.shadowRoot.querySelectorAll('.item');
  let totalQty = 0;
  items.forEach((li) => {
    const txt = li.querySelector('.item__qty')?.textContent || '';
    const qty = parseInt(txt.replace('x', ''), 10) || 0;
    totalQty += qty;
  });

  floatingCartCount.textContent = totalQty;
  floatingCart.hidden = totalQty === 0;
}

floatingCart.addEventListener('click', () => {
  cartDrawer.show();
});

// Inicialmente oculto si no hay items
updateFloatingCart();

// ---------- Buscador de menú ----------
const searchInput = document.getElementById('menuSearch');

searchInput.addEventListener('input-change', (e) => {
  const query = e.detail.value.toLowerCase().trim();
  applyFilters();

  function applyFilters() {
    const cards = menuGrid.querySelectorAll('ui-product-card');
    cards.forEach((card) => {
      const name = (card.getAttribute('name') || '').toLowerCase();
      const desc = (card.getAttribute('description') || '').toLowerCase();
      const match = name.includes(query) || desc.includes(query);
      card.style.display = match ? '' : 'none';
    });
  }
});

// ---------- Filtro por categoría ----------
const categoryTabs = document.getElementById('categoryTabs');

categoryTabs.setCategories([
  { id: 'all', label: 'Todos', emoji: '🍽️' },
  { id: 'entradas', label: 'Entradas', emoji: '🥗' },
  { id: 'platos', label: 'Platos fuertes', emoji: '🍲' },
  { id: 'bebidas', label: 'Bebidas', emoji: '🥤' },
  { id: 'postres', label: 'Postres', emoji: '🍰' },
]);

let currentCategory = 'all';

categoryTabs.addEventListener('category-change', (e) => {
  currentCategory = e.detail.id;
  applyCategoryFilter();
});

function applyCategoryFilter() {
  const cards = menuGrid.querySelectorAll('ui-product-card');
  cards.forEach((card) => {
    const cardCategory = card.getAttribute('data-category') || 'all';
    const match = currentCategory === 'all' || cardCategory === currentCategory;
    card.style.display = match ? '' : 'none';
  });
}

// ---------- Toggle modo oscuro ----------
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
  const html = document.documentElement;
  const isDark = html.getAttribute('data-theme') === 'dark';
  html.setAttribute('data-theme', isDark ? 'light' : 'dark');
  themeToggle.textContent = isDark ? '🌙 Modo oscuro' : '☀️ Modo claro';
});