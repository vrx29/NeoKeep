import { connect } from "react-redux";
import CreateNote from "./CreateNote";
import PinnedNotes from "./PinnedNotes";
import OtherNotes from "./OtherNotes";

function Dashboard(props) {
  return (
    <div className="dashboard">
      <CreateNote />
      <PinnedNotes />
      <OtherNotes />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
export default connect(mapStateToProps)(Dashboard);
