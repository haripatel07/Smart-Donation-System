import React, { useEffect, useState } from "react";

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
    <div>
      <h2>Admin Dashboard</h2>
      <p>Total Users: {stats.users}</p>
      <p>Total Donations: {stats.donations}</p>
      <p>Total Categories: {stats.categories}</p>
    </div>
  );
}

export default AdminDashboard;
