import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getUserById, updateUser } from "../Service/UserService";
import { useSelector } from "react-redux";
function Profile(){
     const id=useSelector(state=>state.user.id);
    const[isUpdate,setIsUpdate]=useState(false);
    const[details,setDetails]=useState([]);
    const[data,setData]=useState();
    useEffect(()=>{
      async function getProfile(){
        const res=await getUserById(id);
        console.log(res);
          setDetails([res.data]);
      }
      getProfile();
    },[]);
    function handlechange(e){
      const{name,value}=e.target;
      setData(prev=>({...prev,
        [name]:value
      }))
}

    async  function handleSave(){
      try{
         const res=await updateUser(id,data);
         alert("updated successfully");
      }
      catch(err){
        alert("Error in update fields");
      }
     }
    return(
        <>
        <div className="container mt-5">
  <div className="card shadow">
    <div className="card-header bg-primary text-white">
      <h4 className="mb-0">User Profile</h4>
    </div>

    <div className="card-body">
     {details.map(det=>(
        <form>
          <div className="mb-3 row">
            <label className="col-sm-3 col-form-label fw-bold">
              Username:
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                className="form-control"
                value={det.userName}
                readOnly
              />
            </div>
          </div>

          <div className="mb-3 row">
            <label className="col-sm-3 col-form-label fw-bold">
             Email:
            </label>
            <div className="col-sm-9">
              <input
                type="email"
                className="form-control"
                value={det.email}
                 readOnly
              />
            </div>
          </div>

          <div className="mb-3 row">
            <label className="col-sm-3 col-form-label fw-bold">
             Contact Number:
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                className="form-control"
                value={det.contactNumber}
                readOnly
              />

            </div>
          </div>
        </form>
    ))}
    </div>
  </div>
</div>
<button className="btn btn-primary mt-4"><Link style={{color:"white",textDecoration:"none"}} to={"/home"}>Home</Link></button>
<button className="btn btn-secondary mt-4" onClick={()=>setIsUpdate(true)}>Update</button>

{isUpdate &&(
    <form>
            
         
            <div className="mb-3">
              <label className="form-label fw-bold">Name</label>
              <input
                type="text"
                className="form-control"
                name="userName"
                placeholder="Enter your name"
                onChange={handlechange}
              />
            </div>

          
            <div className="mb-3">
              <label className="form-label fw-bold">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                 onChange={handlechange}
                 placeholder="Enter your email"
               
              />
            </div>

            
            <div className="mb-3">
              <label className="form-label fw-bold">Password</label>
              <input
              type="password"
               onChange={handlechange}
                className="form-control"
                name="password"
               placeholder="Enter your password"
             
              />
            </div>
            <button type="button" className="btn btn-success"  onClick={handleSave}>
                Save
              </button>
          

          </form>
)}
        </>
    )
}
export default Profile;