import { connect } from "react-redux";
import { updateNoteColor } from "../redux/actions/noteActions";
function ColorBar({ setColor, noteId, updateNoteColor }) {
  const colors = [
    "bar-pink",
    "bar-purple",
    "bar-green",
    "bar-yellow",
    "bar-white",
  ];
  const updateColor = (color) => {
    if (noteId) {
      const noteInfo = {
        id: noteId,
        color: color,
      };
      updateNoteColor(noteInfo);
    } else {
      setColor(color);
    }
  };
  return (
    <>
      <div className="colors">
        {colors.map((color, index) => (
          <button
            key={index}
            onClick={() => updateColor(color)}
            className={`color-bar-btn ${color}`}
          ></button>
        ))}
      </div>
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateNoteColor: (noteInfo) => dispatch(updateNoteColor(noteInfo)),
  };
};
export default connect(null, mapDispatchToProps)(ColorBar);
