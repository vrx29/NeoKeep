import * as noteActions from "../actions/actions";
import { notesState } from "./initialState";

const noteReducer = (state = notesState, action) => {
  switch (action.type) {
    case noteActions.ADD_NOTE_REQUEST:
      return { ...state, loading: true };
    case noteActions.ADD_NOTE_SUCCESS:
      return { ...state, loading: false, notes: [...state.notes, action.note] };
    case noteActions.ADD_NOTE_FAILED:
      return { ...state, loading: false, error: action.error.message };
    case noteActions.FECTH_NOTES:
      return { ...state, notes: [...action.notes] };
    default:
      return state;
  }
};

export default noteReducer;
