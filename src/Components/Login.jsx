import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../Service/UserService";
import { useDispatch } from "react-redux";
import { setRole,setToken,setId } from "../Redux/UserSlice";
function Login(){
    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[loginError,setLoginError]=useState("");
  const navigate=useNavigate();
  const dispatch=useDispatch();
  async function handleLogin(){
        const data={
          email:email,
          password:password
        } 
      try{
        const res=await loginUser(data);
        console.log(res);
        dispatch(setId(res.data.id));
        dispatch(setRole(res.data.role));
        dispatch(setToken(res.data.token));
        localStorage.setItem("id",res.data.id);
        localStorage.setItem("token",res.data.token);
        localStorage.setItem("role",res.data.role);
         navigate("/home");

      }
      catch(err)
      {
        setLoginError("Invalid Credentials");
      }
  }
  function handleRegister(){
  
   navigate("/user");
  }
    return(
        <>
        <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow p-4" style={{ width: "400px" }}>
        <h3 className="text-center mb-4">Login</h3>

        <form>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="d-grid mb-2">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
             {loginError &&(<p style={{color:"red"}}>{loginError}</p>)}
          <div className="d-grid">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={handleRegister}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
        </>
    )
}
export default Login;