import { StateCreator } from 'zustand';

export interface IThemeSlice {
  sidebar: boolean;
  toggleSidebar: () => void;
}

export const createThemeSlice: StateCreator<
  IThemeSlice,
  [],
  [],
  IThemeSlice
> = (set) => ({
  sidebar: false,
  toggleSidebar: () => set((state) => ({ sidebar: !state.sidebar })),
});
