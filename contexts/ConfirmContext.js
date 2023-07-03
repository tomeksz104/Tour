"use client";

import { createContext, useReducer } from "react";
import { confirmReducer } from "./reducers/confirmReducer";

const initialState = {
  show: false,
  text: "",
};

export const ConfirmContext = createContext();

export const ConfirmContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(confirmReducer, initialState);

  return (
    <ConfirmContext.Provider value={[state, dispatch]}>
      {children}
    </ConfirmContext.Provider>
  );
};
