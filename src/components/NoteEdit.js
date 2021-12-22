import { useState } from "react";
import { BsFillPinAngleFill, BsFillPinFill } from "react-icons/bs";
import { BsTrash } from "react-icons/bs";
import ColorBar from "./ColorBar";
import { connect } from "react-redux";
import {
  deleteNote,
  togglePin,
  updateNote,
} from "../redux/actions/noteActions";

function NoteEdit({ note, updatePinnedNote, updateNote, deleteNote }) {
  const [title, setTitle] = useState(note.title);
  const [noteData, setNoteData] = useState(note.note);
  let enableUpdate = false;
  const togglePin = () => {
    updatePinnedNote(note.id);
  };

  const updateNoteData = () => {
    const noteObj = {
      id: note.id,
      title: title,
      data: noteData,
    };

    updateNote(noteObj);
    enableUpdate = false;
  };

  if (note.title !== title || note.note !== noteData) {
    enableUpdate = true;
  }

  const delNote = () => {
    deleteNote(note.id);
  };
  return (
    <>
      <div className={`note-card ${note.color}`}>
        <div className="note-card-head">
          <div
            className="note-card-title"
            contentEditable="true"
            suppressContentEditableWarning={true}
            onInput={(e) => setTitle(e.currentTarget.textContent)}
          >
            {note.title}
          </div>
          <span className="pin-icon" onClick={() => togglePin()}>
            {note.isPinned ? (
              <BsFillPinFill className="pinned" />
            ) : (
              <BsFillPinAngleFill className="unpinned" />
            )}
          </span>
          <div
            className="note-card-note"
            contentEditable="true"
            suppressContentEditableWarning={true}
            onInput={(e) => setNoteData(e.currentTarget.textContent)}
          >
            {note.note}
          </div>
        </div>
        <div className="note-card-footer">
          <ColorBar noteId={note.id} />
          <div className="note-card-action-btns">
            <button className="delete-btn" onClick={delNote}>
              <span className="delete-icon">
                <BsTrash />
              </span>
            </button>
            <button
              className="save-btn"
              onClick={updateNoteData}
              disabled={!enableUpdate}
            >
              SAVE
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    note: ownProps.note,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updatePinnedNote: (noteId) => dispatch(togglePin(noteId)),
    updateNote: (noteObj) => dispatch(updateNote(noteObj)),
    deleteNote: (noteId) => dispatch(deleteNote(noteId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NoteEdit);
