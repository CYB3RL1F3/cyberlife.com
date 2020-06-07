import React, { FC, createContext, useReducer, Reducer, ReducerAction } from "react";


export interface ModalStyle {
  width: string;
  height: string;
  top: string;
  left: string;
}

interface ModalState {
  picture: string;
  onClose: () => void;
  mounted: boolean;
  opened: boolean;
  initialStyle: ModalStyle;
  finalStyle: ModalStyle;
}

const modalContextState: ModalState = { 
  picture: null, 
  mounted: false,
  onClose: () => {},
  opened: false,
  initialStyle: {
    width: "10vw",
    height: "10vw",
    top: "0",
    left: "0"
  },
  finalStyle: {
    width: "0",
    height: "0",
    top: "0",
    left: "0"
  }
}

type Actions = ReducerAction<Reducer<ModalState, {
  type: "create" | "open" | "close" | "mount" | "unmount";
  payload?: Partial<ModalState>;
}>>;

const modalContextReducer: Reducer<ModalState, Actions> = (state, { payload, type }) => {
  switch (type) {
    case "create": {
      return {
        ...state,
        ...payload,
        opened: false,
        mounted: true
      };
    }
    case "open":
      return {
        ...state,
        opened: true,
      };
    case "unmount":
      return {
        ...state,
        mounted: false,
      };
    case "close":
      return { 
        ...state,
        opened: false
      };
    default:
      return;
  }
};


export const ModalContext = createContext({
  state: modalContextState,
  dispatch: null
});

export const ModalContextProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(modalContextReducer, modalContextState);
  return (
    <ModalContext.Provider value={{ state, dispatch }}>
      {children}
    </ModalContext.Provider>
  )
}

export const ModalContextConsumer = ModalContext.Consumer;