import React, { useState, useEffect } from "react";
import "./pageCss/history.css";
import { BsArrowDownLeftCircle } from "react-icons/bs";
import { useSelector } from "react-redux";
import axios from "axios";

const History = () => {
  const [filter, setFilter] = useState("All");
  const user = useSelector((state) => state.YATipauy.user);
  const [userData, setUserData] = useState(null);
  console.log(user.user._id);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `https://yaticare-back-end.vercel.app/api/user/userdata/${user.user._id}`
      );
      // only set the actual data part
      setUserData(response.data.data);
      console.log("this", response.data.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    if (user?.user?._id) {
      fetchUserData();
    }
  }, [user]);

  // ✅ safe optional chaining + fallback arrays
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
      <div className="balanceDiv">
        <section>
          <span>Total Recharge</span>
          <h3>₦0.00</h3>
        </section>
        <hr />
        <section>
          <span>Total Withdrawal</span>
          <h3>₦0.00</h3>
        </section>
      </div>

      <table>
        <thead>
          <tr>
            <h3>Transactions</h3>
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="All">All Records</option>
              <option value="Deposit">Deposit Records</option>
              <option value="Withdraw">Withdrawal Records</option>
            </select>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((txn, i) => (
              <tr key={txn._id || i}>
                <section>
                  <BsArrowDownLeftCircle size={45} color="teal" />
                  <span>
                    <td>{txn.type}</td>
                    <td style={{ color: "grey" }}>
                      ID: {txn._id || txn.id || "N/A"}
                    </td>
                    {/* <td>{txn.description || "no description"}</td> */}
                  </span>
                </section>
                <span>
                  <td style={{ color: "teal" }}>${txn.amountusdt}</td>
                  <td>{txn.date}</td>
                </span>
                <span>{txn.status}</span>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" style={{ textAlign: "center" }}>
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
