import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import React from "react";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <NavLink to="/" className="brandname">
          Shopify
        </NavLink>
      </div>
      <div className="nav-links">
        {!user && (
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? "nav-link-active" : "nav-link"
            }
          >
            Login/Sign Up
          </NavLink>
        )}

        {user && (
          <>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive ? "nav-link-active" : "nav-link"
              }
            >
              {`${user.first_name}`}
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
