import { useState } from "react";
// import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AdminLogin = () => {
  const [adminInput, setAdminInput] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!adminInput.username || !adminInput.password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      //   const response = await axios.post("/api/admin/login", adminInput);
      //   localStorage.setItem("adminToken", response.data.token);
      toast.success("Login successful");
      navigate("/admin/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={adminInput.username}
          onChange={(e) =>
            setAdminInput({ ...adminInput, username: e.target.value })
          }
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={adminInput.password}
          onChange={(e) =>
            setAdminInput({ ...adminInput, password: e.target.value })
          }
          className="w-full p-2 mb-4 border rounded"
        />
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
