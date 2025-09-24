import React, { useState } from "react";
function ForgotPassword() {
  const [form, setForm] = useState({ email: "", newPassword: "" });
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    alert(data.msg);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input name="email" placeholder="Email" onChange={handleChange} required />
      <input name="newPassword" type="password" placeholder="New Password" onChange={handleChange} required />
      <button type="submit">Reset Password</button>
    </form>
  );
}
export default ForgotPassword;
