import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

const Signup = (props) => {
    const[credential, setCredential] = useState({name: "", email: "", password: "", cpassword: ""});
    let history = useHistory();
    const handleSubmit= async(e)=>{
        e.preventDefault();
       const  {name, email, password } = credential;
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body : JSON.stringify({name, email, password})
       });
       const json = await response.json();
       console.log(json)
       if (json.success){
           // save the auth-token and redirect
           localStorage.setItem('token', json.authtoken)
           history.push("/");
           props.showAlert("Account created Successfully", "success")
       }
       else{
        props.showAlert("Invalid Details", "danger")
       }
     }
 
     const onChange = (e)=>{
         setCredential({...credential, [e.target.name]: e.target.value})
     }
  return (
      <div className="container">
        <h2>Signup To Continue</h2>
    <form onSubmit={handleSubmit}>
    <div className="mb-3">
            <label htmlFor="name" className="form-label"> Name</label>
            <input type="text" className="form-control" id="name" name="name" onChange={onChange} required />
           
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" onChange={onChange} name="email" required aria-describedby="emailHelp" />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" onChange={onChange} name="password"  id="password" minLength={5} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Confirm Password</label>
            <input type="cpassword" className="form-control" id="cpassword" name="cpassword"  onChange={onChange} minLength={5}  required/>
          </div>
          
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        </div>
  )
}

export default Signup
