// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Components
import Register from "./components/Register";
import Login from "./components/Login";
import JobList from "./components/JobList";
import PostJob from "./components/PostJob";
import Header from "./components/Header";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";       // ✅ Home will render Dashboard inside
import Dashboard from "./pages/Dashboard";

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      {/* ✅ Global Header */}
      <Header user={user} setUser={setUser} />

      <div className="container my-4">
        <Routes>
          {/* ✅ Default route → Home (includes Dashboard) */}
          <Route path="/" element={<Home />} />

          {/* ✅ Auth routes */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setUser={setUser} />} />

          {/* ✅ Protected routes */}
          <Route
            path="/jobs"
            element={user ? <JobList /> : <Navigate to="/login" />}
          />
          <Route
            path="/post-job"
            element={user ? <PostJob /> : <Navigate to="/login" />}
          />
          <Route
            path="/dashboard"
            element={user ? <Dashboard /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>

      {/* ✅ Global Footer */}
      <Footer />
    </Router>
  );
}

export default App;
