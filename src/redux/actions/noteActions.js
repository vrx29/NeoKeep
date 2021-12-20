import * as noteActions from "./actions";

const addNoteReq = () => {
  return {
    type: noteActions.ADD_NOTE_REQUEST,
  };
};

const addNoteSuc = (note) => {
  return {
    type: noteActions.ADD_NOTE_SUCCESS,
    note: note,
  };
};

const addNoteFail = (error) => {
  return {
    type: noteActions.ADD_NOTE_FAILED,
    error: error,
  };
};

const fetchNotes = (notes) => {
  return {
    type: noteActions.FECTH_NOTES,
    notes: notes,
  };
};

export const addNote = (note) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    dispatch(addNoteReq());
    const uid = getState().firebase.auth.uid;
    try {
      //inserting data in notes collection
      const noteRef = await firestore.add({ collection: "notes" }, { ...note });
      const noteId = noteRef.id;
      //updating user collection
      const docRef = await firestore.collection("users").doc(uid);
      await docRef.update({
        notes: firestore.FieldValue.arrayUnion(noteId),
      });
      dispatch(addNoteSuc(note));
    } catch (error) {
      dispatch(addNoteFail(error));
      //   setTimeout(() => {
      //     dispatch(removeError());
      //   }, 2000);
    }
  };
};

export const getNotes = () => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const uid = getState().firebase.auth.uid;
    const docRef = await firestore.collection("users").doc(uid).get();
    const NoteIds = await docRef.data().notes;
    let notes = [];
    NoteIds.forEach(async (id) => {
      const note = await firestore.collection("notes").doc(id).get();
      notes.push(note.data());
    });
    // console.log(notes);
    dispatch(fetchNotes(notes))
  };
};
