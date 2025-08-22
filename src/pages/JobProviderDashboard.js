import React from "react";
import { Link } from "react-router-dom";
import "./JobProviderDashboard.css";

function JobProviderDashboard() {
  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">Employer</h2>
        <nav>
          <ul>
            <li><Link to="/provider">Dashboard</Link></li>
            <li><Link to="/provider/post-job">Post a Job</Link></li>
            <li><Link to="/provider/my-jobs">My Jobs</Link></li>
            <li><Link to="/provider/applicants">Applicants</Link></li>
            <li><Link to="/provider/settings">Settings</Link></li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <h2>Welcome, Infosys HR Manager 👋</h2>
        <div className="stats-grid">
          <div className="stat-card">Total Jobs Posted: 12</div>
          <div className="stat-card">Active Jobs: 5</div>
          <div className="stat-card">Total Applicants: 320</div>
          <div className="stat-card">Hires: 18</div>
        </div>
      </main>
    </div>
  );
}

export default JobProviderDashboard;
