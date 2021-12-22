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
    case noteActions.FECTH_NOTES_REQUEST:
      return { ...state, loading: true, notes: [] };
    case noteActions.FECTH_NOTES_SUCCESS:
      return { ...state, loading: false, notes: [...action.notes] };
    case noteActions.TOGGLE_NOTES_PIN_SUCCESS: {
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.noteId
            ? // transform the one with a matching id
              { ...note, isPinned: !note.isPinned }
            : // otherwise return original todo
              note
        ),
      };
    }
    case noteActions.UPDATE_NOTE: {
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.noteObj.id
            ? // transform the one with a matching id
              {
                ...note,
                title: action.noteObj.title,
                note: action.noteObj.data,
              }
            : // otherwise return original todo
              note
        ),
      };
    }
    case noteActions.UPDATE_NOTE_COLOR: {
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.payload.id
            ? // transform the one with a matching id
              { ...note, color: action.payload.color }
            : // otherwise return original todo
              note
        ),
      };
    }
    case noteActions.REMOVE_NOTE: {
      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== action.noteId),
      };
    }
    default:
      return state;
  }
};

export default noteReducer;
