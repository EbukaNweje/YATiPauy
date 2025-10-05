import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Deposits = () => {
  const [deposits, setDeposits] = useState([]);

  useEffect(() => {
    const fetchDeposits = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.get("/api/admin/deposits", config);
        setDeposits(response.data);
      } catch {
        toast.error("Failed to fetch deposits");
      }
    };

    fetchDeposits();
  }, []);

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

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Pending Deposits</h1>
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
    </div>
  );
};

export default Deposits;
