import React, { useState, useEffect } from "react";
import "./pageCss/history.css";
import { BsArrowDownLeftCircle } from "react-icons/bs";
import { useSelector } from "react-redux";
import axios from "axios";

const History = () => {
  const [filter, setFilter] = useState("All");
  const user = useSelector((state) => state.YATipauy.user);
  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `https://yaticare-back-end.vercel.app/api/user/userdata/${user.user._id}`
      );
      setUserData(response.data.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    if (user?.user?._id) {
      fetchUserData();
    }
  }, [user]);

  const depositTransactions = userData?.userTransaction?.deposit || [];
  const withdrawTransactions = userData?.userTransaction?.withdraw || [];

  const allTransactions = [
    ...depositTransactions.map((txn) => ({ ...txn, type: "Deposit" })),
    ...withdrawTransactions.map((txn) => ({ ...txn, type: "Withdraw" })),
  ];

  const filteredTransactions =
    filter === "All"
      ? allTransactions
      : allTransactions.filter((txn) => txn.type === filter);

  return (
    <div className="history">
      {/* Balance Summary */}
      <div className="balanceDiv">
        <section>
          <span>Total Recharge</span>
          <h3>
            $
            {depositTransactions
              .filter((txn) => txn.status === "success") // ✅ only successful deposits
              .reduce((acc, txn) => acc + txn.amount, 0)
              .toFixed(2)}
          </h3>
        </section>
        <hr />
        <section>
          <span>Total Withdrawal</span>
          <h3>
            $
            {withdrawTransactions
              .filter((txn) => txn.status === "success") // ✅ only successful withdrawals
              .reduce((acc, txn) => acc + txn.amount, 0)
              .toFixed(2)}
          </h3>
        </section>
      </div>

      {/* Transactions Table */}
      <table>
        <thead>
          <tr>
            <th colSpan="5" className="table-header">
              <div className="header-content">
                <h3>Transactions</h3>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="All">All Records</option>
                  <option value="Deposit">Deposit Records</option>
                  <option value="Withdraw">Withdrawal Records</option>
                </select>
              </div>
            </th>
          </tr>
          <tr className="column-titles">
            <th>Type</th>
            <th>Transaction ID</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {filteredTransactions.length > 0 ? (
            filteredTransactions
              .slice()
              .reverse()
              .map((txn, i) => (
                <tr key={txn._id || i}>
                  <td className="type">
                    <BsArrowDownLeftCircle size={20} color="teal" />
                    {txn.type}
                  </td>
                  <td className="txn-id">{txn._id || txn.id || "N/A"}</td>
                  <td className="amount">${txn.amount}</td>
                  <td className="date">{txn.depositDate}</td>
                  <td
                    className={`status ${
                      txn.status === "success"
                        ? "success"
                        : txn.status === "pending"
                        ? "pending"
                        : "failed"
                    }`}
                  >
                    {txn.status}
                  </td>
                </tr>
              ))
          ) : (
            <tr>
              <td colSpan="5" className="no-records">
                No transactions found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default History;
