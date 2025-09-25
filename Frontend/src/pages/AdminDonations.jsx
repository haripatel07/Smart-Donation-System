import React, { useEffect, useState } from "react";

function AdminDonations() {
  // ...existing code...
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this donation?")) return;
    setDeletingId(id);
    setError("");
    try {
      const res = await fetch(`http://localhost:5000/api/donations/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        }
      });
      if (!res.ok) throw new Error("Failed to delete donation");
      setDonations(donations.filter(d => d._id !== id));
    } catch (err) {
      setError(err.message || "Error deleting donation");
    } finally {
      setDeletingId(null);
    }
  };
  const [donations, setDonations] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/donations", {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    })
      .then(res => res.json())
      .then(data => setDonations(data));
  }, []);

  const updateStatus = async (id, status) => {
    // Ensure status is capitalized for backend
    const statusValue = status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
    if (!window.confirm(`Are you sure you want to ${statusValue} this donation?`)) return;
    setLoadingId(id);
    setError("");
    try {
      const res = await fetch(`http://localhost:5000/api/donations/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify({ status: statusValue })
      });
      if (!res.ok) throw new Error("Failed to update status");
      const result = await res.json();
      // Backend returns { message, donation }
      setDonations(donations.map(d => d._id === id ? result.donation : d));
    } catch (err) {
      setError(err.message || "Error updating status");
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div style={{ padding: "24px", maxWidth: "700px", margin: "0 auto" }}>
      <h2 style={{ marginBottom: "24px", textAlign: "center" }}>Donation Requests</h2>
      {error && (
        <div style={{ color: "#dc3545", marginBottom: "16px", textAlign: "center" }}>{error}</div>
      )}
      {donations.length === 0 ? (
        <p style={{ textAlign: "center", color: "#888" }}>No donations found.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {donations.map(d => (
            <li
              key={d._id}
              style={{
                background: "#fff",
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                marginBottom: "16px",
                padding: "18px 20px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <div>
                <strong>{d.item || d.itemName}</strong>
                <span style={{ marginLeft: "12px", color: d.status === "approved" ? "#28a745" : d.status === "rejected" ? "#dc3545" : "#ffc107", fontWeight: "bold" }}>
                  {d.status.charAt(0).toUpperCase() + d.status.slice(1)}
                </span>
                <div style={{ fontSize: "0.95em", color: "#555", marginTop: "4px" }}>
                  Donor: {d.userId?.name || d.donorName || "Unknown"}
                  {d.userId?.email && (
                    <span style={{ marginLeft: "8px", color: "#888" }}>({d.userId.email})</span>
                  )}
                </div>
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                {(d.status && d.status.toLowerCase() === "pending") && (
                  <>
                    <button
                      onClick={() => updateStatus(d._id, "Approved")}
                      disabled={loadingId === d._id}
                      title="Approve this donation"
                      style={{
                        padding: "10px 24px",
                        fontSize: "1.05em",
                        fontWeight: "bold",
                        marginRight: "4px",
                        backgroundColor: loadingId === d._id ? "#b7e2c3" : "#28a745",
                        color: "#fff",
                        border: "none",
                        borderRadius: "6px",
                        boxShadow: "0 2px 6px rgba(40,167,69,0.08)",
                        cursor: loadingId === d._id ? "not-allowed" : "pointer",
                        transition: "background 0.2s"
                      }}
                    >
                      {loadingId === d._id ? "Processing..." : "✔ Approve"}
                    </button>
                    <button
                      onClick={() => updateStatus(d._id, "rejected")}
                      disabled={loadingId === d._id}
                      title="Reject this donation"
                      style={{
                        padding: "10px 24px",
                        fontSize: "1.05em",
                        fontWeight: "bold",
                        backgroundColor: loadingId === d._id ? "#f5b7b1" : "#dc3545",
                        color: "#fff",
                        border: "none",
                        borderRadius: "6px",
                        boxShadow: "0 2px 6px rgba(220,53,69,0.08)",
                        cursor: loadingId === d._id ? "not-allowed" : "pointer",
                        transition: "background 0.2s"
                      }}
                    >
                      {loadingId === d._id ? "Processing..." : "✖ Reject"}
                    </button>
                  </>
                )}
                <button
                  onClick={() => handleDelete(d._id)}
                  disabled={deletingId === d._id}
                  title="Delete this donation"
                  style={{
                    padding: "10px 24px",
                    fontSize: "1.05em",
                    fontWeight: "bold",
                    backgroundColor: deletingId === d._id ? "#eee" : "#6c757d",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    boxShadow: "0 2px 6px rgba(108,117,125,0.08)",
                    cursor: deletingId === d._id ? "not-allowed" : "pointer",
                    transition: "background 0.2s"
                  }}
                >
                  {deletingId === d._id ? "Deleting..." : "🗑 Delete"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AdminDonations;
