// src/components/atoms/ui-badge.stories.js
import './ui-button.js';
export default {
  title: 'Atoms/ui-badge',
  component: 'ui-badge',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['price', 'primary', 'success', 'warning', 'error', 'outline'],
      description: 'Variante visual del badge',
      table: { defaultValue: { summary: 'price' } },
    },
    label: {
      control: { type: 'text' },
      description: 'Texto del badge',
    },
  },
  render: ({ variant, label }) => `
    <ui-badge variant="${variant}">${label}</ui-badge>
  `,
};

export const Price = {
  args: { variant: 'price', label: '$38.000' },
};

export const Primary = {
  args: { variant: 'primary', label: 'Nuevo' },
};

export const Success = {
  args: { variant: 'success', label: 'Disponible' },
};

export const Warning = {
  args: { variant: 'warning', label: 'Pocas unidades' },
};

export const Error = {
  args: { variant: 'error', label: 'Agotado' },
};

export const Outline = {
  args: { variant: 'outline', label: 'Promoción' },
};