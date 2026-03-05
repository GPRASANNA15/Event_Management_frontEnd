import { useState } from "react";
import { addEvent } from "../Service/EvenService";
import { addSpeaker, updateSpeaker } from "../Service/SpeakerService";

function EventManagement(){
    const [data,setData]=useState({});
    const[name,setName]=useState("");
    const[number,setNumber]=useState(0);
    const[email,setEmail]=useState("");
    const[eventId,setEventId]=useState(0);
    const[designation,setDesignation]=useState("");
    const[profile,setProfile]=useState("");
    const[description,setDescription]=useState("");
   
   async function handleAdd()
    {
        const form=new FormData();
        form.append("name",name);
        form.append("email",email);
        form.append("contactNumber",number);
        form.append("eventId",eventId);
        form.append("designation",designation);
        form.append("description",description);
        form.append("profile",profile);
        const res=await addSpeaker(form);
        console.log(res);
        alert("Speaker added successfully");
    }
    function handleChange(e){
        const {name,value}=e.target;
        setData(prev=>({
            ...prev,
            [name]:value,
        }))
    }
    async function handleEvent() {
        console.log(data);
        const res=await addEvent(data);
        console.log(res);
        alert("Added successfully");
    }
    
    
    return(
        <>
         <div className="card shadow mb-4">
        <div className="card-body">
            <h4 className="mb-3">Create Event</h4>

            <div className="mb-3">
                <label className="form-label">Event title</label>
                <input type="text" className="form-control" placeholder="Enter Event title" name="title" onChange={handleChange} />
            </div>
             <div className="mb-3">
                <label className="form-label">Event description</label>
                <input type="text" className="form-control" placeholder="Enter Event description" name="description" onChange={handleChange} />
            </div>
            <div className="mb-3">
                <label className="form-label">Event Date</label>
                <input type="text" className="form-control" placeholder="Enter date" name="date" onChange={handleChange} />
            </div>
             <div className="mb-3">
                <label className="form-label">Event Timings</label>
                <input type="text" className="form-control" placeholder="Enter event timings" name="time" onChange={handleChange} />
            </div>
             <div className="mb-3">
                <label className="form-label">Event total Seats</label>
                <input type="text" className="form-control" placeholder="Enter the total count" name="totalCount" onChange={handleChange}/>
            </div>
            <div className="mb-3">
                <label className="form-label">Event Venue</label>
                <input type="text" className="form-control" placeholder="Enter venue" name="venue" onChange={handleChange}/>
            </div>
            <div className="mb-3">
                <label className="form-label">Event Category</label>
                <input type="text" className="form-control" placeholder="Enter category" name="category" onChange={handleChange}/>
            </div>

            <button className="btn btn-primary" onClick={handleEvent}>
                Create Event
            </button>
        </div>
    </div>

    <div className="card shadow">
        <div className="card-body">
            <h4 className="mb-3" >Add Speaker</h4>
             
              <div className="mb-3">
                <label className="form-label">Event ID</label>
                <input type="text" className="form-control" placeholder="Enter event ID" name="eventId" onChange={(e)=>setEventId(e.target.value)} />
            </div>

            <div className="mb-3">
                <lable className="form-label">Speaker name:</lable>
                <input type="text" className="form-control" placeholder="Enter name"  name="name" onChange={(e)=>setName(e.target.value)}/>
            </div>

            <div className="mb-3">
                <lable className="form-label">Designation:</lable>
                <input type="text" className="form-control" name="designation" onChange={(e)=>setDesignation(e.target.value)} />
            </div>

            <div className="mb-3">
                <lable className="form-label">ContactNumber:</lable>
                <input type="text" className="form-control" name="contactNumber" onChange={(e)=>setNumber(e.target.value)} />
            </div>
            <div className="mb-3">
                <lable className="form-label">description:</lable>
                <input type="text" className="form-control" name="description" onChange={(e)=>setDescription(e.target.value)} />
            </div>

            <div className="mb-3">
                <lable className="form-label">Email:</lable>
                <input type="text" className="form-control" name="email" onChange={(e)=>setEmail(e.target.value)}/>
            </div>


            <div className="mb-3">
                <lable className="form-label">Upload Speaker picture:</lable>
                <input type="file" className="form-control" name="profile" onChange={(e)=>setProfile(e.target.files[0])}/>
            </div>

            <button className="btn btn-success" onClick={handleAdd}>
                Add Speaker
            </button>
            
        </div>
    </div>
   
        </>
    )
}
export default EventManagement;