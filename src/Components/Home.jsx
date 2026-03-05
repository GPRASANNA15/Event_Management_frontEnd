import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteEvent, getAllEvents, getByCategory, getByEvent, getByVenue, updateEvent } from "../Service/EvenService";
import { getSpeakerbyEvent, updateSpeaker } from "../Service/SpeakerService";
import { addRegistration } from "../Service/RegisterService";
function Home() {
  const [update, setUpdate] = useState(false);
  const role = useSelector(state => state.user.role);
  const userId=useSelector(state=>state.user.id);
  const navigate = useNavigate();
  const [filtervalue, setFilterValue] = useState("");
  const [data, setData] = useState([]);
  const [updateData, setUpdateData] = useState();
  const [id, setId] = useState(0);
  const [updateId, setUpdateId] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [speaker, setSpeaker] = useState([]);
  const [speakerData, setSpeakerData] = useState({});
  const [UpdateSpeaker, setUpdateSpeaker] = useState(false);
  useEffect(() => {
    async function fetchEvents() {
      const res = await getAllEvents();
      console.log(res);
      setData(res.data);
    }
    fetchEvents();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setUpdateData(prev => ({
      ...prev,
      [name]: value,
    }))

  }
  function handleUpdateform(id) {
    setId(id);
    setUpdate(true);
  }
  async function handleNameFilter() {
    const res = await getByEvent(filtervalue);
    console.log(res);
    setData(res.data);

  }
  async function handleCategory() {
    const res = await getByCategory(filtervalue);
    console.log(res);
    setData(res.data);

  }
  async function handleVenueSearch() {
    const res = await getByVenue(filtervalue);
    console.log(res);
    setData(res.data);

  }
  function handleLogout() {
    localStorage.clear("token");
    localStorage.clear("id");
    localStorage.clear("role");
    navigate("/");
  }
  async function UpdateData() {
    const res = await updateEvent(id, updateData);
    console.log(res);
    alert("updated Successfully");
  }

  async function handleDelete(id) {
    const res = await deleteEvent(id);
    console.log(res);
    alert("Deleted!!!");
  }
  async function handleView(id) {
    setIsOpen(true);
    const res = await getSpeakerbyEvent(id);
    setSpeaker([res.data]);
    console.log(res);
  }

  function UpdateChange(e) {
    const { name, value, files } = e.target;

    setSpeakerData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  }

  async function handleUpdate() {
    const formData = new FormData();

    Object.keys(speakerData).forEach(key => {
      formData.append(key, speakerData[key]);
    });
    const res = await updateSpeaker(updateId, formData);
    console.log(res);
    alert("Updated Successfully");
  }
  function handleUpdateSpeaker(id) {
    setUpdateSpeaker(true);
    setUpdateId(id);
  }

  async function handleEventRegister(id){
    const data={
      userId:userId,
      eventId:id
    }
    try{
    const res=await addRegistration(data);
    console.log(res);
    }
    catch(err)
    {
      alert("Error in registering event");
    }
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
        <span className="navbar-brand fw-bold">Event Manager</span>


        <div className="mx-auto d-flex align-items-center gap-2">


          <input
            type="text"
            className="form-control"
            placeholder="Search events..."
            onChange={(e) => setFilterValue(e.target.value)}
            style={{ width: "250px" }}
          />


          <button className="btn btn-outline-light btn-sm" onClick={handleNameFilter}>
            Name
          </button>

          <button className="btn btn-outline-light btn-sm" onClick={handleVenueSearch}>
            Venue
          </button>

          <button className="btn btn-outline-light btn-sm" onClick={handleCategory}>
            Category
          </button>

        </div>

        {/* RIGHT SIDE MENU */}
        <div className="ms-auto d-flex align-items-center gap-3">
          {role === "ADMIN" && (
            <Link to="/event" className="nav-link text-white">
              View Events
            </Link>
          )}

          <Link to="/registeredEvents" className="nav-link text-white">
            View Registrations
          </Link>
          {role === "ADMIN" && (
            <Link to="/register" className="nav-link text-white">Registration</Link>
          )}
          <Link to="/profile">
            <img
              src="/profile.jpg"
              alt="Profile"
              className="rounded-circle"
              width="40"
              height="40"
            />
          </Link>

          <button className="btn btn-danger btn-sm" onClick={handleLogout}>
            Logout
          </button>

        </div>
      </nav>

      {!isOpen && (
        <div className="container mt-4">
          <div className="row">


            <div className="col-lg-4 col-md-6 mb-4">
              {data.length > 0 ? (
                <div className="card shadow-sm h-100">

                  {data.map(detail => (
                    <div className="card-body">

                      <h5 className="card-title">Event Title:{detail.title}</h5>

                      <p className="card-text">
                        Event description :{detail.description}
                      </p>

                      <p className="mb-1">
                        <strong>Date:</strong>{detail.date}
                      </p>

                      <p className="mb-1">
                        <strong>Timings</strong>{detail.time}
                      </p>

                      <p className="mb-1">
                        <strong>Venue:</strong> {detail.venue}
                      </p>

                      <p>
                        <strong>Total Seats:</strong>{detail.totalCount}
                      </p>

                      <button className="btn btn-primary  mb-2" onClick={() => handleView(detail.id)}>
                        View Speaker
                      </button>
                   {role==="ADMIN" &&(
                      <button className="btn btn-danger mb-2 " onClick={() => handleDelete(detail.id)}>
                        Delete Event
                      </button>)}
                      {role==="ADMIN" &&(
                      <button className="btn btn-secondary mb-2 " onClick={() => handleUpdateform(detail.id)}>
                        Update Event
                      </button>)}
                      <button className="btn btn-success mb-2" onClick={()=> handleEventRegister(detail.id)}>Register</button>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No Events Added </p>
              )}
            </div>

          </div>
        </div>
      )}
      {update && (
        <div className="card shadow mb-4">
          <div className="card-body">
            <h4 className="mb-3">Update  Event</h4>

            <div className="mb-3">
              <label className="form-label">Event title</label>
              <input type="text" className="form-control" placeholder="Enter event title" name="title" onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">Event description</label>
              <input type="text" className="form-control" placeholder="Enter event description" name="description" onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">Event Date</label>
              <input type="text" className="form-control" placeholder="Enter event date" name="date" onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">Event Timings</label>
              <input type="text" className="form-control" placeholder="Enter event timings" name="timings" onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">Event total Seats</label>
              <input type="text" className="form-control" placeholder="Enter total seats" name="totalCount" onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">Event Venue</label>
              <input type="text" className="form-control" placeholder="Enter the venue" name="venue" onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className="form-label">Event Category</label>
              <input type="text" className="form-control" placeholder="Enter event category" name="category" onChange={handleChange} />
            </div>

            <button className="btn btn-primary" onClick={UpdateData}>
              Update Event
            </button>
            <button className="btn btn-danger" onClick={() => setUpdate(false)}>Cancel</button>
          </div>
        </div>
      )}

      {isOpen && (
        <div className="container mt-5 d-flex justify-content-center">
          {speaker.map(det => (
            <div className="card" style={{ width: "22rem" }} key={det.id}>

              <div className="card-body text-center">

                <img
                  src={`http://localhost:8080/${det.profileUrl}`}
                  alt="Profile Picture"
                  className="rounded-circle mb-3"
                  width="120"
                  height="120"
                  style={{ objectFit: "cover" }}
                />

                <h5 className="card-title">{det.name}</h5>

                <p className="mb-1">
                  <strong>Designation:</strong> {det.designation}
                </p>

                <p>
                  <strong>Description:</strong><br />
                  {det.description}
                </p>
                <button className="btn btn-success" onClick={() => handleUpdateSpeaker(det.id)}>Update Speaker</button>
              </div>

            </div>
          ))}
        </div>
      )}
      {UpdateSpeaker && (
        <div className="card shadow">
          <div className="card-body">
            <h4 className="mb-3" >Update Speaker</h4>

            <div className="mb-3">
              <label className="form-label">Event ID</label>
              <input type="text" className="form-control" placeholder="Enter Quiz ID" name="eventId" onChange={UpdateChange} />
            </div>

            <div className="mb-3">
              <lable className="form-label">Speaker name:</lable>
              <input type="text" className="form-control" placeholder="Enter Question" name="name" onChange={UpdateChange} />
            </div>

            <div className="mb-3">
              <lable className="form-label">Designation:</lable>
              <input type="text" className="form-control" name="designation" onChange={UpdateChange} />
            </div>

            <div className="mb-3">
              <lable className="form-label">ContactNumber:</lable>
              <input type="text" className="form-control" name="contactNumber" onChange={UpdateChange} />
            </div>
            <div className="mb-3">
              <lable className="form-label">description:</lable>
              <input type="text" className="form-control" name="description" onChange={UpdateChange} />
            </div>

            <div className="mb-3">
              <lable className="form-label">Email:</lable>
              <input type="text" className="form-control" name="email" onChange={UpdateChange} />
            </div>


            <div className="mb-3">
              <lable className="form-label">Upload Speaker picture:</lable>
              <input type="file" className="form-control" name="profile" onChange={UpdateChange} />
            </div>

            <button className="btn btn-success" onClick={handleUpdate}>
              save
            </button>
          </div></div>
      )}
    </>
  );
}

export default Home;

