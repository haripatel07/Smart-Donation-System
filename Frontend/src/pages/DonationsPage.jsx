import { useEffect, useState } from "react";

function DonationsPage() {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    // later will fetch from backend
    const dummy = [
      { _id: "1", donorName: "Hari", item: "Clothes", category: "Clothes", status: "Pending" },
      { _id: "2", donorName: "Dev", item: "Food Packets", category: "Food", status: "Approved" },
      { _id: "3", donorName: "Het", item: "Books", category: "Books", status: "Rejected" },
    ];
    setDonations(dummy);
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
