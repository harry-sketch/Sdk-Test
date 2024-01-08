import { StoreSlice } from "@/types";

export interface IGeneralState {
  name: string;
  enableCanvas: boolean;
  setName: (name: string) => void;
  setEnableCanvas: (enableCanvas: boolean) => void;
}

const createGeneralSlice: StoreSlice<IGeneralState> = (set) => ({
  name: "",
  enableCanvas: false,

  setName(name) {
    set(() => ({ name }));
  },

  setEnableCanvas(enableCanvas) {
    set(() => ({ enableCanvas }));
  },
});

export default createGeneralSlice;
