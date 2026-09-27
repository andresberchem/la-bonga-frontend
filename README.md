# 🍽️ La Bonga del Sinú — Sistema de Pedidos

Librería de componentes UI y demo funcional del sistema de pedidos del restaurante **La Bonga del Sinú**, construida con **Web Components nativos**, **Atomic Design** y **Storybook 10**.

Este proyecto cubre los **3 entornos digitales** del restaurante:

| Entorno | Descripción | Link público |
|---|---|---|
| **Menú Digital Web** | Clientes piden desde el navegador | [Ver](https://andresberchem.github.io/la-bonga-frontend/) |
| **POS Escritorio** | Punto de venta para cajeros | [Ver](https://andresberchem.github.io/la-bonga-frontend/pos.html) |
| **App Móvil Meseros** | Meseros toman pedidos en mesa | [Ver](https://andresberchem.github.io/la-bonga-frontend/meseros.html) |

---

## 📋 Tabla de contenido

- [Contexto](#-contexto)
- [Stack técnico](#-stack-técnico)
- [Los 3 entornos](#-los-3-entornos)
- [Arquitectura: Atomic Design](#-arquitectura-atomic-design)
- [Estructura del proyecto](#-estructura-del-proyecto)
- [Componentes](#-componentes)
- [Tokens de diseño](#-tokens-de-diseño)
- [Cómo correr localmente](#-cómo-correr-localmente)
- [Storybook](#-storybook)
- [Cumplimiento del caso de estudio](#-cumplimiento-del-caso-de-estudio)
- [Autor](#-autor)

---

## 🎯 Contexto

"Restaurante la Bonga del Sinú" es una cadena de restaurantes en expansión que necesita unificar la experiencia visual y técnica de sus canales digitales. Antes, cada dispositivo tenía su propia interfaz, generando inconsistencias visuales y duplicación de código.

**Solución:** una librería de componentes Front-End estandarizada basada en Web Components nativos, que sirve como base para los 3 entornos del restaurante.

---

## 🛠️ Stack técnico

| Tecnología | Uso |
|---|---|
| **Web Components** | Custom Elements + Shadow DOM, sin frameworks |
| **Vite** | Dev server y bundler |
| **Storybook 10** | Documentación y pruebas visuales de componentes |
| **CSS Custom Properties** | Tokens de diseño (colores, tipografía, espaciado) |
| **ES Modules** | Imports nativos en el navegador |
| **Git + GitHub Pages** | Control de versiones y deploy |

**Sin frameworks JS** (React, Vue, Angular). Los componentes son 100% nativos y portables.

---

## 🖥️ Los 3 entornos

### 1. Menú Digital Web (`index.html`)

Interfaz para clientes que piden desde el navegador.

**Características:**
- Catálogo de 16 platos del Caribe colombiano con imágenes.
- Filtro por categoría (Entradas, Platos, Bebidas, Postres).
- Búsqueda en vivo por nombre o descripción.
- Carrito lateral en desktop, drawer en móvil/tablet.
- Modo claro/oscuro.
- Totalmente responsive.

**Demo:** [https://andresberchem.github.io/la-bonga-frontend/](https://andresberchem.github.io/la-bonga-frontend/)

---

### 2. POS Escritorio (`pos.html`)

Punto de venta para cajeros.

**Características:**
- Layout de dos columnas (catálogo + tabla de pedidos).
- Catálogo en formato lista compacta (alta densidad).
- Tabla con cantidad, precio unitario, subtotal y eliminar.
- Cálculo automático de subtotal, IVA (19%) y total.
- **Atajos de teclado:**
  - `F1` — Enfocar buscador
  - `F2` — Ver ayuda de atajos
  - `F3` — Cobrar pedido
  - `F4` — Limpiar pedido
  - `Esc` — Limpiar búsqueda
  - `Ctrl + 1-9` — Cantidad rápida al último producto

**Demo:** [https://andresberchem.github.io/la-bonga-frontend/pos.html](https://andresberchem.github.io/la-bonga-frontend/pos.html)

---

### 3. App Móvil Meseros (`meseros.html`)

App para meseros en dispositivos táctiles.

**Características:**
- Interfaz grande (touch target ≥ 48×48 px).
- **Modo oscuro por defecto** (ambientes con poca luz).
- Selector de mesa (Mesa 1-12).
- **Gestos táctiles:**
  - `Tap` → agregar producto
  - `Swipe right` → agregar rápido
  - `Swipe left` → ver información del producto
  - `Swipe down` en el drawer → cerrar
- Drawer inferior en móvil, panel lateral en tablet.
- Botón flotante con contador de ítems.

**Demo:** [https://andresberchem.github.io/la-bonga-frontend/meseros.html](https://andresberchem.github.io/la-bonga-frontend/meseros.html)

---

## 🧬 Arquitectura: Atomic Design

El proyecto sigue la metodología **Atomic Design**, que organiza los componentes en 3 niveles jerárquicos:

```
Átomos  →  Moléculas  →  Organismos  →  Vistas
```

- **Átomos:** elementos indivisibles (botón, badge, input, swipeable).
- **Moléculas:** combinación de átomos (tarjeta de producto, selector de cantidad, tabs de categoría).
- **Organismos:** combinación de moléculas (resumen del pedido, tabla POS, drawer).
- **Vistas:** páginas que combinan organismos (`index.html`, `pos.html`, `meseros.html`).

**Beneficio:** los componentes se reutilizan en los 3 entornos.

---

## 📁 Estructura del proyecto

```
la-bonga-frontend/
├── .storybook/              # Configuración de Storybook
│   ├── main.js
│   └── preview.js
├── public/                  # Assets estáticos
│   └── platillos/           # 16 imágenes de platos
├── src/
│   ├── assets/
│   ├── styles/
│   │   ├── variables.css    # Tokens de diseño
│   │   └── global.css       # Estilos globales
│   ├── components/
│   │   ├── atoms/
│   │   │   ├── ui-badge.js + ui-badge.stories.js
│   │   │   ├── ui-button.js + ui-button.stories.js
│   │   │   ├── ui-input.js + ui-input.stories.js
│   │   │   └── ui-swipeable.js + ui-swipeable.stories.js
│   │   ├── molecules/
│   │   │   ├── ui-category-tabs.js + .stories.js
│   │   │   ├── ui-product-card.js + .stories.js
│   │   │   └── ui-quantity-selector.js + .stories.js
│   │   └── organisms/
│   │       ├── ui-order-summary.js + .stories.js
│   │       ├── ui-pos-table.js + .stories.js
│   │       └── ui-drawer.js + .stories.js
│   ├── app.js               # Lógica del menú web
│   ├── pos.js               # Lógica del POS
│   └── meseros.js           # Lógica de la app de meseros
├── index.html               # Vista: Menú Digital Web
├── pos.html                 # Vista: POS Escritorio
├── meseros.html             # Vista: App Móvil Meseros
├── vite.config.js
├── package.json
└── README.md
```

---

## 🧩 Componentes

### Átomos

| Componente | Descripción | Variantes |
|---|---|---|
| `ui-button` | Botón de acción | `primary`, `secondary`, `disabled`, `loading` |
| `ui-badge` | Etiqueta de precio o estado | `price`, `primary`, `success`, `warning`, `error`, `outline` |
| `ui-input` | Campo de texto con icono | `default`, `disabled`, `error` |
| `ui-swipeable` | Contenedor con gestos táctiles | `swipe-left`, `swipe-right` |

### Moléculas

| Componente | Descripción |
|---|---|
| `ui-quantity-selector` | Control `+/-` con límites min/max |
| `ui-product-card` | Tarjeta de producto con imagen, título, descripción, precio y botón |
| `ui-category-tabs` | Pestañas horizontales de categorías con scroll |

### Organismos

| Componente | Descripción |
|---|---|
| `ui-order-summary` | Resumen del pedido con subtotal, IVA (19%) y total |
| `ui-pos-table` | Tabla compacta para POS con cantidades y totales |
| `ui-drawer` | Panel deslizable con swipe down y adaptación lateral en desktop |

---

## 🎨 Tokens de diseño

Definidos en `src/styles/variables.css`:

**Colores:**
- Primario: `#E65100` (naranja)
- Secundario: `#2E7D32` (verde)
- Fondo claro: `#FAFAFA`
- Fondo oscuro: `#121212`

**Tipografía:**
- Fuente: `'Inter', 'Segoe UI', sans-serif`
- Tamaños: `h1` (2rem), `h2` (1.5rem), `h3` (1.25rem), `body` (1rem), `label` (0.875rem), `small` (0.75rem)

**Espaciado (escala de 4px):**
- `xs` (4px), `sm` (8px), `md` (16px), `lg` (24px), `xl` (32px), `2xl` (48px)

**Touch target:** mínimo 48×48px en todos los botones.

**Modo oscuro:** activado con `[data-theme="dark"]` en `<html>`.

---

## 🚀 Cómo correr localmente

### Requisitos

- Node.js 20.19+ o 22.12+
- npm 10+

### Instalación

```bash
git clone https://github.com/andresberchem/la-bonga-frontend.git
cd la-bonga-frontend
npm install
```

### Scripts

| Comando | Descripción |
|---|---|
| `npm run dev` | Arranca la app en `http://localhost:3000` |
| `npm run build` | Genera la versión de producción en `dist/` |
| `npm run preview` | Sirve la versión de producción |
| `npm run storybook` | Abre Storybook en `http://localhost:6006` |
| `npm run build-storybook` | Compila Storybook para producción |
| `npm run deploy` | Publica la app en GitHub Pages |

### Ver en el celular

```bash
npm run dev -- --host
```

Copia la URL `Network` que muestra Vite y ábrela en tu celular (mismo WiFi).

---

## 📚 Storybook

Todas las historias están documentadas con `autodocs`:

```bash
npm run storybook
```

Abre `http://localhost:6006`.

**Historias disponibles:**
- **Atoms:** ui-badge, ui-button, ui-input, ui-swipeable
- **Molecules:** ui-category-tabs, ui-product-card, ui-quantity-selector
- **Organisms:** ui-drawer, ui-order-summary, ui-pos-table

---

## ✅ Cumplimiento del caso de estudio

| Requisito | Estado |
|---|---|
| Configuración de tokens de diseño | ✅ `src/styles/variables.css` |
| Estructura modular Atomic Design | ✅ `src/components/{atoms,molecules,organisms}` |
| Átomo Button con variantes | ✅ `ui-button` |
| Molécula ProductCard | ✅ `ui-product-card` |
| Organismo OrderSummary | ✅ `ui-order-summary` |
| Cálculo de subtotal, IVA y total | ✅ IVA 19% |
| Web/Escritorio: 2 columnas | ✅ `grid-template-columns: 2fr 1fr` |
| Móvil: resumen en panel inferior | ✅ Drawer + botón flotante |
| Touch target ≥ 48×48px | ✅ `--touch-target-min: 48px` |
| POS con tabla de pedidos | ✅ `ui-pos-table` + `pos.html` |
| POS con atajos de teclado | ✅ F1-F4, Esc, Ctrl+1-9 |
| App móvil con gestos tap/swipe | ✅ `ui-swipeable` + `meseros.html` |
| Modo oscuro para poca luz | ✅ `[data-theme="dark"]` |
| Repositorio con código | ✅ [GitHub](https://github.com/andresberchem/la-bonga-frontend) |
| Vista previa / demo funcional | ✅ [GitHub Pages](https://andresberchem.github.io/la-bonga-frontend/) |
| Storybook (documentación) | ✅ 10 componentes documentados |

---

## 👨‍💻 Autor

**Andrés Berchem**
Proyecto académico SENA — Tecnología en Análisis y Desarrollo de Software
Centro Tecnológico para la Gestión Agroempresarial
2026

---

## 📄 Licencia

ISC — Libre para uso educativo y comercial.