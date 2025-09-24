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
    <div>
      <h2>All Donations</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Donor</th>
            <th>Item</th>
            <th>Category</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {donations.map((d) => (
            <tr key={d._id}>
              <td>{d.donorName}</td>
              <td>{d.item}</td>
              <td>{d.category}</td>
              <td>{d.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DonationsPage;
