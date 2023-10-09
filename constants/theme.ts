import { Theme, ThemeConfig } from 'react-select';

export const RSTheme = (theme: Theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary: '#0f172a',
    primary75: '#f1f5f9',
  },
});
