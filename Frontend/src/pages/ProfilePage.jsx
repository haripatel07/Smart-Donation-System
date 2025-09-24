import React, { useEffect, useState } from "react";
import "../styles/ProfilePage.css";

function ProfilePage() {
  const [profile, setProfile] = useState({ name: "", email: "", phone: "", address: "" });
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    // Fetch profile using token
    fetch("http://localhost:5000/api/auth/me", {
      headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    })
      .then(res => res.json())
      .then(data => setProfile(data));
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/api/users/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token")
      },
      body: JSON.stringify(profile)
    })
      .then(res => res.json())
      .then(data => {
        setProfile(data);
        setEdit(false);
      });
  };

  return (
    <div>
      <h2>My Profile</h2>
      {edit ? (
        <form onSubmit={handleUpdate}>
          <input value={profile.name} onChange={e => setProfile({ ...profile, name: e.target.value })} />
          <input value={profile.phone} onChange={e => setProfile({ ...profile, phone: e.target.value })} />
          <input value={profile.address} onChange={e => setProfile({ ...profile, address: e.target.value })} />
          <button type="submit">Save</button>
        </form>
      ) : (
        <div>
          <p>Name: {profile.name}</p>
          <p>Email: {profile.email}</p>
          <p>Phone: {profile.phone}</p>
          <p>Address: {profile.address}</p>
          <button onClick={() => setEdit(true)}>Edit</button>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
