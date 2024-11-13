import type { StateCreator } from 'zustand';
import type { ISidebarState } from '../slices/createHandlerSlice';

export type IState = ISidebarState;

export type StoreSlice<T> = StateCreator<
  IState,
  [['zustand/devtools', never]],
  [],
  T
>;

export type ValueOf<T> = T[keyof T];
