import React, { useEffect, useState } from "react";
import "../styles/MyDonations.css";

function StatusBadge({ status }) {
  const getStatusStyle = (status) => {
    switch (status) {
      case "approved":
        return { background: "#10b981", color: "#fff" };
      case "rejected":
        return { background: "#ef4444", color: "#fff" };
      case "pending":
        return { background: "#f59e0b", color: "#fff" };
      default:
        return { background: "#6b7280", color: "#fff" };
    }
  };

  return (
    <span
      className="status-badge"
      style={getStatusStyle(status)}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

function DonationCard({ donation }) {
  return (
    <div className="donation-card">
      <div className="donation-header">
        <h3 className="donation-item">{donation.item}</h3>
        <StatusBadge status={donation.status} />
      </div>
      <div className="donation-details">
        <div className="detail-row">
          <span className="detail-label">Category:</span>
          <span className="detail-value">{donation.category?.name || 'N/A'}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Quantity:</span>
          <span className="detail-value">{donation.quantity} items</span>
        </div>
        {donation.description && (
          <div className="detail-row">
            <span className="detail-label">Description:</span>
            <span className="detail-value">{donation.description}</span>
          </div>
        )}
      </div>
    </div>
  );
}

function MyDonations({ userId }) {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return;

    const token = localStorage.getItem("token");
    if (!token) {
      setDonations([]);
      setError("Not authenticated. Please log in.");
      return;
    }

    const fetchDonations = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`http://localhost:5000/api/donations/user/${userId}`, {
          headers: { "Authorization": `Bearer ${token}` }
        });

        if (res.status === 401) {
          // Token invalid or expired: clear and redirect to login
          localStorage.removeItem("token");
          setError("Session expired. Please log in again.");
          window.location.href = "/login";
          return;
        }

        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Server error: ${res.status} ${text}`);
        }

        const data = await res.json();

        // Ensure we always set an array to avoid `.map` errors
        setDonations(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching donations:", err);
        setError(err.message || "Error fetching donations");
        setDonations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, [userId]);

  return (
    <div className="my-donations-container">
      <div className="my-donations-header">
        <h1 className="page-title">My Donations</h1>
        <p className="page-subtitle">Track and manage your donation requests</p>
      </div>

      {loading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading your donations...</p>
        </div>
      )}

      {error && (
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <p className="error-message">{error}</p>
        </div>
      )}

      {!loading && !error && (
        <div className="donations-content">
          {donations.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📦</div>
              <h3>No donations yet</h3>
              <p>You haven't made any donations. Start by making your first donation!</p>
              <a href="/donate" className="donate-button">Make a Donation</a>
            </div>
          ) : (
            <>
              <div className="donations-summary">
                <p>You have made <strong>{donations.length}</strong> donation{donations.length !== 1 ? 's' : ''}</p>
              </div>
              <div className="donations-grid">
                {donations.map(donation => (
                  <DonationCard key={donation._id} donation={donation} />
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default MyDonations;
