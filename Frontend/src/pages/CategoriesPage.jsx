
import React, { useEffect, useState } from "react";
import "../styles/CategoriesPage.css";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/categories");
        if (!res.ok) throw new Error("Failed to fetch categories");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <p className="categories-center">Loading categories...</p>;
  if (error) return <p className="categories-center categories-error">{error}</p>;

  return (
    <div className="categories-container">
      <h2 className="categories-title">Categories</h2>
      <div className="categories-grid">
        {categories.map((cat) => (
          <div
            key={cat._id}
            className="category-card"
          >
            <h3 className="category-name">{cat.name}</h3>
            <p className="category-desc">{cat.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
