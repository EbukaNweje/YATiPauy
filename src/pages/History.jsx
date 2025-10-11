import React, { useState, useEffect } from "react";
import "./pageCss/history.css";
import { BsArrowDownLeftCircle, BsArrowUpRightCircle } from "react-icons/bs";
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
  const withdrawTransactions = userData?.userTransaction?.withdrawal || [];
  const bonusHistory = userData?.userTransaction?.bonusHistory || [];
  const dailyInterestHistory =
    userData?.userTransaction?.dailyInterestHistory || [];
  const subscriptionsHistory =
    userData?.userTransaction?.subscriptionsHistory || [];

  const allTransactions = [
    ...depositTransactions.map((txn) => ({ ...txn, type: "Deposit" })),
    ...withdrawTransactions.map((txn) => ({ ...txn, type: "Withdraw" })),
    ...bonusHistory.map((txn) => ({ ...txn, type: "Bonus" })),
    ...dailyInterestHistory.map((txn) => ({ ...txn, type: "Daily Interest" })),
    ...subscriptionsHistory.map((txn) => ({ ...txn, type: "Subscription" })),
  ];

  // helper to get a timestamp for a transaction from several possible date fields
  const getTxnTimestamp = (txn) => {
    const dateStr =
      txn.depositDate ||
      txn.withdrawalDate ||
      txn.date ||
      txn.subscriptionDate ||
      txn.createdAt ||
      txn.updatedAt ||
      null;
    const t = Date.parse(dateStr);
    return isNaN(t) ? 0 : t;
  };

  const filteredTransactions =
    filter === "All"
      ? allTransactions
      : allTransactions.filter((txn) => txn.type === filter);

  // sort by timestamp descending so newest items appear first
  const sortedTransactions = filteredTransactions
    .slice()
    .sort((a, b) => getTxnTimestamp(b) - getTxnTimestamp(a));

  return (
    <div className="history">
      {/* Balance Summary */}
      <div className="balanceDiv">
        <section>
          <span>Total Recharge</span>
          <h3>
            $
            {depositTransactions
              .filter((txn) => txn.status === "confirmed")
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
              .filter((txn) => txn.status === "approved")
              .reduce((acc, txn) => acc + txn.amount, 0)
              .toFixed(2)}
          </h3>
        </section>
        <hr />
        <section>
          <span>Total Bonus</span>
          <h3>
            ${bonusHistory.reduce((acc, txn) => acc + txn.amount, 0).toFixed(2)}
          </h3>
        </section>
        <hr />
        <section>
          <span>Total Daily Interest</span>
          <h3>
            $
            {dailyInterestHistory
              .reduce((acc, txn) => acc + txn.amount, 0)
              .toFixed(2)}
          </h3>
        </section>
        <hr />
        <section>
          <span>Total Subscriptions</span>
          <h3>
            $
            {subscriptionsHistory
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
                  <option value="Bonus">Bonus Records</option>
                  <option value="Daily Interest">Daily Interest Records</option>
                  <option value="Subscription">Subscription Records</option>
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
          {sortedTransactions.length > 0 ? (
            sortedTransactions.map((txn, i) => (
              <tr key={txn._id || i}>
                <td className="type">
                  {txn.type === "Deposit" ? (
                    <BsArrowUpRightCircle size={20} color="green" />
                  ) : txn.type === "Withdraw" ? (
                    <BsArrowDownLeftCircle size={20} color="red" />
                  ) : (
                    <BsArrowUpRightCircle size={20} color="gray" />
                  )}
                  {txn.type}
                </td>
                <td className="txn-id">{txn._id || txn.id || "N/A"}</td>
                <td
                  className="amount"
                  style={{
                    color:
                      txn.type === "Deposit"
                        ? "green"
                        : txn.type === "Withdraw"
                        ? "red"
                        : "gray",
                  }}
                >
                  ${txn.amount}
                </td>
                <td className="date">
                  {txn.depositDate ||
                    txn.withdrawalDate ||
                    txn.date ||
                    txn.subscriptionDate ||
                    "N/A"}
                </td>
                <td
                  className={`status ${
                    txn.status === "confirmed"
                      ? "confirmed"
                      : txn.status === "approved"
                      ? "approved"
                      : txn.status === "active"
                      ? "active"
                      : txn.status === "pending"
                      ? "pending"
                      : txn.status === "success"
                      ? "success"
                      : "failed"
                  }`}
                >
                  {txn.status || "confirmed"}
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
