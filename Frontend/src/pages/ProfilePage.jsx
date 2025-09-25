import React, { useEffect, useState } from "react";
import "../styles/ProfilePage.css";
import { validateProfile } from "../utils/validateForm";

function ProfilePage() {
  const [profile, setProfile] = useState({ name: "", email: "", phone: "", address: "" });
  const [edit, setEdit] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch profile using token
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("Please login to view profile");
      return;
    }

    fetch("http://localhost:5000/api/auth/me", {
      headers: { Authorization: "Bearer " + token }
    })
      .then(async res => {
        if (res.status === 401) {
          // token invalid/expired - remove and redirect to login
          localStorage.removeItem("token");
          setMessage("Session expired. Please log in again.");
          window.setTimeout(() => { window.location.href = "/login"; }, 800);
          throw new Error("Unauthorized");
        }

        if (!res.ok) {
          const txt = await res.text().catch(() => "");
          throw new Error(`HTTP error! status: ${res.status} ${txt}`);
        }

        return res.json();
      })
      .then(data => {
        console.log("Profile data received:", data);
        setProfile({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          address: data.address || ""
        });
      })
      .catch(err => {
        if (err.message === 'Unauthorized') return; // already handled above
        console.error("Profile fetch error:", err);
        setMessage("Error loading profile data");
      });
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    const validationError = validateProfile(profile);
    if (validationError) {
      setMessage(validationError);
      setTimeout(() => setMessage(""), 3000);
      return;
    }
    setMessage("");
    fetch("http://localhost:5000/api/users/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token")
      },
      body: JSON.stringify(profile)
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        console.log("Profile update response:", data);
        // Ensure we have all the fields we need
        const updatedProfile = {
          name: data.name || profile.name,
          email: data.email || profile.email,
          phone: data.phone || profile.phone,
          address: data.address || profile.address
        };
        setProfile(updatedProfile);
        setEdit(false);
        setMessage("Profile saved successfully!");
        setTimeout(() => setMessage(""), 3000);
      })
      .catch(err => {
        console.error("Profile update error:", err);
        setMessage("Error saving profile. Please try again.");
        setTimeout(() => setMessage(""), 3000);
      });
  };

  return (
    <div className="profile-container">
      <h2 className="profile-title">My Profile</h2>
      {message && (
        <div className={`profile-message ${message.includes("Error") ? "profile-error" : "profile-success"}`}>
          {message}
        </div>
      )}

      {edit ? (
        <form onSubmit={handleUpdate} className="profile-form">
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              value={profile.name}
              onChange={e => setProfile({ ...profile, name: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone:</label>
            <input
              type="text"
              value={profile.phone}
              onChange={e => setProfile({ ...profile, phone: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label>Address:</label>
            <textarea
              value={profile.address}
              onChange={e => setProfile({ ...profile, address: e.target.value })}
              rows="3"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="profile-btn">Save Changes</button>
            <button type="button" onClick={() => setEdit(false)} className="profile-btn profile-btn-secondary">Cancel</button>
          </div>
        </form>
      ) : (
        <div className="profile-view">
          <div className="profile-field">
            <strong>Name:</strong> {profile.name || "Not set"}
          </div>
          <div className="profile-field">
            <strong>Email:</strong> {profile.email}
          </div>
          <div className="profile-field">
            <strong>Phone:</strong> {profile.phone || "Not set"}
          </div>
          <div className="profile-field">
            <strong>Address:</strong> {profile.address || "Not set"}
          </div>
          <button onClick={() => setEdit(true)} className="profile-btn profile-btn-edit">Edit Profile</button>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
