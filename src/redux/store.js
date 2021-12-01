import { createStore } from "redux";
import Reducer from "./reducers/index";

export const store = createStore(Reducer);

export default {
  store,
};
