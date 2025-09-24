import React, { useEffect, useState } from "react";

function StatusBadge({ status }) {
  let color = "gray";
  if (status === "approved") color = "green";
  else if (status === "rejected") color = "red";
  return <span style={{ background: color, color: "#fff", padding: "2px 8px", borderRadius: 4 }}>{status}</span>;
}

function MyDonations({ userId }) {
  const [donations, setDonations] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/api/donations/user/${userId}`)
      .then(res => res.json())
      .then(data => setDonations(data));
  }, [userId]);

  return (
    <div>
      <h2>My Donations</h2>
      <ul>
        {donations.map(d => (
          <li key={d._id}>
            {d.itemName} - <StatusBadge status={d.status} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MyDonations;
