// src/components/atoms/ui-button.stories.js
import './ui-button.js';
export default {
  title: 'Atoms/ui-button',
  component: 'ui-button',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'disabled'],
      description: 'Variante visual del botón',
      table: { defaultValue: { summary: 'primary' } },
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Muestra el spinner y bloquea la interacción',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Deshabilita el botón',
    },
    label: {
      control: { type: 'text' },
      description: 'Texto del botón',
      table: { defaultValue: { summary: 'Botón' } },
    },
  },
  render: ({ variant, loading, disabled, label }) => {
    return `
      <ui-button
        variant="${variant}"
        ${loading ? 'loading' : ''}
        ${disabled ? 'disabled' : ''}
      >${label}</ui-button>
    `;
  },
};

export const Primary = {
  args: {
    variant: 'primary',
    label: 'Agregar al pedido',
    loading: false,
    disabled: false,
  },
};

export const Secondary = {
  args: {
    variant: 'secondary',
    label: 'Cancelar',
    loading: false,
    disabled: false,
  },
};

export const Disabled = {
  args: {
    variant: 'disabled',
    label: 'No disponible',
    disabled: true,
    loading: false,
  },
};

export const Loading = {
  args: {
    variant: 'primary',
    label: 'Procesando...',
    loading: true,
    disabled: false,
  },
};