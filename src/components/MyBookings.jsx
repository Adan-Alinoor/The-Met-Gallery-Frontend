import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './MyBookings.css';
import "./BackToEventsButton.css";
import EventsNavbar from "./EventsNavbar";

const MyBookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBookings = async () => {
    const session = JSON.parse(localStorage.getItem("session"));
    const token = session?.accessToken;

    if (!token) {
      navigate("/login"); // Redirect to login if no token is found
      return;
    }

    try {
      const response = await axios.get(
        "https://the-met-gallery-backend.onrender.com/bookings?user_specific=true",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (Array.isArray(response.data)) {
        setBookings(response.data);
      } else {
        console.error("Unexpected response format:", response.data);
        setBookings([]);
      }
    } catch (error) {
      setError("Error fetching bookings. Please try again later.");
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [navigate]);

  const handleBookEventClick = (eventId) => {
    const session = JSON.parse(localStorage.getItem("session"));
    const token = session?.accessToken;

    if (!token) {
      navigate("/login", { state: { eventId } }); // Pass the event ID to the login page
    } else {
      navigate(`/events/${eventId}`); // Proceed to the event details page if authenticated
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="my-bookings-list">
      <EventsNavbar />
      <h1>My Bookings</h1>
      {bookings.length === 0 ? (
        <div className="no-bookings-message">
          <p>You have not yet booked any events. Book now!</p>
          <button className="create-booking-button" onClick={() => handleBookEventClick(null)}>
            Book Event
          </button>
        </div>
      ) : (
        <div className="bookings-list">
          {bookings.map((booking) => (
            <div key={booking.id} className="booking-item">
              {booking.event ? (
                <>
                  <img
                    src={booking.event.image_url}
                    alt={booking.event.title || "No title"}
                  />
                  <h4>Event Name: {booking.event.title || "No title"}</h4>
                  <p>Event Location: {booking.event.location || "No location"}</p>
                  <p>Event Start Date: {booking.event.start_date || "No start date"}</p>
                  <button onClick={() => handleBookEventClick(booking.event.id)}>
                    Book Again
                  </button>
                </>
              ) : (
                <p>Event details not available</p>
              )}
            </div>
          ))}
        </div>
      )}
      <button className="back-to-events-button" onClick={() => navigate("/events")}>
        Back to Events
      </button>
    </div>
  );
};

export default MyBookings;


// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import './MyBookings.css';
// import "./BackToEventsButton.css";
// import EventsNavbar from "./EventsNavbar";

// const MyBookings = () => {
//   const navigate = useNavigate();
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Function to fetch bookings
//   const fetchBookings = async () => {
//     const session = JSON.parse(localStorage.getItem("session"));
//     const token = session?.accessToken;

//     if (!token) {
//       navigate("/login"); // Redirect to login if no token is found
//       return;
//     }

//     try {
//       const response = await axios.get(
//         "https://the-met-gallery-backend.onrender.com/bookings?user_specific=true",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       if (Array.isArray(response.data)) {
//         setBookings(response.data);
//       } else {
//         console.error("Unexpected response format:", response.data);
//         setBookings([]);
//       }
//     } catch (error) {
//       setError("Error fetching bookings. Please try again later.");
//       console.error("Error fetching bookings:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBookings();
//   }, [navigate]);

//   // Handle "Book Event" button click
//   const handleBookEventClick = () => {
//     const session = JSON.parse(localStorage.getItem("session"));
//     const token = session?.accessToken;

//     if (!token) {
//       navigate("/login"); // Redirect to login if not authenticated
//     } else {
//       navigate("/events"); // Proceed to events page if authenticated
//     }
//   };

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>{error}</p>;
//   }

//   return (
//     <div className="my-bookings-list">
//       <EventsNavbar />
//       <h1>My Bookings</h1>
//       {bookings.length === 0 ? (
//         <div className="no-bookings-message">
//           <p>You have not yet booked any events. Book now!</p>
//           <button className="create-booking-button" onClick={handleBookEventClick}>
//             Book Event
//           </button>
//         </div>
//       ) : (
//         <div className="bookings-list">
//           {bookings.map((booking) => (
//             <div key={booking.id} className="booking-item">
//               {booking.event ? (
//                 <>
//                   <img
//                     src={booking.event.image_url} // Provide a real default image URL if possible
//                     alt={booking.event.title || "No title"}
//                   />
//                   <h4>Event Name: {booking.event.title || "No title"}</h4>
//                   <p>Event Location: {booking.event.location || "No location"}</p>
//                   <p>Event Start Date: {booking.event.start_date || "No start date"}</p>
//                 </>
//               ) : (
//                 <p>Event details not available</p>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//       <button className="back-to-events-button" onClick={() => navigate("/events")}>
//         Back to Events
//       </button>
//     </div>
//   );
// };

// export default MyBookings;



// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import './MyBookings.css'


// import "./BackToEventsButton.css"; // Ensure this CSS file exists
// import EventsNavbar from "./EventsNavbar"; // Import your navbar component

// const MyBookings = () => {
//   const navigate = useNavigate();
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Function to fetch bookings
//   const fetchBookings = async () => {
//     const session = JSON.parse(localStorage.getItem("session"));
//     const token = session?.accessToken;

//     if (!token) {
//       navigate("/login"); // Redirect to login if no token is found
//       return;
//     }

//     try {
//       const response = await axios.get(
//         "https://the-met-gallery-backend.onrender.com/bookings?user_specific=true",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       if (Array.isArray(response.data)) {
//         // Ensure response is an array
//         setBookings(response.data);
//       } else {
//         console.error("Unexpected response format:", response.data);
//         setBookings([]);
//       }
//     } catch (error) {
//       setError("Error fetching bookings. Please try again later.");
//       console.error("Error fetching bookings:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBookings();
//   }, [navigate]); // This dependency array is correct for redirecting on token absence

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>{error}</p>;
//   }

//   return (
//     <div className="my-bookings-list">
//       <EventsNavbar />
//       <h1>My Bookings</h1>
//       {bookings.length === 0 ? (
//         <div className="no-bookings-message">
//           <p>You have not yet booked any events. Book now!</p>
//           <Link to="/events">
//             <button className="create-booking-button">Book Event</button>
//           </Link>
//         </div>
//       ) : (
//         <div className="bookings-list">
//           {bookings.map((booking) => (
//             <div key={booking.id} className="booking-item">
//               {booking.event ? (
//                 <>
//                   <img
//                     src={booking.event.image_url } // Provide a real default image URL if possible
//                     alt={booking.event.title || "No title"}
//                   />
//                   <h4>Event Name: {booking.event.title || "No title"}</h4>
//                   <p>
//                     Event Location: {booking.event.location || "No location"}
//                   </p>
//                   <p>
//                     Event Start Date: {booking.event.start_date || "No start date"}
//                   </p>
//                 </>
//               ) : (
//                 <p>Event details not available</p>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//       <button
//         className="back-to-events-button"
//         onClick={() => navigate("/events")}
//       >
//         Back to Events
//       </button>
//     </div>
//   );
// };

// export default MyBookings;
