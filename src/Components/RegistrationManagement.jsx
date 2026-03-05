import { useEffect, useState } from "react";
import { getAllRegistrations } from "../Service/RegisterService";

function RegistrationManagement() {
    const[details,setDetails]=useState([]);
    useEffect(()=>{
        async function getRegistrations()
        {
            const res=await getAllRegistrations();
            setDetails(res.data);
        }
        getRegistrations();
    },[]);
    return (
        <>
            <div className="container mt-4">
                {details.length>0?(
                <div className="card" style={{max-width: "400px", margin:"auto"}}>
                 {details.map(det=>(
                    <div className="card-body" key={det.id}>
                        <h5 className="card-title text-center mb-3">Registration Details</h5>

                        <p><strong>Registered ID:</strong> {det.registeredId ? det.registeredId:"N/A"}</p>
                        <p><strong>Event Title:</strong> {det.eventName ?det.eventName: "N/A"}</p>
                        <p><strong>Registered At:</strong> {det.registeredAt ?det.registeredAt: "N/A"}</p>
                        <p><strong>User name:</strong>{det.userName?det.userName:"N/A"} </p>
                        <p>
                            <strong>Status:</strong><span className="badge bg-primary">{det.status?det.status:"N/A"}</span>
                        </p>
                    

                    </div>
                    ))}
                </div>
                ):(
                    <p>No Registrations</p>
                )}
            </div>


        </>
    )
}
export default RegistrationManagement;
