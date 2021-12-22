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

const fetchNotesReq = () => {
  return {
    type: noteActions.FECTH_NOTES_REQUEST,
  };
};

// const fetchNotesSuc = (notes) => {
//   return {
//     type: noteActions.FECTH_NOTES_SUCCESS,
//     notes: notes,
//   };
// };

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
    dispatch(fetchNotesReq());
    const firestore = getFirestore();
    const uid = getState().firebase.auth.uid;

    try {
      const docRef = await firestore.collection("users").doc(uid).get();
      const NoteIds = await docRef.data().notes;
      NoteIds.forEach(async (id) => {
        const note = await firestore.collection("notes").doc(id).get();
        const noteData = await note.data();
        dispatch(addNoteSuc({ id, ...noteData }));
      });
    } catch (error) {
      console.log(error);
      dispatch(addNoteFail(error));
    }
  };
};

const togglePinSuc = (noteId) => {
  return {
    type: noteActions.TOGGLE_NOTES_PIN_SUCCESS,
    noteId: noteId,
  };
};

export const togglePin = (noteId) => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    try {
      const noteRef = await firestore.collection("notes").doc(noteId).get();
      await noteRef.ref.update({
        isPinned: !noteRef.data().isPinned,
      });
      dispatch(togglePinSuc(noteId));
    } catch (error) {
      console.log(error);
      dispatch(addNoteFail(error));
    }
  };
};

export const updateNoteReq = (noteObj) => {
  return {
    type: noteActions.UPDATE_NOTE,
    noteObj: noteObj,
  };
};

export const updateNote = (noteObj) => {
  return async (dispatch, getState, { getFirestore }) => {
    try {
      const firestore = getFirestore();
      const noteRef = await firestore.collection("notes").doc(noteObj.id).get();
      await noteRef.ref.update({
        title: noteObj.title,
        note: noteObj.data,
      });
      dispatch(updateNoteReq(noteObj));
    } catch (error) {
      console.log(error);
      dispatch(addNoteFail(error));
    }
  };
};

const deleteNoteReq = (noteId) => {
  return {
    type: noteActions.REMOVE_NOTE,
    noteId: noteId,
  };
};

export const deleteNote = (noteId) => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const uid = getState().firebase.auth.uid;
    try {
      await firestore.collection("notes").doc(noteId).delete();
      //updating user collection
      const docRef = await firestore.collection("users").doc(uid);
      await docRef.update({
        notes: firestore.FieldValue.arrayRemove(noteId),
      });
      dispatch(deleteNoteReq(noteId));
    } catch (error) {
      console.log(error);
      dispatch(addNoteFail(error));
    }
  };
};

const updateNoteColorReq = (noteInfo) => {
  return {
    type: noteActions.UPDATE_NOTE_COLOR,
    payload: noteInfo,
  };
};

export const updateNoteColor = (noteInfo) => {
  return async (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    try {
      const noteRef = await firestore
        .collection("notes")
        .doc(noteInfo.id)
        .get();
      await noteRef.ref.update({
        color: noteInfo.color,
      });
      dispatch(updateNoteColorReq(noteInfo));
    } catch (error) {
      console.log(error);
      dispatch(addNoteFail(error));
    }
  };
};
