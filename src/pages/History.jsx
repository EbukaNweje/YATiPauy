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
  const reduxId = useSelector((state) => state?.YATipauy?.id);
  const finalId = user?.user?._id || reduxId;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `https://yaticare-backend.onrender.com/api/user/userdata/${finalId}`
        );
        setUserData(response.data.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (finalId) {
      fetchUserData();
    }
  }, [user, finalId]);

  const depositTransactions = userData?.userTransaction?.deposit || [];
  const withdrawTransactions = userData?.userTransaction?.withdrawal || [];
  const bonusHistory = userData?.userTransaction?.bonusHistory || [];
  const dailyInterestHistory =
    userData?.userTransaction?.dailyInterestHistory || [];
  const subscriptionsHistory =
    userData?.userTransaction?.subscriptionsHistory || [];

  const allTransactions = [
    ...subscriptionsHistory.map((txn) => ({ ...txn, type: "Subscription" })),
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
    ...withdrawTransactions.map((txn) => ({ ...txn, type: "Withdraw" })),
    ...depositTransactions.map((txn) => ({ ...txn, type: "Deposit" })),
  ];

  const sortedTransactions = [...allTransactions].sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return dateB - dateA;
  });

  // console.log(
  //   "Dates before sorting:",
  //   allTransactions.map((txn) => ({
  //     id: txn._id,
  //     type: txn.type,
  //     date: txn.createdAt || txn.date || txn.updatedAt,
  //   }))
  // );

  // console.log(
  //   sortedTransactions.map((txn) => ({
  //     type: txn.type,
  //     amount: txn.amount,
  //     date: txn.createdAt || txn.date || txn.updatedAt,
  //   }))
  // );

  // helper to get a timestamp for a transaction from several possible date fields
  const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    const d = new Date(dateStr);
    if (isNaN(d)) return dateStr;
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = d.getFullYear();
    const hh = String(d.getHours()).padStart(2, "0");
    const min = String(d.getMinutes()).padStart(2, "0");
    const ss = String(d.getSeconds()).padStart(2, "0");
    return `${dd}/${mm}/${yyyy}, ${hh}:${min}:${ss}`;
  };

  // console.log("userData", userData);

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
            <th>Details</th>
            <th>Transaction ID</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {sortedTransactions.length > 0 ? (
            sortedTransactions
              .slice(
                (currentPage - 1) * itemsPerPage,
                currentPage * itemsPerPage
              )
              .map((txn, i) => (
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
                  <td>{txn.reason}</td>
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
                    {formatDate(
                      txn.depositDate ||
                        txn.withdrawalDate ||
                        txn.date ||
                        txn.showDate ||
                        txn.createdAt ||
                        txn.updatedAt
                    )}
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
              <td colSpan="6" className="no-records">
                No transactions found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls */}
      {sortedTransactions.length > 0 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="pagination-button"
          >
            Previous
          </button>
          <span className="page-info">
            Page {currentPage} of{" "}
            {Math.ceil(sortedTransactions.length / itemsPerPage)}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min(
                  Math.ceil(sortedTransactions.length / itemsPerPage),
                  prev + 1
                )
              )
            }
            disabled={
              currentPage >= Math.ceil(sortedTransactions.length / itemsPerPage)
            }
            className="pagination-button"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default History;
