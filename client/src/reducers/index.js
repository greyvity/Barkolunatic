import { combineReducers } from "redux";
import itemReducer from "./itemReducer";
import errorReducer from "./errorsReducer";
import authReducer from "./authReducer";

export default combineReducers({
  item: itemReducer,
  error: errorReducer,
  auth: authReducer,
});
