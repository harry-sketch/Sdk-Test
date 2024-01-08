import { IGeneralState } from "@/store/createGeneralSlice";
import { StateCreator } from "zustand";

export type IState = IGeneralState;

export type StoreSlice<T> = StateCreator<
  IState,
  [["zustand/devtools", never]],
  [],
  T
>;

export type ValueOf<T> = T[keyof T];
