import { useEffect, useState } from "react";
import DashboardLayout from "../../components/dashboard/DashboardLayout";
import api from "../../services/api";
import { getUserId } from "../../utils/storage";

const HodDashboard = () => {
  const hodId = getUserId(); // ✅ correct
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!hodId) return;

    api
      .get(`/products/hod/${hodId}`)
      .then((res) => setProducts(res.data))
      .catch(() => alert("Failed to load pending products"));
  }, [hodId]);

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/products/${id}/status?status=${status}`);
      setProducts(products.filter((p) => p.id !== id));
    } catch {
      alert("Action failed");
    }
  };

  return (
    <DashboardLayout role="HOD">
      <h2>Pending Products</h2>

      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Student</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td> {/* ✅ FIXED */}
              <td>{p.student?.name || "-"}</td>
              <td>
                <button onClick={() => updateStatus(p.id, "APPROVED")}>
                  Approve
                </button>
                <button onClick={() => updateStatus(p.id, "REJECTED")}>
                  Reject
                </button>
              </td>
            </tr>
          ))}

          {products.length === 0 && (
            <tr>
              <td colSpan="3">No pending products</td>
            </tr>
          )}
        </tbody>
      </table>
    </DashboardLayout>
  );
};

export default HodDashboard;
