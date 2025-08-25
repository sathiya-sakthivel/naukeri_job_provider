// src/pages/Home.js
import React, { useState } from "react";
import Dashboard from "../components/Dashboard";
import ResumeList from "../components/ResumeList";

const Home = () => {
  const [resumes] = useState([
    { id: 1, name: "Priya Sharma", role: "Frontend Developer", date: "2025-08-20" },
    { id: 2, name: "Rahul Verma", role: "Backend Developer", date: "2025-08-19" },
    { id: 3, name: "Aditi Singh", role: "UI/UX Designer", date: "2025-08-18" },
    { id: 4, name: "Karan Mehta", role: "Fullstack Developer", date: "2025-08-15" },
  ]);

  return (
    <div className="p-6">
      {/* Dashboard Section */}
      <Dashboard />

      {/* Resume List Section */}
      <ResumeList resumes={resumes} />
    </div>
  );
};

export default Home;
