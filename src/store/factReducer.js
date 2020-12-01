import {
  FACTEND,
  FACTLOADING,
  FACTSTART,
  LOADFACTS,
  NEXTFACT,
  OPENMENU,
  RESTART,
  USERUPDATEINFO,
} from "./types";

const InitStore = {
  facts: [],
  currentIndex: 0,
  globalIndex: 0,
  loading: true,
  isEnd: false,
};
export const FactReducer = (state = InitStore, action) => {
  switch (action.type) {
    case LOADFACTS: {
      return {
        ...state,
        facts: state.facts.concat(action.payload),
      };
    }

    case NEXTFACT: {
      return { ...state, currentIndex: state.currentIndex + 1 };
    }
    case FACTLOADING: {
      return { ...state, loading: action.payload };
    }
    case USERUPDATEINFO: {
      return { ...state, globalIndex: action.payload.currentFact };
    }
    case FACTEND: {
      return { ...state, isEnd: true };
    }
    case FACTSTART: {
      return { ...state, isEnd: false };
    }
    case RESTART: {
      return InitStore;
    }
    default:
      return state;
  }
};
