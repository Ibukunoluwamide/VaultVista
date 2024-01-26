import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BackendUrl from "../userData/BackendUrl";
import userData from "../userData/userData";
import "../styles/navbar.css";

const DashboardNavbar = (props) => {
  const backendUrl = BackendUrl();
  const { userDetail = {} } = props;
  const navigate = useNavigate();
  useEffect(() => {
    // console.log(userDetail);
    // console.log(backendUrl);
  }, [userDetail, backendUrl]);
  const logout = () => {
    localStorage.removeItem("vaultvista_id");
    localStorage.removeItem("vaultvista_user");
    localStorage.removeItem("token");
    navigate("/login");
  };
  const [isNavbarOpen, setNavbarOpen] = useState(false);

  const toggleNavbar = () => {
    setNavbarOpen(!isNavbarOpen);
  };

  const linkClickHandler = (e) => {
    setNavbarOpen(false);
    let linkColor = document.querySelectorAll(".nav_link");
    linkColor.forEach((l) => l.classList.remove("active"));
    e.currentTarget.classList.add("active");
  };

  return (
    <>
      <header className="header" id="header">
        <div className="header_img">
          {userDetail.profile_pic ? (
            <img src={userDetail.profile_pic} alt="" />
          ) : (
            <img src="/avatar.svg" alt="" />
          )}
        </div>
        <div className="d-flex align-items-center gap-5">
          <div className="dropdown ">
            <i className="fas fa-cogs nav_icon"></i>
            <div className="dropdown-content">
              <Link to="/changepin">Change Password</Link>
              <Link to="/changepin">Change PIN</Link>
            </div>
          </div>
          <div className="header_toggle">
            <i
              className={isNavbarOpen ? "fas fa-times" : "fas fa-bars"}
              onClick={toggleNavbar}
            ></i>
          </div>
        </div>
      </header>

      <div className={`l-navbar ${isNavbarOpen ? "show" : ""}`} id="nav-bar">
        <nav className="nav">
          <div>
            <Link to="/" className="nav_logo">
              <i className="fas fa-university nav_logo-icon"></i>
              <span className="nav_logo-name fas">VaultVista</span>
            </Link>
            <div className="nav_list">
              <Link
                to="/dashboard"
                className="nav_link"
                onClick={(e) => linkClickHandler(e)}
              >
                <i className="fas fa-home nav_icon"></i>
                <span className="nav_name">Dashboard</span>
              </Link>

              {/* Profile Link */}
              <Link
                to="/profile"
                className="nav_link"
                onClick={(e) => linkClickHandler(e)}
              >
                <i className="fas fa-user nav_icon"></i>
                <span className="nav_name">Profile</span>
              </Link>

              {/* Transfer Link */}
              <Link
                to="/transfer"
                className="nav_link"
                onClick={(e) => linkClickHandler(e)}
              >
                <i className="fas fa-exchange-alt nav_icon"></i>
                <span className="nav_name">Transfer</span>
              </Link>

              {/* Buy Data Link */}
              <Link
                to="/buy-data"
                className="nav_link"
                onClick={(e) => linkClickHandler(e)}
              >
                <i className="fas fa-wifi nav_icon"></i>
                <span className="nav_name">Buy Data</span>
              </Link>

              {/* Buy Airtime Link */}
              <Link
                to="/buy-airtime"
                className="nav_link"
                onClick={(e) => linkClickHandler(e)}
              >
                <i className="fas fa-mobile-alt nav_icon"></i>
                <span className="nav_name">Buy Airtime</span>
              </Link>
              {/* History Link */}
              <Link
                to="/history"
                className="nav_link"
                onClick={(e) => linkClickHandler(e)}
              >
                <i className="fas fa-history nav_icon"></i>
                <span className="nav_name">History</span>
              </Link>
            </div>
          </div>
          <a href="" className="nav_link" onClick={(e) => logout(e)}>
            <i className="fas fa-sign-out-alt nav_icon"></i>
            <span className="nav_name">Logout</span>
          </a>
        </nav>
      </div>
    </>
  );
};
export default DashboardNavbar;
