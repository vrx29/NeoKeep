import { connect } from "react-redux";
import { getNotes } from "../redux/actions/noteActions";
import NoteEdit from "./NoteEdit";

function PinnedNotes({ getNotes, notes }) {
  return (
    <>
      <h3>PINNED NOTES</h3>
      <div className="notes-cont">
        {notes.map(
          (item, id) => item.isPinned && <NoteEdit note={item} key={id} />
        )}
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    notes: state.note.notes,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getNotes: () => dispatch(getNotes()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PinnedNotes);
