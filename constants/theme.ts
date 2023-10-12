import { Theme, ThemeConfig } from 'react-select';

export const RSTheme = (theme: Theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
  },
});
