import React, { useEffect, useState } from "react";

function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: "", description: "" });

  useEffect(() => {
    fetch("http://localhost:5000/api/categories")
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  const handleAdd = e => {
    e.preventDefault();
    fetch("http://localhost:5000/api/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token")
      },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(newCat => setCategories([...categories, newCat]));
  };

  const handleDelete = id => {
    fetch(`http://localhost:5000/api/categories/${id}`, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + localStorage.getItem("token") }
    }).then(() => setCategories(categories.filter(c => c._id !== id)));
  };

  return (
    <div>
      <h2>Manage Categories</h2>
      <form onSubmit={handleAdd}>
        <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
        <button type="submit">Add</button>
      </form>
      <ul>
        {categories.map(cat =>
          <li key={cat._id}>
            {cat.name}
            <button onClick={() => handleDelete(cat._id)}>Delete</button>
          </li>
        )}
      </ul>
    </div>
  );
}

export default AdminCategories;
