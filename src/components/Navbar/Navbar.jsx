import { NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import React from "react";
import logo from "../../assets/logo.png";

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
        <NavLink to="/" className="brand-nav">
          <img src={logo} alt="Brand Logo" />
          <span className="brand-text">ShopEase</span>
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
              to={`/${user.first_name}`}
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
