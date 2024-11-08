import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash, FaExclamationCircle } from "react-icons/fa";
import "./Login.css";
import { validateEmail } from "../../validations/emailVal";
import { validatePassword } from "../../validations/passVal";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const errors = {};
    const emailError = validateEmail(formData.email);
    if (emailError) errors.email = emailError;
    const passwordError = validatePassword(formData.password);
    if (passwordError) errors.password = passwordError;

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
      setLoginError("");

    try {
      const response = await axios.post(
        "https://demo-practice.onrender.com/login",
        formData
      );

      const userDetails = await axios.get(
        `https://demo-practice.onrender.com/userdata/${formData.email}`
      );
      console.log(userDetails.data);
      localStorage.setItem("user", JSON.stringify(userDetails.data));
      navigate("/");
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.status === 401) {
        setLoginError("Incorrect username or password.");
      } else {
        setLoginError("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="register-container">
      <div className="register-form-wrapper">
        <h2>Login</h2>
        {loginError && (
          <div className="error-message">
            <FaExclamationCircle className="error-icon" />
            <span>{loginError}</span>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              className="form-input"
              placeholder="Email"
              name="email"
              disabled={loading}
              value={formData.email}
              onChange={handleChange}
            />
            {formErrors.email && (
              <p className="form-error-message">{formErrors.email}</p>
            )}
          </div>
          <div className="form-group password-group">
            <input
              type={showPassword ? "text" : "password"}
              className="form-input"
              placeholder="Password"
              name="password"
              disabled={loading}
              value={formData.password}
              onChange={handleChange}
            />
            {formErrors.password && (
              <p className="form-error-message">{formErrors.password}</p>
            )}
            <i
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </i>
          </div>
          <div className="form-group">
            <button type="submit" className="form-submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
        <p className="log-navigate">
          Don’t have an account?{" "}
          <Link className="reg-link" to="/register">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
