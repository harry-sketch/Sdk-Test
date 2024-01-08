import { create } from "zustand";
import { devtools } from "zustand/middleware";
import createGeneralSlice from "./createGeneralSlice";
import { IState } from "@/types";

const useStore = create<IState>()(
  devtools(
    (...a) => ({
      ...createGeneralSlice(...a),
    }),
    { name: "client" }
  )
);

const { getState, setState } = useStore;

export { getState, setState };

export default useStore;
