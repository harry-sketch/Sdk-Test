import { StoreSlice } from "@/types";

export interface IGeneralState {
  name: string;
  setName: (name: string) => void;
}

const createGeneralSlice: StoreSlice<IGeneralState> = (set) => ({
  name: "",
  setName(name) {
    set(() => ({ name }));
  },
});

export default createGeneralSlice;
