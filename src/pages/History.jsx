import { useState, useEffect } from "react";
import "./pageCss/history.css";
import { BsArrowDownLeftCircle, BsArrowUpRightCircle } from "react-icons/bs";
import { useSelector } from "react-redux";
import axios from "axios";

const History = () => {
  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const user = useSelector((state) => state.YATipauy.user);
  const [userData, setUserData] = useState(null);
  const [getallhistory, setGetAllHistory] = useState([]);
  const reduxId = useSelector((state) => state?.YATipauy?.id);
  const finalId = user?.user?._id || reduxId;

  /* ================= FETCH USER DATA ================= */
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `https://yaticare-backend.onrender.com/api/user/userdata/${finalId}`,
        );
        setUserData(response.data.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (finalId) fetchUserData();
  }, [finalId]);

  /* ================= FETCH HISTORY ================= */
  useEffect(() => {
    const fetchUserHistory = async () => {
      try {
        const response = await axios.get(
          `https://yaticare-backend.onrender.com/api/history/getallhistory/${finalId}`,
        );
        setGetAllHistory(response?.data?.data || []);
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    };

    if (finalId) fetchUserHistory();
  }, [finalId]);

  /* ================= USER TRANSACTIONS ================= */
  const depositTransactions = userData?.userTransaction?.deposit || [];
  const withdrawTransactions = userData?.userTransaction?.withdrawal || [];
  const bonusHistory = userData?.userTransaction?.bonusHistory || [];
  const dailyInterestHistory =
    userData?.userTransaction?.dailyInterestHistory || [];
  const subscriptionsHistory =
    userData?.userTransaction?.subscriptionsHistory || [];

  /* ================= REMOVE & EXTRACT SUBSCRIPTION RECYCLED ================= */
  const subscriptionRecycledHistory = getallhistory.filter(
    (txn) => txn.transactionType === "Subscription recycled",
  );

  /* ================= MERGE RECYCLED INTO SUBSCRIPTIONS ================= */
  const mergedSubscriptionsHistory = [
    ...subscriptionsHistory,
    ...subscriptionRecycledHistory.map((txn) => ({
      ...txn,
      type: "Subscription recycled",
      status: "active",
      amount: Number(txn.amount),
    })),
  ];

  /* ================= COMBINE ALL TRANSACTIONS ================= */
  const allTransactions = [
    ...mergedSubscriptionsHistory.map((txn) => ({
      ...txn,
      type: txn.type || "Subscription",
    })),
    ...dailyInterestHistory.map((txn) => ({
      ...txn,
      type: "Daily Interest",
      status: "confirmed",
    })),
    ...bonusHistory.map((txn) => ({
      ...txn,
      type: "Bonus",
      status: "confirmed",
    })),
    ...withdrawTransactions.map((txn) => ({
      ...txn,
      type: "Withdraw",
    })),
    ...depositTransactions.map((txn) => ({
      ...txn,
      type: "Deposit",
    })),
  ];

  /* ================= SORT ================= */
  const sortedTransactions = [...allTransactions].sort((a, b) => {
    const dateA = new Date(a.createdAt || a.date || a.updatedAt).getTime();
    const dateB = new Date(b.createdAt || b.date || b.updatedAt).getTime();
    return dateB - dateA;
  });

  /* ================= FILTER ================= */
  const filteredTransactions =
    filter === "All"
      ? sortedTransactions
      : sortedTransactions.filter(
          (txn) => txn.type === filter || txn.transactionType === filter,
        );

  /* ================= DATE FORMATTER ================= */
  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const d = new Date(dateStr);
    if (isNaN(d)) return dateStr;
    return d.toLocaleString();
  };

  /* ================= PAGINATION ================= */
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

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
          <h3>${userData?.userTransactionTotal?.withdrawalTotal || 0}.00</h3>
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
      {/* ================= TRANSACTIONS TABLE ================= */}
      <table>
        <thead>
          <tr>
            <th colSpan="6" className="table-header">
              <div className="header-content">
                <h3>Transactions</h3>
                <select
                  value={filter}
                  onChange={(e) => {
                    setFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="All">All Records</option>
                  <option value="Deposit">Deposit</option>
                  <option value="Withdraw">Withdraw</option>
                  <option value="Bonus">Bonus</option>
                  <option value="Daily Interest">Daily Interest</option>
                  <option value="Subscription">Subscription</option>
                  <option value="Subscription recycled">
                    Subscription Recycled
                  </option>
                </select>
              </div>
            </th>
          </tr>
          <tr>
            <th>Type</th>
            <th>Details</th>
            <th>Transaction ID</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {paginatedTransactions.length > 0 ? (
            paginatedTransactions.map((txn, i) => (
              <tr key={txn._id || i}>
                <td className="type">
                  {txn.type === "Withdraw" ? (
                    <BsArrowDownLeftCircle size={18} color="red" />
                  ) : (
                    <BsArrowUpRightCircle size={18} color="green" />
                  )}
                  {txn.type}
                </td>
                <td>{txn.reason || "-"}</td>
                <td>{txn._id || "N/A"}</td>
                <td>${txn.amount}</td>
                <td>{formatDate(txn.createdAt || txn.date)}</td>
                <td>{txn.status || "confirmed"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="no-records">
                No transactions found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* ================= PAGINATION ================= */}
      {filteredTransactions.length > 0 && (
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            Previous
          </button>

          <span>
            Page {currentPage} of{" "}
            {Math.ceil(filteredTransactions.length / itemsPerPage)}
          </span>

          <button
            disabled={
              currentPage >=
              Math.ceil(filteredTransactions.length / itemsPerPage)
            }
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default History;
