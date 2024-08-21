import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ShowEvent = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchLocation, setSearchLocation] = useState("");
  const navigate = useNavigate();

  const getToken = () => {
    return localStorage.getItem("authToken");
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/events", {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        });
        setEvents(response.data);
        setFilteredEvents(response.data); // Initialize with all events
      } catch (error) {
        setError("Failed to load events.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    // Filter events based on searchLocation
    const filtered = events.filter((event) =>
      event?.venue?.toLowerCase().includes(searchLocation?.toLowerCase())
    );
    setFilteredEvents(filtered);
  }, [searchLocation]);

  const handleEventClick = (eventId) => {
    navigate(`/event/${eventId}`);
  };

  const handleSearchChange = (e) => {
    setSearchLocation(e.target.value);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="p-4">
      <div className="mb-4">
        <input
          type="text"
          value={searchLocation}
          onChange={handleSearchChange}
          placeholder="Search by location"
          className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-900 dark:border-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full"
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {filteredEvents.map((event) => (
          <div
            key={event._id}
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
            onClick={() => handleEventClick(event._id)}
          >
            <img
              className="w-full h-48 object-cover"
              src={event.image}
              alt={`Event ${event._id}`}
            />
            <div className="p-4">
              <p className="text-gray-800 dark:text-white">
                {event.description}
              </p>
              <p className="text-gray-600 dark:text-gray-400">{event.venue}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowEvent;
