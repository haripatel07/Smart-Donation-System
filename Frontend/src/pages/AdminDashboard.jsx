import React, { useEffect, useState } from "react";
import "../styles/AdminDashboard.css";

function AdminDashboard() {
  const [stats, setStats] = useState({ users: 0, donations: 0, categories: 0 });

  useEffect(() => {
    fetch("http://localhost:5000/api/admin/stats", {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    })
      .then(res => res.json())
      .then(data => setStats(data));
  }, []);

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Admin Dashboard</h2>

      <div className="stats-grid">
        <div className="stat-card users">
          <div className="stat-icon">👥</div>
          <div className="stat-number">{stats.users}</div>
          <div className="stat-label">Total Users</div>
        </div>

        <div className="stat-card donations">
          <div className="stat-icon">📦</div>
          <div className="stat-number">{stats.donations}</div>
          <div className="stat-label">Total Donations</div>
        </div>

        <div className="stat-card categories">
          <div className="stat-icon">📂</div>
          <div className="stat-number">{stats.categories}</div>
          <div className="stat-label">Total Categories</div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
