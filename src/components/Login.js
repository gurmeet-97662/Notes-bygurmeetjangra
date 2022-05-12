import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

const Login = (props) => {
    const[credential, setCredential] = useState({email: "", password: ""});
   let history = useHistory();

    const handleSubmit= async(e)=>{
       e.preventDefault();
       const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body : JSON.stringify({email: credential.email, password: credential.password})
      });
      const json = await response.json();
      console.log(json)
      if (json.success){
          // save the auth-token and redirect
          localStorage.setItem('token', json.authtoken)
          history.push("/");
          props.showAlert("Logged In Successfully", "success")
      }
      else{
        props.showAlert("Invalid Credential", "danger")
      }
    }

    const onChange = (e)=>{
        setCredential({...credential, [e.target.name]: e.target.value})
    }

  return (
     <div className="container">
         <h2>Login To Continue</h2>
    <form onSubmit={ handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" value={credential.email} name="email" onChange={onChange} id="email" aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" value={credential.password} onChange={onChange}c name="password" id="password" />
          </div>
          <button type="submit" className="btn btn-primary" >Submit</button>
        </form>
        </div>
  )
}

export default Login
