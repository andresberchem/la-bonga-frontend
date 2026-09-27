// src/components/atoms/ui-swipeable.stories.js
import './ui-swipeable.js';

export default {
  title: 'Atoms/ui-swipeable',
  component: 'ui-swipeable',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Contenedor con gestos swipe. En móvil, desliza el contenido a la derecha (verde, agregar) o izquierda (azul, info). También funciona con el mouse en desktop.',
      },
    },
  },
};

const renderCard = (titulo) => {
  const html = `
    <div style="max-width: 380px;padding:8px;">
      <ui-swipeable id="swipeDemo">
        <div style="background:#1E1E1E;color:#E0E0E0;padding:16px;border-radius:10px;border:1px solid rgba(255,255,255,.05);min-height:72px;display:flex;justify-content:space-between;align-items:center;gap:12px;">
          <div>
            <p style="margin:0 0 4px;font-weight:600;">${titulo}</p>
            <span style="color:#4CAF50;font-weight:700;">$38.000</span>
          </div>
          <span style="width:48px;height:48px;background:#E65100;color:#fff;border-radius:8px;display:inline-flex;align-items:center;justify-content:center;font-size:1.4rem;font-weight:700;">+</span>
        </div>
      </ui-swipeable>
      <p id="log" style="font-family:monospace;font-size:12px;color:#888;margin-top:12px;">Esperando gesto...</p>
    </div>
  `;

  queueMicrotask(() => {
    const swipe = document.getElementById('swipeDemo');
    const log = document.getElementById('log');
    if (!swipe || !log) return;

    swipe.addEventListener('swipe-right', (e) => {
      log.textContent = `swipe-right → action: ${e.detail.action}`;
    });
    swipe.addEventListener('swipe-left', (e) => {
      log.textContent = `swipe-left → action: ${e.detail.action}`;
    });
  });

  return html;
};

export const Default = {
  render: () => renderCard('Cazuela de Mariscos'),
};

export const ConUmbral = {
  render: () => `
    <div style="max-width: 380px;padding:8px;">
      <ui-swipeable threshold="120">
        <div style="background:#1E1E1E;color:#E0E0E0;padding:16px;border-radius:10px;border:1px solid rgba(255,255,255,.05);min-height:72px;">
          <p style="margin:0 0 4px;font-weight:600;">Umbral de 120px</p>
          <span style="color:#4CAF50;font-weight:700;">Necesita deslizar más para activar</span>
        </div>
      </ui-swipeable>
    </div>
  `,
};