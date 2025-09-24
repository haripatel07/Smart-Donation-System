import React, { useEffect, useState } from "react";

function AdminDonations() {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/donations", {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    })
      .then(res => res.json())
      .then(data => setDonations(data));
  }, []);

  const updateStatus = (id, status) => {
    fetch(`http://localhost:5000/api/donations/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token")
      },
      body: JSON.stringify({ status })
    })
      .then(res => res.json())
      .then(updated => setDonations(donations.map(d => d._id === id ? updated : d)));
  };

  return (
    <div>
      <h2>Donation Requests</h2>
      <ul>
        {donations.map(d => (
          <li key={d._id}>
            {d.itemName} ({d.status})
            {d.status === "pending" && (
              <>
                <button onClick={() => updateStatus(d._id, "approved")}>Approve</button>
                <button onClick={() => updateStatus(d._id, "rejected")}>Reject</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDonations;
