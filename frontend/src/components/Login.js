import React, { useState } from 'react'
// import { unstable_HistoryRouter } from 'react-router-dom';


export default function Login() {

    const [credential , setCredential] = useState({email : "" , password: ""})

    // let history = unstable_HistoryRouter()

    const handleSubmit = async (e)=>{
        e.preventDefault();

        // console.log("login pressed")
        // const url = "http://localhost:5000/api/auth/login";
        const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({email : credential.email ,password : credential.password}),
        });

        const json = await response.json() ;
        console.log(json);

        if(json.success){
            localStorage.setItem('token',json.token);
        }else{
            alert("Invalid Credential")
        }

    }

    const onChange =(e)=>{
                setCredential({...credential , [e.target.name] : [e.target.value]})
        }

  return (  
    <>
    
    <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" value={credential.email} onChange={onChange} />
  </div>
  {/* <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div> */}
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name="password" value={credential.password} onChange={onChange}/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </>
  )
}
