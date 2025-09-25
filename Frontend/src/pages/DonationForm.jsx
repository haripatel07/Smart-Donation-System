import React, { useState, useEffect } from "react";
import { validateDonation } from "../utils/validateForm";

function DonationForm() {
  const [form, setForm] = useState({ item: "", category: "", quantity: 1 });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [donorName, setDonorName] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/categories")
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(() => setCategories([]));

    // Try to read token and decode minimal info (name stored in req via middleware on server)
    const token = localStorage.getItem("token");
    if (token) {
      // We don't decode JWT here; ask server for /api/auth/me when needed. For UX show placeholder.
      setDonorName("You");
    }
  }, []);

  const handleChange = (e) => {
    const val = e.target.name === "quantity" ? Number(e.target.value) : e.target.value;
    setForm({ ...form, [e.target.name]: val });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateDonation(form, categories);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");
    setSuccess("");

    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to donate.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/donations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });

      const data = await res.json().catch(() => ({}));

      if (res.status === 401) {
        localStorage.removeItem("token");
        setError("Session expired. Please log in again.");
        window.setTimeout(() => { window.location.href = "/login"; }, 800);
        return;
      }

      if (res.ok) {
        setSuccess(data.message || "Donation submitted!");
        setForm({ item: "", category: "", quantity: 1 });
        setTimeout(() => setSuccess(""), 3000);
      } else {
        setError(data.error || data.message || "Failed to submit donation");
      }
    } catch (err) {
      console.error("Donate submit error:", err);
      setError("Network error");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 600, margin: "0 auto", display: "flex", gap: 12, alignItems: "center" }}>
      <div style={{ flex: 1 }}>
        {error && <div style={{ color: "red", marginBottom: 8 }}>{error}</div>}
        {success && <div style={{ color: "green", marginBottom: 8 }}>{success}</div>}
        <input name="item" placeholder="Item Name" value={form.item} onChange={handleChange} style={{ width: "100%", padding: 8, marginBottom: 8 }} />
        <select name="category" value={form.category} onChange={handleChange} style={{ width: "100%", padding: 8, marginBottom: 8 }}>
          <option value="">Select Category</option>
          {categories.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
        </select>
        <input name="quantity" type="number" min="1" value={form.quantity} onChange={handleChange} style={{ width: 120, padding: 8 }} />
      </div>
      <div>
        <button type="submit" style={{ padding: "10px 16px" }}>Donate</button>
      </div>
    </form>
  );
}

export default DonationForm;
