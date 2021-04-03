import { createContext, useContext } from "react";

export const NumberContext = createContext({});
export const useNumberContext = (): any => useContext(NumberContext);
