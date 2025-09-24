import React, { useState, useEffect } from "react";

function DonationForm() {
  const [form, setForm] = useState({ item: "", category: "", quantity: 1 });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/categories")
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/donations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    alert(data.message || "Donation submitted!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="item" placeholder="Item Name" onChange={handleChange} required />
      <select name="category" onChange={handleChange} required>
        <option value="">Select Category</option>
        {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
      </select>
      <input name="quantity" type="number" min="1" onChange={handleChange} required />
      <button type="submit">Donate</button>
    </form>
  );
}

export default DonationForm;
