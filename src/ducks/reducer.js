import { combineReducers } from "redux";
import generalReducer from "./reducers/generalReducer";
import contactReducer from "./reducers/contactReducer";
import apptReducer from "./reducers/apptReducer";
import taskReducer from "./reducers/taskReducer";

export default combineReducers({
  generalReducer: generalReducer,
  contactReducer: contactReducer,
  apptReducer: apptReducer,
  taskReducer: taskReducer
});
