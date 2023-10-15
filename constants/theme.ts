import { Theme, ThemeConfig } from 'react-select';

export const RSTheme = (theme: Theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
  },
});

export const ColorStatusDauViec = {
  inprogress: 'text-info bg-info-light',
  success: 'text-success bg-success-light',
  failed: 'text-danger bg-danger/20',
} as const;
