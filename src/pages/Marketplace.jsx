import { useEffect, useState } from "react";
import api from "../services/api";

const Marketplace = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api
      .get("/products/live")
      .then((res) => setProducts(res.data))
      .catch(() => alert("Failed to load marketplace"));
  }, []);

  return (
    <section className="page">
      <h2>Marketplace</h2>

      <div className="grid">
        {products.map((product) => {
          // 🔹 Backend sends `images` (string), not imagePath
          const imageUrl = product.images
            ? `http://localhost:8080/api/files/view?path=${product.images}`
            : "/placeholder.png";

          return (
            <div key={product.id} className="card">
              <img src={imageUrl} alt={product.title} />

              <h3>{product.title}</h3>
              <p>{product.description}</p>
              <strong>₹{product.price}</strong>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Marketplace;
