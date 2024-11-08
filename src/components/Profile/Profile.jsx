import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css"; 

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    if (!loggedUser) {
      navigate("/login");
    } else {
      setUser(loggedUser);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleEditProfile = () => {
    navigate(`/${user.first_name}/edit`);
  };

  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div className="profile-container">
      <h1>Profile Page</h1>
      <div className="profile-info">
        <p>
          <strong>First Name:</strong> {user.first_name}
        </p>
        <p>
          <strong>Last Name:</strong> {user.last_name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
      </div>

      <div className="profile-actions">
        <button onClick={handleEditProfile}>Edit Profile</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Profile;
