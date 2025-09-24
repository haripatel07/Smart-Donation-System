import React, { useState } from "react";
import "../styles/SignupPage.css";

function SignupPage({ onSignup }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const res = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    if (data.msg && !data.error) {
      setSuccess("Signup successful! Please login.");
      setTimeout(() => onSignup(), 1200);
    } else {
      setError(data.msg || "Signup failed");
    }
  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <h2 className="signup-title">Signup</h2>
      {error && <div className="signup-error">{error}</div>}
      {success && <div className="signup-success">{success}</div>}
      <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
      <button className="signup-btn" type="submit">Signup</button>
    </form>
  );
}

export default Signup;
