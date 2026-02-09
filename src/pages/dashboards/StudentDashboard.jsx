import { useEffect, useState } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import api from "../../services/api";
import { getUserId } from "../../utils/storage";

const StudentDashboard = () => {
  const studentId = getUserId();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ---------------- LOAD MY PRODUCTS ----------------
  useEffect(() => {
    if (!studentId) return;

    api
      .get(`/products/student/${studentId}`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch(() => {
        alert("Failed to load your products");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [studentId]);

  // ---------------- DELETE PRODUCT ----------------
  const deleteProduct = async (productId) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await api.delete(`/products/${productId}/student/${studentId}`);
      setProducts(products.filter((p) => p.id !== productId));
    } catch {
      alert("Failed to delete product");
    }
  };

  return (
    <DashboardLayout role="STUDENT">
      <div className="dashboard-header">
        <h2>My Products</h2>

        <a href="/student/add" className="btn btn--primary">
          + Add Product
        </a>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <p className="text-muted">You have not added any products yet.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>{p.title}</td>

                <td>
                  <span
                    className={
                      p.status === "APPROVED"
                        ? "badge badge--success"
                        : p.status === "PENDING"
                          ? "badge badge--warning"
                          : "badge badge--danger"
                    }
                  >
                    {p.status}
                  </span>
                </td>

                <td>₹{p.price}</td>

                <td>
                  <button
                    className="btn btn--danger btn--sm"
                    onClick={() => deleteProduct(p.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </DashboardLayout>
  );
};

export default StudentDashboard;
