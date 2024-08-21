import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Import jwt-decode

const ImageAndDescription = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the event ID from the URL
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);

  const getToken = () => {
    return localStorage.getItem("authToken");
  };

  useEffect(() => {
    // Decode token and set user ID
    const token = getToken();
    if (token) {
      const decodedToken = jwtDecode(token);
      setCurrentUserId(decodedToken.id);
    }

    // Fetch event data
    const fetchEvent = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/events/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setEvent(response.data);

        // Check if the user is already registered for the event
        if (response.data.attendees.includes(currentUserId)) {
          setIsRegistered(true);
        }
      } catch (error) {
        setError("Failed to load event.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id, currentUserId]);

  const handleRegister = async () => {
    try {
      const token = getToken();
      if (!token) {
        alert("Please log in to register.");
        return;
      }

      await axios.post(
        `http://localhost:3000/api/events/${id}/register`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIsRegistered(true); // Update the state to reflect registration
      alert("Successfully registered for the event!");
    } catch (error) {
      console.error("Failed to register for the event:", error);
      alert("Failed to register for the event.");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/events/${id}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      navigate("/showevent");
    } catch (error) {
      console.error("Failed to delete event.");
    }
  };

  const handleUpdate = () => {
    navigate(`/event/${id}/update`, { state: { event } });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="flex flex-col md:flex-row max-w-4xl mx-auto bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
      <img
        className="w-full md:w-1/2 rounded-t-lg md:rounded-t-none md:rounded-l-lg object-cover"
        src={event.image}
        alt={event.description}
      />
      <div className="p-6 md:w-1/2">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {event.name}
        </h2>
        <p className="mt-4 text-gray-700 dark:text-gray-400">
          {event.description}
        </p>
        <div className="mt-6 space-y-4">
          <div className="flex items-center">
            <p className="text-lg font-semibold text-gray-900 dark:text-white w-24">
              Date:
            </p>
            <p className="text-gray-700 dark:text-gray-400">
              {new Date(event.eventDate).toLocaleDateString()}
            </p>
          </div>
          <div className="flex items-center">
            <p className="text-lg font-semibold text-gray-900 dark:text-white w-24">
              Time:
            </p>
            <p className="text-gray-700 dark:text-gray-400">
              {event.eventTime}
            </p>
          </div>
          <div className="flex items-center">
            <p className="text-lg font-semibold text-gray-900 dark:text-white w-24">
              Venue:
            </p>
            <p className="text-gray-700 dark:text-gray-400">{event.venue}</p>
          </div>
        </div>
        <div className="mt-6 flex space-x-4">
          {!isRegistered ? (
            <button
              onClick={handleRegister}
              type="button"
              className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
            >
              Register
            </button>
          ) : (
            <button
              disabled
              type="button"
              className="px-4 py-2 text-white bg-green-600 rounded-lg"
            >
              Registered
            </button>
          )}
          {currentUserId === event.addedBy._id && (
            <>
              <button
                onClick={handleDelete}
                type="button"
                className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-800"
              >
                Delete
              </button>
              <button
                onClick={handleUpdate}
                type="button"
                className="px-4 py-2 text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-4 focus:ring-yellow-300 dark:bg-yellow-400 dark:hover:bg-yellow-500 dark:focus:ring-yellow-700"
              >
                Update
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageAndDescription;
