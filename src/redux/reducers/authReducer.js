import * as authActions from "../actions/actions";
import { authState } from "./initialState";

const authReducer = (state = authState, action) => {
  switch (action.type) {
    case authActions.SIGN_IN_REQUEST:
      return { ...state, loading: true };
    case authActions.SIGN_IN_SUCCESS:
      return { ...state, loading: false, user: action.userId };
    case authActions.SIGN_IN_FAILED:
      return { ...state, loading: false, error: action.error.message };
    case authActions.SIGN_UP_REQUEST:
      return { ...state, loading: true };
    case authActions.SIGN_UP_SUCCESS:
      return { ...state, loading: false, user: action.userId };
    case authActions.SIGN_UP_FAILED:
      return { ...state, loading: false, error: action.error.message };
    case authActions.SIGN_OUT_SUCCESS:
      return { ...state, loading: false, user: "" };
    case authActions.SIGN_OUT_FAILED:
      return { ...state, loading: false, error: action.error.message };
    case authActions.REMOVE_ERROR:
      return { ...state, error: "" };
    default:
      return state;
  }
};

export default authReducer;
