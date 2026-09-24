# La Bonga del Sinú — Front-End

Librería de componentes UI + demo funcional del sistema de pedidos del restaurante **La Bonga del Sinú**, construido con **Web Components nativos**, **Atomic Design** y **Storybook 10**.

## 🎯 Objetivo

Unificar la experiencia visual y técnica de los 3 canales digitales del restaurante:

- **Punto de Venta (POS)** en escritorio.
- **Menú Digital Web** para clientes en navegador.
- **App Móvil de Meseros** para dispositivos táctiles.

## 🛠️ Stack

- **Web Components** (Custom Elements + Shadow DOM)
- **Vite** (dev server + build)
- **Storybook 10** (documentación y pruebas visuales)
- **CSS Custom Properties** (tokens de diseño)
- **ES Modules** (imports nativos)

## 📁 Estructura

```
src/
├── assets/              # Imágenes e íconos
├── styles/
│   ├── variables.css    # Tokens de diseño
│   └── global.css       # Estilos globales
├── components/
│   ├── atoms/           # ui-button, ui-badge
│   ├── molecules/       # ui-quantity-selector, ui-product-card
│   └── organisms/       # ui-order-summary
└── app.js               # Lógica de la demo
index.html               # Demo funcional del entregable
```

## 🚀 Scripts

| Comando | Descripción |
|---|---|
| `npm run dev` | Arranca la app en `http://localhost:3000` |
| `npm run build` | Genera la versión de producción en `dist/` |
| `npm run preview` | Sirve la versión de producción |
| `npm run storybook` | Abre Storybook en `http://localhost:6006` |
| `npm run build-storybook` | Compila Storybook para producción |

## 🧩 Componentes

### Átomos
- **`ui-button`** — Variantes: `primary`, `secondary`, `disabled`, `loading`. Touch target ≥ 48×48px.
- **`ui-badge`** — Variantes: `price`, `primary`, `success`, `warning`, `error`, `outline`.

### Moléculas
- **`ui-quantity-selector`** — Control `+/-` con límites `min` y `max`. Emite `quantity-change`.
- **`ui-product-card`** — Combina imagen, título, descripción, badge, selector y botón. Emite `add-to-cart`.

### Organismos
- **`ui-order-summary`** — Lista, subtotal, IVA (19%) y total. Métodos: `addItem()`, `clear()`. Emite `order-confirmed`.

## 🎨 Tokens de diseño

En `src/styles/variables.css`:

- **Colores**: primario `#E65100`, secundario `#2E7D32`, fondo claro `#FAFAFA`, fondo oscuro `#121212`.
- **Tipografía**: sans-serif, escalas `h1` a `small`.
- **Espaciado**: escala de 4px (`xs`, `sm`, `md`, `lg`, `xl`, `2xl`).
- **Touch target**: mínimo 48×48px.

## 📱 Responsive

- **Desktop (>900px)**: menú y resumen en dos columnas.
- **Móvil (<900px)**: menú arriba, resumen sticky abajo.
- **Modo oscuro**: toggle en el header, activa `[data-theme="dark"]`.

## 👨‍💻 Autor

Proyecto académico SENA — Tecnología en Análisis y Desarrollo de Software.
Centro Tecnológico para la Gestión Agroempresarial, 2026.