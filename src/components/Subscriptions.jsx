import React from "react";
import { useFormik } from "formik";
import { Button, Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const Subscriptions = () => {



  return (
    <section className="container">
  <div className="row gap-2">
    <div className="smallDiv col">
      <i className="fas fa-wallet" style={{ color: '#FF5733' }}></i>
      <p>Fund Wallet</p>
    </div>
    <Link to='/transfer' className="smallDiv col-md">
      <i className="fas fa-exchange-alt" style={{ color: '#33FF57' }}></i>
      <p>Transfer Money</p>
    </Link>
    <Link to="/buy-airtime" className="smallDiv col-md">
      <i className="fas fa-mobile-alt" style={{ color: '#5733FF' }}></i>
      <p>Buy Airtime</p>
    </Link>
    <Link to="/buy-data" className="smallDiv col-md">
      <i className="fas fa-wifi" style={{ color: '#FF5733' }}></i>
      <p>Buy Data</p>
    </Link>
    <Link to="/history" className="smallDiv col-md">
      <i className="fas fa-history" style={{ color: '#33FF57' }}></i>
      <p>History</p>
    </Link>
  </div>
  <div className="d-flex  gap-3 justify-content-around mt-5">
    <Link to="/dashboard" className="smallDiv2 pt-3" >
      <i className="fas fa-sack-dollar" style={{ color: '#5733FF' }}></i>
      <p>Rewards</p>
    </Link>
    <Link to='/transfer' className="smallDiv2 pt-3" >
      <i className="fas fa-university" style={{ color: '#2e2e2e' }}></i>
      <p>To VaultVista</p>
    </Link>
    <Link to="/transfer" className="smallDiv2  pt-3" >
      <i className="fas fa-vault" style={{ color: '#FF5733' }}></i>
      <p>To Banks</p>
    </Link>

  </div>
</section>

  );
};

export default Subscriptions;
