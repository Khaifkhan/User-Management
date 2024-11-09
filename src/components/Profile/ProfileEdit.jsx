import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Login/Login.css";

const ProfileEdit = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const loggedUser = JSON.parse(localStorage.getItem("user"));
      if (!loggedUser) {
        navigate("/login"); 
        return;
      }

      try {
        const response = await axios.get(
          `https://demo-practice.onrender.com/userdata/${loggedUser.email}`
        );
        setUser(response.data); 
        setFormData({
          first_name: response.data.first_name,
          last_name: response.data.last_name,
          email: response.data.email,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleSave = async () => {
    setIsLoading(true);
    const loggedUser = JSON.parse(localStorage.getItem("user"));

    try {
      const response = await axios.put(
        `https://demo-practice.onrender.com/edit/${loggedUser.email}`,
        formData
      );

      localStorage.setItem("user", JSON.stringify(formData));

      setUser(response.data);

      navigate(`/${user.first_name}`); 
    } catch (error) {
      console.error("Error saving user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/profile"); 
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="register-container">
      {isLoading && <div id="loader"></div>}

      {!isLoading && (
        <div className="register-form-wrapper">
          <h2>Edit Profile</h2>
          <form className="edit-profile-form">
            <div className="form-group">
              <input
                type="text"
                className="form-input"
                placeholder="First name"
                value={formData.first_name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    first_name: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                className="form-input"
                placeholder="Last name"
                value={formData.last_name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    last_name: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-input"
                value={formData.email}
                disabled
              />
            </div>
            <div className="edit-actions">
              <button type="button" className="save-form" onClick={handleSave}>
                Save Changes
              </button>
              <button
                type="button"
                className="cancel-form"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProfileEdit;
