import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import LoadingSpinner from "../components/LoadingSpinner";
import "../styles/AdminDashboard.css";

function StatCard({ icon, title, value, color, loading }) {
  return (
    <Card className={`stat-card stat-card-${color}`} shadow="lg" hover>
      <div className="stat-card-content">
        <div className="stat-icon">
          {loading ? <LoadingSpinner size="md" /> : icon}
        </div>
        <div className="stat-info">
          <div className="stat-value">
            {loading ? "..." : value.toLocaleString()}
          </div>
          <div className="stat-title">{title}</div>
        </div>
      </div>
    </Card>
  );
}

function AdminDashboard() {
  const [stats, setStats] = useState({ users: 0, donations: 0, categories: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin/stats", {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") }
        });

        if (!res.ok) {
          throw new Error("Failed to fetch dashboard statistics");
        }

        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error("Dashboard stats error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (error) {
    return (
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Admin Dashboard</h1>
          <p className="dashboard-subtitle">Manage your donation platform</p>
        </div>
        <Card className="error-card">
          <div className="error-content">
            <div className="error-icon">⚠️</div>
            <h3>Unable to load dashboard</h3>
            <p>{error}</p>
            <button
              className="retry-button"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="dashboard-title-section">
          <h1 className="dashboard-title">Admin Dashboard</h1>
          <p className="dashboard-subtitle">Monitor and manage your donation platform</p>
        </div>
        <div className="dashboard-actions">
          <div className="dashboard-date">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
        </div>
      </div>

      <div className="stats-grid">
        <StatCard
          icon="👥"
          title="Total Users"
          value={stats.users}
          color="primary"
          loading={loading}
        />

        <StatCard
          icon="📦"
          title="Total Donations"
          value={stats.donations}
          color="secondary"
          loading={loading}
        />

        <StatCard
          icon="📂"
          title="Categories"
          value={stats.categories}
          color="accent"
          loading={loading}
        />

        <StatCard
          icon="✅"
          title="Approved"
          value={stats.approved || 0}
          color="success"
          loading={loading}
        />
      </div>

      <div className="dashboard-overview">
        <Card className="overview-card" shadow="lg">
          <div className="overview-header">
            <h3>Quick Actions</h3>
            <p>Common administrative tasks</p>
          </div>
          <div className="overview-actions">
            <div className="action-item">
              <div className="action-icon">📝</div>
              <div className="action-content">
                <h4>Manage Categories</h4>
                <p>Add, edit, or remove donation categories</p>
              </div>
              <a href="/admin/categories" className="action-link">Go →</a>
            </div>

            <div className="action-item">
              <div className="action-icon">�</div>
              <div className="action-content">
                <h4>View Users</h4>
                <p>Monitor user accounts and activity</p>
              </div>
              <a href="/admin/users" className="action-link">Go →</a>
            </div>

            <div className="action-item">
              <div className="action-icon">📋</div>
              <div className="action-content">
                <h4>Review Requests</h4>
                <p>Approve or reject donation requests</p>
              </div>
              <a href="/admin/donations" className="action-link">Go →</a>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default AdminDashboard;
