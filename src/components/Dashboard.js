// src/components/Dashboard.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function Dashboard() {
  const [stats, setStats] = useState({
    totalJobs: 0,
    activeJobs: 0,
    applicants: 0,
    hires: 0
  });
  const [chartData, setChartData] = useState([]);

  const employer = JSON.parse(localStorage.getItem("user"));
  const employerId = employer?.id;

  useEffect(() => {
    if (employerId) {
      // Dashboard stats
      axios
        .get(`http://localhost:5000/api/dashboard/${employerId}`)
        .then((res) => setStats(res.data))
        .catch((err) => console.error(err));

      // Monthly jobs chart
      axios
        .get(`http://localhost:5000/api/dashboard/${employerId}/monthly`)
        .then((res) => setChartData(res.data))
        .catch((err) => console.error(err));
    }
  }, [employerId]);

  return (
    <div className="dashboard-container">
      <h2>Welcome, Employer Dashboard</h2>

      <div className="stats-cards">
        <div className="card">
          <h3>{stats.totalJobs}</h3>
          <p>Total Jobs Posted</p>
        </div>
        <div className="card">
          <h3>{stats.activeJobs}</h3>
          <p>Active Jobs</p>
        </div>
        <div className="card">
          <h3>{stats.applicants}</h3>
          <p>Total Applicants</p>
        </div>
        <div className="card">
          <h3>{stats.hires}</h3>
          <p>Hires</p>
        </div>
      </div>

      <div className="chart">
        <h3>Jobs Posted per Month</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <Line type="monotone" dataKey="count" stroke="#007bff" strokeWidth={2} />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Dashboard;
