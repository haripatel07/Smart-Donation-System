import React, { useState } from "react";
import { validatePasswordChange } from "../utils/validateForm";
function ChangePassword() {
  const [form, setForm] = useState({ oldPassword: "", newPassword: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validatePasswordChange(form);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");
    setSuccess("");
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:5000/api/auth/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess(data.msg);
      } else {
        setError(data.msg || "Failed to change password");
      }
    } catch (err) {
      setError("Network error");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {success && <div style={{ color: "green" }}>{success}</div>}
      <input name="oldPassword" type="password" placeholder="Old Password" onChange={handleChange} required />
      <input name="newPassword" type="password" placeholder="New Password" onChange={handleChange} required />
      <button type="submit">Change Password</button>
    </form>
  );
}
export default ChangePassword;
