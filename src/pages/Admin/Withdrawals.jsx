import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Withdrawals = () => {
  const [withdrawals, setWithdrawals] = useState([]);

  useEffect(() => {
    const fetchWithdrawals = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.get("/api/admin/withdrawals", config);
        setWithdrawals(response.data);
      } catch {
        toast.error("Failed to fetch withdrawals");
      }
    };

    fetchWithdrawals();
  }, []);

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
    <div>
      <h1 className="text-2xl font-bold mb-4">Pending Withdrawals</h1>
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
    </div>
  );
};

export default Withdrawals;
