import React, { useEffect, useState } from "react";
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
          <li key={d._id}>{d.item} - {d.status || "Pending"}</li>
        ))}
      </ul>
    </div>
  );
}
export default MyDonations;
