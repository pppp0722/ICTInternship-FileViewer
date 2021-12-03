import { combineReducers } from "redux";
import {
  SET_DIR,
} from "../actions";

const dir = "";

const dirReducer = (state = dir, action) => {
    switch (action.type) {
      case SET_DIR:
        return action.payload;
      default:
        return state;
    }
  };


const Reducer = combineReducers({
  dirReducer,
});

export default Reducer;
