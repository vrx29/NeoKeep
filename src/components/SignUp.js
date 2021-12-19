import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { signup, getAuthState } from "../redux/actions/authActions";
import { connect, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isLoaded,isEmpty } from 'react-redux-firebase'


function SignUp(props) {
  // const auth = useSelector(state => state.firebase.auth)
  
  let navigate= useNavigate()
    const [formdata, setFormdata] = useState({name:"",email:"",password: ""})
  
    
    const submitHandler=(e)=>{
        e.preventDefault();
        props.signUp(formdata);
        
        setFormdata({name:"",email:"",password: ""})
    }
    return (
      <>
        <div className="login-card">
          <h3>Sign Up</h3>
          <p>Please create your account to use NeoKeep</p>
          <form onSubmit={submitHandler}>
             <div className="field-cont">
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" className="form-input" value={formdata.name} onChange={(e)=>setFormdata({...formdata,name:e.target.value})}/>
              </div>
              <div className="field-cont">
                  <label htmlFor="email">Email address</label>
                  <input type="text" id="email" className="form-input" value={formdata.email} onChange={(e)=>setFormdata({...formdata,email:e.target.value})}/>
              </div>
              <div className="field-cont">
                  <label htmlFor="password">Password</label>
                  <input type="password" id="password" className="form-input" value={formdata.password} onChange={(e)=>setFormdata({...formdata,password:e.target.value})}/>
              </div>
              <div className="field-cont">
                  <button className="auth-btn" type="submit">Sign Up</button>
              </div>
          </form>
          <div className="form-footer">
          <p>Already have an account?</p>
          <Link to="/login" className="link">Login</Link>
        </div>
        </div>
      </>
    );
  }
  

  const mapDispatchToProps=dispatch=>{
    return {
      signUp: (userData)=>dispatch(signup(userData)),
      getAuthState: ()=>dispatch(getAuthState())
    }
  }
  export default connect(null,mapDispatchToProps)(SignUp);
  