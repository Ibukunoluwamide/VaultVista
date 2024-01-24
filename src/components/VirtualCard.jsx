import React, { useState } from 'react';
import userData from '../userData/userData';
import '../styles/virtualcard.css'; 

const VirtualCard = () => {
  const userDetail = userData()
  // console.log(userDetail);
  
// Format as currency
const formattedAmount = new Intl.NumberFormat('en-NG', {
  style: 'currency',
  currency: 'NGN',
}).format(userDetail.accountBal);
const copyAccountNumber = () => {
  const accountNumber = userDetail?.account_number;

  if (accountNumber) {
    navigator.clipboard.writeText(accountNumber).then(() => {
      alert('Account Number copied to clipboard');

    })
  }
};
  return (
    <>
            {
              userDetail && (
    <div className="custom-card">
      <div className="custom-card-inner">
        <div className="custom-front">
          {/* <div className="custom-row">
            <img src="https://i.ibb.co/WHZ3nRJ/visa.png" width="60px" alt="Visa" />
          </div> */}
          <div className="custom-row custom-card-holder">
            <p>CARD HOLDER</p>
          <img src="https://i.ibb.co/G9pDnYJ/chip.png" width="60px" alt="Chip" />
          </div>
                <> 
          <div className="custom-row custom-name">
                <p>{userDetail.first_name} {userDetail.last_name}</p>
          </div>
          <div className="custom-card-no text-center d-flex align-items-center justify-content-center" >
            <span>{userDetail.account_number}</span>  
            <span className="fas fa-copy"></span>          
          </div>
          <div className="custom-row custom-card-holder">
            <p>BALANCE</p>
            <p>VALID TILL</p>
          </div>
          <div className="custom-row custom-name">
            <p>{formattedAmount}</p>
            <p>10 / 99</p>
          </div>
                </>
                </div>
                
                </div>
                </div>
                )
              }
              </>
  );
};

export default VirtualCard;
