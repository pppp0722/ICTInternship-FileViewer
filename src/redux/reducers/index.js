import { combineReducers } from "redux";
import {
  SET_MENU,
  SET_DIR,
} from "../actions";

const menu = "home";
const dir = "";

const menuReducer = (state = menu, action) => {
  switch (action.type) {
    case SET_MENU:
      return action.payload;
    default:
      return state;
  }
};

const dirReducer = (state = dir, action) => {
    switch (action.type) {
      case SET_DIR:
        return action.payload;
      default:
        return state;
    }
  };


const Reducer = combineReducers({
  menuReducer,
  dirReducer,
});

export default Reducer;
