import { combineReducers } from "redux";
import { AppReducer } from "./appReducer";
import { FactReducer } from "./factReducer";

export default combineReducers({
  app: AppReducer,
  fact: FactReducer,
});
