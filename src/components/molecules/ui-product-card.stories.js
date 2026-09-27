// src/components/molecules/ui-product-card.stories.js
import './ui-product-card.js';
import '../organisms/ui-order-summary.js';

export default {
  title: 'Molecules/ui-product-card',
  component: 'ui-product-card',
  tags: ['autodocs'],
  argTypes: {
    name: { control: { type: 'text' } },
    description: { control: { type: 'text' } },
    price: { control: { type: 'number' } },
    image: { control: { type: 'text' } },
  },
  render: ({ name, description, price, image }) => `
    <div style="max-width: 380px;">
      <ui-product-card
        data-id="p1"
        name="${name}"
        description="${description}"
        price="${price}"
        image="${image}"
      ></ui-product-card>
    </div>
  `,
};

const PLACEHOLDER = 'platillos/cazuela-mariscos.jpg';

export const CazuelaDeMariscos = {
  args: {
    name: 'Cazuela de Mariscos',
    description: 'Tradicional cazuela con camarón, jaiba y pescado en leche de coco.',
    price: 38000,
    image: PLACEHOLDER,
  },
};

export const MoteDeQueso = {
  args: {
    name: 'Mote de Queso',
    description: 'Sopa típica con ñame y queso costeño.',
    price: 22000,
    image: PLACEHOLDER,
  },
};

export const ArrozConCoco = {
  args: {
    name: 'Arroz con Coco',
    description: 'Acompañamiento tradicional del Caribe colombiano.',
    price: 9000,
    image: PLACEHOLDER,
  },
};

export const JugoDeCorozo = {
  args: {
    name: 'Jugo de Corozo',
    description: 'Bebida natural refrescante.',
    price: 8000,
    image: PLACEHOLDER,
  },
};

export const InteractiveWithSummary = {
  render: () => {
    // Esperamos a que el DOM esté listo para conectar el resumen
    queueMicrotask(() => {
      const summary = document.getElementById('liveSummary');
      if (!summary) return;

      // Nos aseguramos de no duplicar listeners
      if (window.__bongaListenerAttached) return;
      window.__bongaListenerAttached = true;

      document.addEventListener('add-to-cart', (e) => {
        const s = document.getElementById('liveSummary');
        if (s) s.addItem(e.detail);
      });
    });

    return `
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;max-width:820px;">
        <div>
          <ui-product-card
            data-id="p1"
            name="Cazuela de Mariscos"
            description="Tradicional cazuela con camarón, jaiba y pescado en leche de coco."
            price="38000"
            image="https://placehold.co/600x400/E65100/FFFFFF?text=La+Bonga"
          ></ui-product-card>
        </div>
        <div>
          <ui-order-summary id="liveSummary"></ui-order-summary>
        </div>
      </div>
    `;
  },
};