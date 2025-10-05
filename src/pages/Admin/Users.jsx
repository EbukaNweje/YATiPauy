import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Users = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.get("/api/admin/users", config);
        setUsers(response.data);
      } catch {
        toast.error("Failed to fetch users");
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Users</h1>
      {users.map((user) => (
        <div key={user.id} className="p-4 border mb-2 rounded">
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <button
            onClick={() => navigate(`/admin/user/${user.id}`)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            View Details
          </button>
        </div>
      ))}
    </div>
  );
};

export default Users;
