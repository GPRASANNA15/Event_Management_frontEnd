import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CancelRegistration, getRegistrationByUser } from "../Service/RegisterService";
import { useSelector } from "react-redux";

function RegisteredEvents() {

  const id = useSelector(state => state.user.id);

  const [events, setEvents] = useState([]);
  const [cancelState, setCancelState] = useState([]); // store cancelled ids

  useEffect(() => {
    async function getData() {
      const res = await getRegistrationByUser(id);
      setEvents(res.data);
    }
    getData();
  }, [id]);

  // cancel registration
  async function handleDelete(registrationId) {
    const res = await CancelRegistration(registrationId);
    console.log(res);

    // store cancelled registration id
    setCancelState(prev => [...prev, registrationId]);
  }

  return (
    <>
      <div className="container py-5">

        <h2 className="mb-4 text-center">My Registered Events</h2>

        {events.length > 0 ? (

          <div className="row g-4">

            {events.map(event => (

              <div className="col-md-6 col-lg-4" key={event.registrationId}>

                <div className="card shadow-sm h-100">

                  <div className="card-body">

                    <p className="card-text mb-2">
                      <strong>Event name:</strong><br />
                      {event.eventTitle}
                    </p>

                    <p className="card-text mb-2">
                      <strong>Registered Id:</strong><br />
                      {event.registrationId}
                    </p>

                    <p className="card-text mb-2">
                      <strong>Venue:</strong><br />
                      {event.eventVenue}
                    </p>

                    <p className="card-text mb-2">
                      <strong>Registered At:</strong><br />
                      {event.registeredAt}
                    </p>

                    <p className="card-text mb-2">
                      <strong>Date:</strong><br />
                      {event.eventDate}
                    </p>

                    {/* ✅ STATUS CHANGE LOGIC */}
                    <p className="card-text">
                      <strong>Status:</strong>

                      {cancelState.includes(event.registrationId) ? (
                        <span className="badge bg-danger ms-2">
                          CANCELLED
                        </span>
                      ) : (
                        <span className="badge bg-primary ms-2">
                          {event.status}
                        </span>
                      )}
                    </p>

                  </div>

                  <div className="card-footer text-end bg-white border-0">

                    {/* disable button after cancel */}
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(event.registrationId)}
                      disabled={cancelState.includes(event.registrationId)}
                    >
                      cancel
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        ) : (
          <p>You didn't register for any event</p>
        )}

      </div>

      <button className="btn btn-primary">
        <Link
          style={{ color: "white", textDecoration: "none" }}
          to="/home"
        >
          Home
        </Link>
      </button>
    </>
  );
}

export default RegisteredEvents;