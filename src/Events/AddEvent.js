import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Assuming you're using react-toastify for notifications

const AddEvent = () => {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Function to get the token from localStorage or any other secure place
  const getToken = () => {
    return localStorage.getItem("authToken");
  };

  // Function to upload image to Cloudinary
  const uploadImageToCloudinary = async (file) => {
    setLoading(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "qez8pegp");
    data.append("cloud_name", "di2jxskci");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/di2jxskci/image/upload",
        {
          method: "post",
          body: data,
        }
      );

      const json = await res.json();
      setLoading(false);

      if (json.secure_url) {
        return json.secure_url;
      } else {
        alert("Error occurred while uploading image");
        console.error("Failed to upload image:", json);
        return null;
      }
    } catch (error) {
      setLoading(false);
      alert("Error uploading image");
      console.error("Image upload error:", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = null;
    if (image) {
      imageUrl = await uploadImageToCloudinary(image);
      console.log(imageUrl);
      if (!imageUrl) return; // Stop if image upload failed
    }

    const eventData = {
      name,
      eventDate: date,
      eventTime: time,
      location,
      description,
      image: imageUrl, // Add the Cloudinary image URL
    };

    try {
      await axios.post("http://18.133.196.225:3000/api/events", eventData, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      alert("Event added successfully!");
      navigate("/showevent");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Session expired. Please log in again.");
        navigate("/login");
      } else {
        alert("Failed to add event.");
        console.error("Error adding event:", error);
      }
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Add a New Event
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div className="sm:col-span-2">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Event Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Type event name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="date"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Date
              </label>
              <input
                type="date"
                name="date"
                id="date"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="time"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Time
              </label>
              <input
                type="time"
                name="time"
                id="time"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="location"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Location
              </label>
              <input
                type="text"
                name="location"
                id="location"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Event location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Description
              </label>
              <textarea
                id="description"
                rows="4"
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Event description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="image"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Event Image
              </label>
              <input
                type="file"
                name="image"
                id="image"
                accept="image/*"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
          </div>
          <button
            type="submit"
            className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
          >
            {loading ? "Uploading..." : "Add Event"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default AddEvent;
