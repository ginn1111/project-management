import { create } from 'zustand';
import { createThemeSlice } from './slices/theme-slice';
import { IThemeSlice } from './slices/theme-slice';

export type IRootState = IThemeSlice;

const useStore = create<IRootState>((...a) => ({
  ...createThemeSlice(...a),
}));

export default useStore;
