import { useEffect, useState } from "react";
import "../styles/DonationsPage.css";

function DonationsPage() {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/donations")
      .then(res => res.json())
      .then(data => setDonations(data));
  }, []);

  return (
    <div className="donations-container">
      <h2 className="donations-title">All Donations</h2>
      {donations.length === 0 ? (
        <p style={{ textAlign: "center", color: "#888" }}>No donations found.</p>
      ) : (
        <div className="donations-list">
          {donations.map((d) => (
            <div key={d._id} className="donation-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <strong>{d.item}</strong>
                  <div style={{ fontSize: "0.9em", color: "#666", marginTop: "4px" }}>
                    Donor: {d.donorName || d.userId?.name || "Unknown"}
                    {d.category?.name && (
                      <span style={{ marginLeft: "12px" }}>Category: {d.category.name}</span>
                    )}
                    {d.quantity && d.quantity > 1 && (
                      <span style={{ marginLeft: "12px" }}>Quantity: {d.quantity}</span>
                    )}
                  </div>
                </div>
                <div className="donation-status" style={{
                  color: d.status === "Approved" ? "#28a745" : d.status === "Rejected" ? "#dc3545" : "#ffc107",
                  fontWeight: "bold"
                }}>
                  {d.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DonationsPage;
