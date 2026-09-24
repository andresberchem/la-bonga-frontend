// src/components/molecules/ui-quantity-selector.stories.js
// src/components/molecules/ui-quantity-selector.stories.js
import './ui-quantity-selector.js';

export default {
  title: 'Molecules/ui-quantity-selector',
  component: 'ui-quantity-selector',
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'number' },
      description: 'Valor actual',
      table: { defaultValue: { summary: '1' } },
    },
    min: {
      control: { type: 'number' },
      description: 'Valor mínimo permitido',
      table: { defaultValue: { summary: '1' } },
    },
    max: {
      control: { type: 'number' },
      description: 'Valor máximo permitido',
      table: { defaultValue: { summary: '99' } },
    },
  },
  render: ({ value, min, max }) => `
    <ui-quantity-selector
      value="${value}"
      min="${min}"
      max="${max}"
    ></ui-quantity-selector>
  `,
};

export const Default = {
  args: { value: 1, min: 1, max: 99 },
};

export const AtMinimum = {
  args: { value: 1, min: 1, max: 99 },
};

export const AtMaximum = {
  args: { value: 10, min: 1, max: 10 },
};

export const MiddleRange = {
  args: { value: 5, min: 1, max: 10 },
};