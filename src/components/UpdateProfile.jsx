import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const UpdateProfile = () => {
  const { user, updateUserProfile } = useContext(AuthContext); 
  const navigate = useNavigate();
  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    document.title = "Update Profile";
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (name.length < 5) {
      setError("Name must be at least 5 characters long.");
      return;
    }

    try {
      await updateUserProfile(name, photoURL);
      setSuccess(true);
      navigate("/profile");
    } catch (error) {
      setError("Failed to update profile: " + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200">
      <h1 className="text-3xl font-bold mb-6">Update Profile</h1>
      <form onSubmit={handleUpdate} className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text">Photo URL</span>
          </label>
          <input
            type="text"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            className="input input-bordered"
            required
          />
        </div>
        {error && <p className="text-red-600 text-center mb-2">{error}</p>}
        {success && <p className="text-green-600 text-center mb-2">Profile updated successfully!</p>}
        <button type="submit" className="btn hover:bg-green-500 text-white bg-[#08ABE9] w-full">Update Information</button>
      </form>
    </div>
  );
};

export default UpdateProfile;
