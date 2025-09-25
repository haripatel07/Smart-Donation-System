import React, { useEffect, useState } from "react";
import "../styles/AdminUsers.css";

function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:5000/api/admin/users", {
            headers: { Authorization: "Bearer " + localStorage.getItem("token") }
        })
            .then(res => res.json())
            .then(data => {
                setUsers(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching users:", err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div className="loading">Loading users...</div>;

    return (
        <div className="admin-users-container">
            <h2 className="admin-users-title">All Users</h2>

            {users.length === 0 ? (
                <p className="no-users">No users found.</p>
            ) : (
                <div>
                    <p className="users-summary">
                        Total users: {users.length}
                    </p>

                    <div className="users-table-container">
                        <table className="users-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Role</th>
                                    <th>Joined</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <tr key={user._id}>
                                        <td>{user.name || "N/A"}</td>
                                        <td>{user.email}</td>
                                        <td>{user.phone || "N/A"}</td>
                                        <td>
                                            <span className={`role-badge ${user.role}`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminUsers;
