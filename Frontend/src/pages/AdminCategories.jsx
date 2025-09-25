import React, { useState, useEffect } from "react";
import "../styles/AdminCategories.css";
import { validateCategory } from "../utils/validateForm";

function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: "", description: "" });
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/categories")
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  const handleAdd = e => {
    e.preventDefault();
    const validationError = validateCategory(form);
    if (validationError) {
      alert(validationError);
      return;
    }
    fetch("http://localhost:5000/api/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token")
      },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(newCat => {
        setCategories([...categories, newCat.category || newCat]);
        setForm({ name: "", description: "" });
      });
  };

  const handleUpdate = e => {
    e.preventDefault();
    const validationError = validateCategory(form);
    if (validationError) {
      alert(validationError);
      return;
    }
    fetch(`http://localhost:5000/api/categories/${editing}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token")
      },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(updatedCat => {
        setCategories(categories.map(c => c._id === editing ? (updatedCat.category || updatedCat) : c));
        setEditing(null);
        setForm({ name: "", description: "" });
      });
  };

  const handleDelete = id => {
    fetch(`http://localhost:5000/api/categories/${id}`, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    }).then(() => setCategories(categories.filter(c => c._id !== id)));
  };

  const startEdit = category => {
    setEditing(category._id);
    setForm({ name: category.name, description: category.description });
  };

  return (
    <div className="admin-categories-container">
      <h2>Manage Categories</h2>

      <form onSubmit={editing ? handleUpdate : handleAdd} className="category-form">
        <div className="form-group">
          <input
            placeholder="Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            className="form-input"
            name="name"
            required
          />
          <input
            placeholder="Description"
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            className="form-input"
            name="description"
            required
          />
          <button type="submit" className="btn btn-primary">
            {editing ? "Update" : "Add"}
          </button>
          {editing && (
            <button
              type="button"
              onClick={() => { setEditing(null); setForm({ name: "", description: "" }); }}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="categories-list">
        <h3>Categories List</h3>
        {categories.length === 0 ? (
          <p className="no-categories">No categories found.</p>
        ) : (
          <ul>
            {categories.map(cat => (
              <li key={cat._id} className="category-item">
                <div className="category-info">
                  <strong>{cat.name}</strong> - {cat.description}
                </div>
                <div className="category-actions">
                  <button
                    onClick={() => startEdit(cat)}
                    className="btn btn-secondary btn-small"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(cat._id)}
                    className="btn btn-danger btn-small"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default AdminCategories;
