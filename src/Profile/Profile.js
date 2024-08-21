import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");
  const [addedEvents, setAddedEvents] = useState([]);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const navigate = useNavigate(); // Initialize the navigate hook

  useEffect(() => {
    // Function to decode token and fetch user details
    const decodeTokenAndFetchEvents = async () => {
      const token = localStorage.getItem("authToken"); // Retrieve token from localStorage

      if (token) {
        try {
          // Decode the token
          const decoded = jwtDecode(token);
          setEmail(decoded.email);
          setUserId(decoded.id);

          // Fetch all events
          const response = await axios.get("http://localhost:3000/api/events", {
            headers: {
              Authorization: `Bearer ${token}`, // Send token in headers
            },
          });
          console.log(response.data);
          const allEvents = response.data;

          // Filter events added by the user
          const userAddedEvents = allEvents.filter(
            (event) => event.addedBy == decoded.id
          );
          setAddedEvents(userAddedEvents);

          // Filter events the user is registered for
          const userRegisteredEvents = allEvents.filter((event) =>
            event.attendees.includes(decoded.id)
          );
          setRegisteredEvents(userRegisteredEvents);
        } catch (error) {
          console.error("Error decoding token or fetching events:", error);
        }
      } else {
        console.error("No token found");
      }
    };

    decodeTokenAndFetchEvents();
  }, []);

  // Function to handle event click and navigate to event details
  const handleEventClick = (eventId) => {
    navigate(`/event/${eventId}`); // Navigate to event details page
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Profile
      </h1>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Email:
        </h2>
        <p className="text-gray-700 dark:text-gray-400">{email}</p>
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Events Added
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {addedEvents.map((event) => (
            <div
              key={event.id}
              className="relative bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 overflow-hidden cursor-pointer"
              style={{
                backgroundImage: `url(${event.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              onClick={() => handleEventClick(event._id)} // Handle click event
            >
              <div className="absolute inset-0 bg-black opacity-30"></div>
              <div className="relative p-4 text-white">
                <h3 className="text-lg font-semibold">{event.title}</h3>
                <p>
                  <strong>Date:</strong> {event.eventDate}
                </p>
                <p>
                  <strong>Venue:</strong> {event.venue}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Events Registered
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {registeredEvents.map((event) => (
            <div
              key={event.id}
              className="relative bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 overflow-hidden cursor-pointer"
              style={{
                backgroundImage: `url(${event.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              onClick={() => handleEventClick(event._id)} // Handle click event
            >
              <div className="absolute inset-0 bg-black opacity-30"></div>
              <div className="relative p-4 text-white">
                <h3 className="text-lg font-semibold">{event.title}</h3>
                <p>
                  <strong>Date:</strong> {event.eventDate}
                </p>
                <p>
                  <strong>Venue:</strong> {event.venue}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
