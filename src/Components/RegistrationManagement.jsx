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
            <div class="container mt-4">
                {details.length>0?(
                <div class="card" style="max-width: 400px; margin:auto;">
                 {details.map(det=>(
                    <div class="card-body">
                        <h5 class="card-title text-center mb-3">Registration Details</h5>

                        <p><strong>Registered ID:</strong> {det.registeredId}</p>
                        <p><strong>Event Title:</strong> {det.eventName}</p>
                        <p><strong>Registered At:</strong> {det.registeredAt}</p>
                        <p><strong>User name:</strong>{det.userName} </p>
                        <p>
                            <strong>Status:</strong><span class="badge bg-primary">{det.status}</span>
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