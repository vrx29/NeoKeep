import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { signin } from "../redux/actions/authActions";
import { getNotes } from "../redux/actions/noteActions";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (props.auth?.uid) {
      props.getNotes();
      navigate("/");
    }
  }, [props,navigate]);
  const login = (e) => {
    e.preventDefault();
    const userObj = {
      email: email,
      password: password,
    };
    props.getNotes();
    props.signIn(userObj);
    navigate("/");
  };
  return (
    <>
      <div className="login-card">
        <h3>Login</h3>
        <p>Please your email credentials to login into NeoKeep</p>
        <form onSubmit={login}>
          <div className="field-cont">
            <label htmlFor="email">Email address</label>
            <input
              type="text"
              id="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="field-cont">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="field-cont">
            <button className="auth-btn" type="submit">
              Login
            </button>
          </div>
        </form>
        <div className="form-footer">
          <p>Dont have an account?</p>
          <Link to="/signup" className="link">
            Sign Up
          </Link>
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getNotes: () => dispatch(getNotes()),
    signIn: (userData) => dispatch(signin(userData)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
