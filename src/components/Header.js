import { Link } from "react-router-dom";
import { isLoaded, isEmpty } from "react-redux-firebase";
import { connect, useSelector } from "react-redux";
import { signout } from "../redux/actions/authActions";

function Header({ signOut }) {
  const auth = useSelector((state) => state.firebase.auth);

  return (
    <>
      <nav>
        <Link to="/" className="link">
          <h2 className="head-logo">NeoKeep</h2>
        </Link>
        <div className="head-actions">
          {isLoaded(auth) && isEmpty(auth) ? (
            <Link to="/login">
              <button className="nav-btn">Login</button>
            </Link>
          ) : (
            <>
              <p>{auth.email}</p>
              <Link to="/login">
                <button className="nav-btn" onClick={() => signOut()}>
                  Logout
                </button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signout()),
  };
};

export default connect(null, mapDispatchToProps)(Header);
