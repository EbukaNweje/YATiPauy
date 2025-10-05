import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AdminDashboard = () => {
  const [deposits, setDeposits] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const token = localStorage.getItem("adminToken");
        // const config = { headers: { Authorization: `Bearer ${token}` } };

        const [depositRes, withdrawalRes, usersRes] = await Promise.all([
          //   axios.get("/api/admin/deposits", config),
          //   axios.get("/api/admin/withdrawals", config),
          //   axios.get("/api/admin/users", config),
        ]);

        // setDeposits(depositRes.data);
        // setWithdrawals(withdrawalRes.data);
        // setUsers(usersRes.data);
      } catch {
        toast.error("Failed to fetch data");
        navigate("/admin/login");
      }
    };

    fetchData();
  }, [navigate]);

  const approveDeposit = async (id) => {
    try {
      const token = localStorage.getItem("adminToken");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.post(`/api/admin/approve-deposit/${id}`, {}, config);
      toast.success("Deposit approved");
      setDeposits(deposits.filter((deposit) => deposit.id !== id));
    } catch {
      toast.error("Failed to approve deposit");
    }
  };

  const approveWithdrawal = async (id) => {
    try {
      const token = localStorage.getItem("adminToken");
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.post(`/api/admin/approve-withdrawal/${id}`, {}, config);
      toast.success("Withdrawal approved");
      setWithdrawals(withdrawals.filter((withdrawal) => withdrawal.id !== id));
    } catch {
      toast.error("Failed to approve withdrawal");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Pending Deposits</h2>
        {deposits.map((deposit) => (
          <div key={deposit.id} className="p-4 border mb-2 rounded">
            <p>User: {deposit.user}</p>
            <p>Amount: {deposit.amount}</p>
            <button
              onClick={() => approveDeposit(deposit.id)}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Approve
            </button>
          </div>
        ))}
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Pending Withdrawals</h2>
        {withdrawals.map((withdrawal) => (
          <div key={withdrawal.id} className="p-4 border mb-2 rounded">
            <p>User: {withdrawal.user}</p>
            <p>Amount: {withdrawal.amount}</p>
            <button
              onClick={() => approveWithdrawal(withdrawal.id)}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Approve
            </button>
          </div>
        ))}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">All Users</h2>
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
      </section>
    </div>
  );
};

export default AdminDashboard;
