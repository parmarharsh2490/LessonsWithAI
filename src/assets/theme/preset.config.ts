import Aura from '@primeuix/themes/aura';
import { definePreset } from '@primeuix/themes';

// Primary color values - synced with src/assets/base.scss
export const primaryColors = {
  50: '#faf5ff',
  100: '#f3e8ff',
  200: '#e9d5ff',
  300: '#d8b4fe',
  400: '#c084fc',
  500: '#a855f7',
  600: '#9333ea',
  700: '#7e22ce',
  800: '#6b21a8',
  900: '#581c87',
  950: '#3b0764',
} as const;

export const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: primaryColors[50],
      100: primaryColors[100],
      200: primaryColors[200],
      300: primaryColors[300],
      400: primaryColors[400],
      500: primaryColors[500],
      600: primaryColors[600],
      700: primaryColors[700],
      800: primaryColors[800],
      900: primaryColors[900],
      950: primaryColors[950],
    },
    primaryColor: '{primary.500}',
    primaryColorText: '#ffffff',
  },
  css: () => `
    :root {
      --p-surface-900: #000000;
      --p-surface-950: #000000;
      --p-progressspinner-color-one	: #a855f7 !important;
      --p-progressspinner-color-two	: #a855f7 !important;
      --p-progressspinner-color-three	: #a855f7 !important;
      --p-progressspinner-color-four	: #a855f7 !important;
    }
    .p-card-body {
    border: 1px solid var(--p-inputtext-border-color) !important;
    }
  `,
  components: {
    inputtext: {
      root: {
        background: '{form.field.background}',
        disabledBackground: '{form.field.disabled.background}',
        filledBackground: '{form.field.filled.background}',
        filledFocusBackground: '{form.field.filled.focus.background}',
        borderColor: '{form.field.border.color}',
        hoverBorderColor: '{form.field.border.color}',
        focusBorderColor: '{primary.500}',
        invalidBorderColor: '{form.field.error.border.color}',
        color: '{form.field.color}',
        disabledColor: '{form.field.disabled.color}',
        placeholderColor: '{form.field.placeholder.color}',
        invalidPlaceholderColor: '{form.field.error.placeholder.color}',
        shadow: 'none',
        paddingX: '{form.field.padding.x}',
        paddingY: '{form.field.padding.y}',
        borderRadius: '{border.radius.md}',
        focusRing: {
          width: '0',
          style: 'none',
          color: 'transparent',
          offset: '0',
          shadow: '0 0 0 0.2rem rgba(168, 85, 247, 0.2)',
        },
        transitionDuration: '{transition.duration}',
      },
    },
    dropdown: {
      root: {
        background: '{form.field.background}',
        disabledBackground: '{form.field.disabled.background}',
        filledBackground: '{form.field.filled.background}',
        filledFocusBackground: '{form.field.filled.focus.background}',
        borderColor: '{form.field.border.color}',
        hoverBorderColor: '{form.field.border.color}',
        focusBorderColor: '{primary.500}',
        invalidBorderColor: '{form.field.error.border.color}',
        color: '{form.field.color}',
        disabledColor: '{form.field.disabled.color}',
        placeholderColor: '{form.field.placeholder.color}',
        invalidPlaceholderColor: '{form.field.error.placeholder.color}',
        shadow: 'none',
        paddingX: '{form.field.padding.x}',
        paddingY: '{form.field.padding.y}',
        borderRadius: '{border.radius.md}',
        focusRing: {
          width: '0',
          style: 'none',
          color: 'transparent',
          offset: '0',
          shadow: '0 0 0 0.2rem rgba(168, 85, 247, 0.2)',
        },
        transitionDuration: '{transition.duration}',
      },
      list: {
        background: '{surface.0}',
        color: '{text.color}',
        borderColor: '{surface.border.color}',
        borderRadius: '{border.radius.md}',
        padding: '0.5rem',
        gap: '0.125rem',
        shadow:
          '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      item: {
        focusBackground: '{primary.50}',
        selectedBackground: '{primary.500}',
        selectedFocusBackground: '{primary.600}',
        color: '{text.color}',
        selectedColor: '#ffffff',
        padding: '0.5rem',
        borderRadius: '{border.radius.sm}',
        gap: '0.5rem',
      },
    },
  },
});
