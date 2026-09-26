// src/components/atoms/ui-input.stories.js
import './ui-input.js';

export default {
  title: 'Atoms/ui-input',
  component: 'ui-input',
  tags: ['autodocs'],
  argTypes: {
    value: { control: { type: 'text' } },
    placeholder: { control: { type: 'text' } },
    type: {
      control: { type: 'select' },
      options: ['text', 'search', 'email', 'number', 'tel'],
    },
    disabled: { control: { type: 'boolean' } },
    error: { control: { type: 'boolean' } },
  },
  render: ({ value, placeholder, type, disabled, error }) => `
    <div style="max-width: 360px;">
      <ui-input
        value="${value || ''}"
        placeholder="${placeholder || ''}"
        type="${type || 'text'}"
        ${disabled ? 'disabled' : ''}
        ${error ? 'error' : ''}
      ></ui-input>
    </div>
  `,
};

export const Default = {
  args: {
    placeholder: 'Buscar platillo...',
    type: 'search',
  },
};

export const WithValue = {
  args: {
    value: 'Cazuela',
    placeholder: 'Buscar platillo...',
    type: 'search',
  },
};

export const Disabled = {
  args: {
    placeholder: 'No disponible',
    disabled: true,
  },
};

export const WithError = {
  args: {
    value: 'texto inválido',
    placeholder: 'Buscar...',
    error: true,
  },
};