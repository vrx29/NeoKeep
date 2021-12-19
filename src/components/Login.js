import { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signin } from "../redux/actions/authActions";

function Login(props) {
  const [email,setEmail]=useState('')
  const [password, setPassword]= useState('')

  const login=(e)=>{
    e.preventDefault();
    const userObj = {
      email: email,
      password: password
    }
    props.signIn(userObj)
  }
  return (
    <>
      <div className="login-card">
        <h3>Login</h3>
        <p>Please your email credentials to login into NeoKeep</p>
        <form onSubmit={login}>
            <div className="field-cont">
                <label htmlFor="email">Email address</label>
                <input type="text" id="email" className="form-input" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div className="field-cont">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" className="form-input" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <div className="field-cont">
                <button className="auth-btn" type="submit">Login</button>
            </div>
        </form>
        <div className="form-footer">
          <p>Dont have an account?</p>
          <Link to="/signup" className="link">Sign Up</Link>
        </div>

      </div>
    </>
  );
}

const mapStateToProps=(state)=>{
  return {
    userId: state.userId
  }
}

const mapDispatchToProps=dispatch=>{
  return {
    signIn : (userData)=>dispatch(signin(userData))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Login);
