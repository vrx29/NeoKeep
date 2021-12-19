import { createStore } from "redux";
import authReducer from "./reducers/authReducer";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(authReducer,composeWithDevTools())

export default store