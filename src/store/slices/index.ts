import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { IState } from '../types';

// Slices
import createHandlerSlice from './createHandlerSlice';

const useStore = create<IState>()(
  devtools(
    (...a) => ({
      ...createHandlerSlice(...a),
    }),
    { name: 'store' },
  ),
);

const { getState, setState } = useStore;

export { getState, setState };

export default useStore;
