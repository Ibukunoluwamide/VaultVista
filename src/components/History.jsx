import React from 'react';
import DashboardNavbar from './Navbar';

const History= () => {
  const transactionHistory = [
    { id: 1, date: '2022-01-25', description: 'Deposit', amount: 500.00 },
    { id: 2, date: '2022-01-26', description: 'Withdrawal', amount: -200.00 },
    // Add more transaction data as needed
  ];

  return (
    <>
     <DashboardNavbar />
   <div className="container m-auto table-con">
     <div className="mt-5 pt-5">
        <h3>Transaction History</h3>
     <table className="table table-striped table-secondary table-hover">
      <thead>
        <tr>
          <th>ID</th>
          <th>Date</th>
          <th>Description</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {transactionHistory.map((transaction) => (
          <tr key={transaction.id}>
            <td>{transaction.id}</td>
            <td>{transaction.date}</td>
            <td>{transaction.description}</td>
            <td>₦{transaction.amount.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
     </div>
   </div>
    </>
  );
};

export default History
