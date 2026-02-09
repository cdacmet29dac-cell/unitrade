import { useState } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import api from "../../services/api";
import { getUserId } from "../../utils/storage";

const AddProduct = () => {
  const studentId = getUserId();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select image");
      return;
    }

    try {
      setLoading(true);

      // 1️⃣ Upload product image FIRST
      const formData = new FormData();
      formData.append("file", image);

      const imgRes = await api.post("/files/upload/product", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const imagePath = imgRes.data; // products/xxxx.jpg

      // 2️⃣ Create product with image path
      await api.post(`/products/student/${studentId}`, {
        title,
        description,
        price,
        images: imagePath, // 🔥 VERY IMPORTANT
      });

      alert("Product submitted for HOD approval");
      window.location.href = "/student";
    } catch (err) {
      alert("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout role="STUDENT">
      <h2>Add Product</h2>

      <form className="auth-form" onSubmit={handleSubmit}>
        <label>
          Title
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>

        <label>
          Description
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>

        <label>
          Price
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>

        <label>
          Product Image
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required
          />
        </label>

        <button className="btn btn--primary" disabled={loading}>
          {loading ? "Uploading..." : "Submit"}
        </button>
      </form>
    </DashboardLayout>
  );
};

export default AddProduct;
