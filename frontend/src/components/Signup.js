import React , {useState ,} from 'react'
import { Navigate, useNavigate } from "react-router-dom";

export default function Signup() {

    const [credential , setCredential] = useState({name : "" ,  email : "" , password: "" , cpassword : ""})

    // let history = unstable_HistoryRouter()
    const navigate = useNavigate();

    const handleSubmit = async (e)=>{
        e.preventDefault();

        // console.log("login pressed")
        // const url = "http://localhost:5000/api/auth/login";
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({name : credential.name , email : credential.email ,password : credential.password}),
        });

        const json = await response.json() ;
        console.log(json);

        localStorage.setItem('token',json.token);
        navigate("/")

    }

    const onChange =(e)=>{
                setCredential({...credential , [e.target.name] : [e.target.value]})
        }

  return (
    <div className='container'>

<form onSubmit={handleSubmit}>

  <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" name="name" aria-describedby="emailHelp" value={credential.name} onChange={onChange}  />
  </div>

  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" value={credential.email} onChange={onChange}   />
  </div>
  {/* <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div> */}
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name="password" value={credential.password} onChange={onChange} />
  </div>

  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" id="cpassword" name="cpassword" value={credential.cpassword} onChange={onChange} />
  </div>

  <button type="submit" className="btn btn-primary">Submit</button>
</form>

    </div>
  )
}
