import { useState } from "react";
import ColorBar from "./ColorBar";
import { BsFillPinAngleFill } from "react-icons/bs";
import { BsFillPinFill } from "react-icons/bs";
import { connect } from "react-redux";
import { addNote } from "../redux/actions/noteActions";

function CreateNote({ addNote }) {
  const [isActive, setIsActive] = useState(false);
  const [title, setTitle] = useState("");
  const [noteContent, setNoteContent] = useState("");
  const [noteColor, setNoteColor] = useState("bar-white");
  const [isPinned, setIsPinned] = useState(false);

  const clearContent = () => {
    setIsActive(false);
    setTitle("");
    setNoteContent("");
    setNoteColor("bar-white");
  };
  const submitNote = () => {
    let note = {
      title: title,
      note: noteContent,
      color: noteColor,
      isPinned: isPinned,
    };
    addNote(note);
    clearContent();
  };
  return (
    <>
      <div className="note-cont" onFocus={() => setIsActive(true)}>
        {isActive && (
          <>
            <input
              placeholder="Title"
              className="note-input title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <span className="pin-icon" onClick={() => setIsPinned(!isPinned)}>
              {isPinned ? (
                <BsFillPinFill className="pinned" />
              ) : (
                <BsFillPinAngleFill className="unpinned" />
              )}
            </span>
          </>
        )}
        <input
          placeholder="Take a note"
          className="note-input note"
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
        />
        {isActive && (
          <div className="note-footer">
            <div className="colors-cont">
              <ColorBar setColor={setNoteColor} />
            </div>
            <div>
              <button onClick={() => setIsActive(false)} className="clear-btn">
                CLEAR
              </button>
              <button onClick={submitNote} className="add-btn">
                ADD
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    addNote: (noteObj) => dispatch(addNote(noteObj)),
  };
};
export default connect(null, mapDispatchToProps)(CreateNote);
