// src/components/molecules/ui-category-tabs.js

const categoryTabsTemplate = document.createElement('template');
categoryTabsTemplate.innerHTML = `
  <style>
    :host {
      display: block;
      font-family: var(--font-family-base, sans-serif);
    }

    .tabs {
      display: flex;
      gap: var(--space-sm, 8px);
      overflow-x: auto;
      overflow-y: hidden;
      scroll-behavior: smooth;
      padding: var(--space-xs, 4px) 0;
      scrollbar-width: thin;
      scrollbar-color: #BDBDBD transparent;
    }

    .tabs::-webkit-scrollbar {
      height: 4px;
    }
    .tabs::-webkit-scrollbar-thumb {
      background: #BDBDBD;
      border-radius: var(--radius-pill, 999px);
    }
    .tabs::-webkit-scrollbar-track {
      background: transparent;
    }

    button {
      flex-shrink: 0;
      display: inline-flex;
      align-items: center;
      gap: var(--space-xs, 4px);
      padding: var(--space-sm, 8px) var(--space-md, 16px);
      min-height: var(--touch-target-min, 48px);
      background: var(--bg-surface, #FFFFFF);
      color: var(--text-primary, #212121);
      border: 2px solid #E0E0E0;
      border-radius: var(--radius-pill, 999px);
      font-family: inherit;
      font-size: var(--font-size-label, 0.875rem);
      font-weight: var(--font-weight-medium, 500);
      cursor: pointer;
      white-space: nowrap;
      transition: all .2s ease;
    }

    button:hover {
      border-color: var(--color-primary, #E65100);
      color: var(--color-primary, #E65100);
    }

    button:focus-visible {
      outline: 3px solid var(--color-primary, #E65100);
      outline-offset: 2px;
    }

    button[aria-selected="true"] {
      background: var(--color-primary, #E65100);
      color: var(--text-inverse, #FFFFFF);
      border-color: var(--color-primary, #E65100);
    }

    button[aria-selected="true"]:hover {
      background: var(--color-primary-hover, #BF4500);
      color: var(--text-inverse, #FFFFFF);
    }

    .emoji {
      font-size: 1.1em;
      line-height: 1;
    }
  </style>

  <div class="tabs" role="tablist" part="tabs"></div>
`;

class UiCategoryTabs extends HTMLElement {
  static get observedAttributes() {
    return ['active'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(categoryTabsTemplate.content.cloneNode(true));

    this._tabsContainer = this.shadowRoot.querySelector('.tabs');
    this._categories = [];
  }

  /**
   * Configura las categorías.
   * @param {Array<{id: string, label: string, emoji?: string}>} categories
   */
  setCategories(categories) {
    this._categories = categories || [];
    this._renderTabs();
  }

  get active() {
    return this.getAttribute('active') || '';
  }
  set active(value) {
    this.setAttribute('active', value);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'active' && oldValue !== newValue) {
      this._updateActive();
    }
  }

  _renderTabs() {
    this._tabsContainer.innerHTML = '';

    this._categories.forEach((cat) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.setAttribute('role', 'tab');
      btn.setAttribute('data-id', cat.id);
      btn.setAttribute('aria-selected', cat.id === this.active ? 'true' : 'false');

      if (cat.emoji) {
        const emoji = document.createElement('span');
        emoji.className = 'emoji';
        emoji.textContent = cat.emoji;
        btn.appendChild(emoji);
      }

      const label = document.createElement('span');
      label.textContent = cat.label;
      btn.appendChild(label);

      btn.addEventListener('click', () => this._selectCategory(cat.id));

      this._tabsContainer.appendChild(btn);
    });
  }

  _updateActive() {
    const buttons = this._tabsContainer.querySelectorAll('button');
    buttons.forEach((btn) => {
      const isActive = btn.getAttribute('data-id') === this.active;
      btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
  }

  _selectCategory(id) {
    if (id === this.active) return;

    this.active = id;
    this._updateActive();

    this.dispatchEvent(new CustomEvent('category-change', {
      bubbles: true,
      composed: true,
      detail: { id },
    }));
  }
}

customElements.define('ui-category-tabs', UiCategoryTabs);