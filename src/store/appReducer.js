import popout from "../popout/popout";
import {
  APPINIT,
  APPLOADING,
  CHANGEPANEL,
  FACTLOADING,
  OPENMENU,
  USERUPDATEINFO,
  WELCOMECOMPLETE,
  OPENMODAL,
  NOTIFICATION,
} from "./types";

const InitStore = {
  panel: "home",
  init: false,
  newUser: false,
  welcomeCompleted: true,
  loading: true,
  popout: true,
  menuOpen: false,
  activeModal: null,
  notification: null,
};

export const AppReducer = (store = InitStore, action) => {
  switch (action.type) {
    case APPINIT: {
      return { ...store, init: true };
    }
    case OPENMENU: {
      return { ...store, menuOpen: action.payload, popout: action.payload };
    }
    case CHANGEPANEL: {
      return { ...store, panel: action.payload };
    }
    case APPLOADING: {
      return { ...store, loading: action.payload, popout: action.payload };
    }
    case FACTLOADING: {
      return { ...store, popout: action.payload };
    }
    case OPENMODAL: {
      return { ...store, activeModal: action.payload };
    }
    case NOTIFICATION: {
      return { ...store, notification: action.payload };
    }
    case USERUPDATEINFO: {
      if (action.payload.newUser) {
        return { ...store, newUser: true, welcomeCompleted: false };
      }
      return { ...store };
    }
    case WELCOMECOMPLETE: {
      return { ...store, welcomeCompleted: true };
    }
    default:
      return store;
  }
};
