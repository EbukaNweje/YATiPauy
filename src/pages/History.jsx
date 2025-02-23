import React, { useState } from 'react';
import './pageCss/history.css';
import { BsArrowDownLeftCircle } from "react-icons/bs";


const History = () => {
    const [filter, setFilter] = useState("All");

    const transactions = [
        { id: 1, type: "Deposit", amount: "₦5,000", date: "2024-02-18" },
        { id: 2, type: "Withdraw", amount: "₦2,000", date: "2024-02-17" },
        { id: 3, type: "Transaction", amount: "₦1,500", date: "2024-02-16" },
        { id: 4, type: "Deposit", amount: "₦10,000", date: "2024-02-15" },
    ];

    const filteredTransactions = filter === "All" 
        ? transactions 
        : transactions.filter(txn => txn.type === filter);

    return (
        <div className='history'>
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

            <div className="btnHolder">
                <button style={{border: 'none', backgroundColor: 'teal'}}>Recharge</button>
                <button style={{color: '#012306'}}>Withdraw</button>
            </div>

            <table>
                <thead>
                    <tr>
                        
                            <h3>Transactions</h3>
                            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                                <option value="All">All</option>
                                <option value="Deposit">Deposit</option>
                                <option value="Transaction">Transaction</option>
                                <option value="Withdraw">Withdraw</option>
                            </select>
                    </tr>
                </thead>
                <tbody>
                    {filteredTransactions.length > 0 ? (
                        filteredTransactions.map((txn) => (
                            <tr key={txn.id}>
                               <section>
                                <BsArrowDownLeftCircle size={45} color='teal'/>
                               <span>
                               <td>{txn.type}</td>
                               <td style={{color: "grey"}}>ID: {txn.id}</td>
                               <td>{txn.description || 'no description'}</td>
                               </span>
                               </section>
                                <span>
                                <td style={{color: 'teal'}}>{txn.amount}</td>
                                <td>{txn.date}</td>
                                </span>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" style={{ textAlign: "center" }}>No transactions found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default History;
