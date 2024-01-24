import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";
import SecureImg from "../assets/icons8-secure-96.png";
import SupportImg from "../assets/icons8-support-100.png";
import TrustImg from "../assets/icons8-trust-96.png";

const Home = () => {
  const [date, setDate] = useState(new Date().getFullYear())
  // console.log(date)
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div className="container">
          <Link to="/" className="navbar-brand fs-3 fas">
            VaultVista <i className="fas fa-university"></i>
          </Link>
           
          
            <span className="navbar-toggler-icon fs-3 d-md-none" data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"></span>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to="/home" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <a href="#easyShareService" className="nav-link">
                  Services
                </a>
              </li>
              <li className="nav-item">
                <a href="#easysharecontact" className="nav-link">
                  Contact
                </a>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link">
                  Register
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <section className="welSect text-center text-lg-start" id="home">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7">
              <h2 className="fw-bolder">Welcome To VaultVista</h2>
              <p className="fs-5 fw-bold">
                Experience seamless banking with VaultVista Bank. Your financial
                journey starts here.
              </p>
              <div className="mt-4 d-flex gap-3">
                <Link to="/register" className="reg  btn-primary btn-lg">
                  Register
                </Link>
                <a href="/login" className="log btn-outline-info btn-lg">
                  Login
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="easyShareService">
        <div className="container">
          <h2 className="text-center mb-5">Why Choose VaultVista?</h2>
          <div className="row">
            <div className="col-lg-4">
              <div className="cardd bg-light rounded p-4 mb-4" id="chooseUs">
                <img
                  src={SecureImg}
                  alt="Secure Icon"
                  className="m-auto card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title text-primary mt-3">
                    Secure Banking
                  </h5>
                  <p className="card-text">
                    Your funds are secured with our advanced security features,
                    ensuring a safe banking experience.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="cardd bg-white rounded p-4 mb-4" id="chooseUs">
                <img
                  src={SupportImg}
                  alt="Support Icon"
                  className="m-auto card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title text-primary mt-3">24/7 Support</h5>
                  <p className="card-text">
                    Our customer support team is available 24/7 to assist you
                    with any inquiries or issues.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="cardd bg-white rounded p-4 mb-4" id="chooseUs">
                <img
                  src={TrustImg}
                  alt="Reliable Icon"
                  className="m-auto card-img-top"
                />
                <div className="card-body">
                  <h5 className="card-title text-primary mt-3">
                    Reliable Services
                  </h5>
                  <p className="card-text">
                    Experience 100% value in all your transactions with
                    VaultVista Bank.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer" id="footer">
          <div className="container text-center">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6">
                <h4 className="fas"> VaultVista <i className="fas fa-university"></i> </h4>
              </div>
              <div className="col-lg-3 col-sm-2 col-xs-3">
                <h3 className="fs-2"> Contact </h3>
                <ul>
                  <li>
                    <i className="fas fa-envelope"></i> info@vaultvistabank.com
                  </li>
                  <li>
                    <i className="fas fa-globe"></i> vaultvista.com
                  </li>
                  <li>
                    <i className="fas fa-phone"></i> +1234567890
                  </li>
                  <li>
                    <i className="fas fa-map-marker-alt"></i> Lagos, Nigeria
                  </li>
                </ul>
              </div>
            </div>
            {/*/.row*/}
          </div>
          {/*/.container*/}
        </div>
        {/*/.footer*/}

        <div className="footer-bottom">
          <div className="container">
            <p className="pull-left copyright">
              {" "}
              Copyright © VaultVista {date}. All right reserved.{" "}
            </p>
          </div>
        </div>
        {/*/.footer-bottom*/}
      </footer>
    </>
  );
};

export default Home;
