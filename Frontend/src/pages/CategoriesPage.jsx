import { useEffect, useState } from "react";

function CategoriesPage() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // later fetch from backend, dummy data for now
    const dummy = [
      { _id: "1", name: "Clothes", description: "Donate old and new clothes" },
      { _id: "2", name: "Food", description: "Donate food items" },
      { _id: "3", name: "Books", description: "Donate educational books" },
    ];
    setCategories(dummy);
  }, []);

  return (
    <div>
      <h2>Donation Categories</h2>
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {categories.map((cat) => (
          <div key={cat._id} style={{ border: "1px solid gray", padding: "10px", borderRadius: "5px" }}>
            <h3>{cat.name}</h3>
            <p>{cat.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoriesPage;
