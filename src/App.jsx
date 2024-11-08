import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Register from "./components/Login/Register";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import ProfileEdit from "./components/Profile/ProfileEdit";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    if (loggedUser) {
      setUser(loggedUser);
    }
  }, []);

  if (!user) {
    return (
      <Router
        basename="/"
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
        </Routes>
      </Router>
    );
  }

  return (
    <Router
      basename="/"
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path={`/${user.first_name}`} element={<Profile />} />
        <Route path={`/${user.first_name}/edit`} element={<ProfileEdit />} />
        <Route
          path="*"
          element={<Navigate to={`/${user.first_name}`} replace />}
        />
      </Routes>
    </Router>
  );
};

export default App;
