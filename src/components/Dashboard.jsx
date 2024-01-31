import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as userData from "../userData/userData";
import Navbar from "./Navbar";
import "../styles/dashboard.css";
import BackendUrl from "../userData/BackendUrl";
import Swal from "sweetalert2";
import Subscriptions from "./Subscriptions";
import VirtualCard from "./VirtualCard";
const Dashboard = () => {
  const navigate = useNavigate();
  const [userDetail, setUserDetail] = useState({});
  const [imgFile, setImgFile] = useState("")
  let backendUrl = BackendUrl();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (token) {
      axios
        .get(`${backendUrl}/dashboard`, {
          headers: {
            Authorization: `Bearer ${token} ${userId}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        })

        .then((result) => {
          console.log(result.data);
          if (result.data.status == true) {
            setUserDetail(result.data.userData);
            // console.log(userDetail);
            localStorage.setItem(
              "vaultvista_user",
              JSON.stringify(result.data.userData)
            );
            if (result.data.pinStatus == true) {
              // console.log(pinStatus);
              Swal.fire({
                title: "Transaction PIN not set! ",
                text: "Set your transaction PIN immediately in the settings.",
                showCancelButton: true,
                confirmButtonText: "Ok",
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                icon: "warning",
              })
            }
          } else {
            navigate("/login");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      navigate("/login");
    }
  }, []);

  const uploadImage = (e) => {
    // console.log(e.target.files[0]);
    const file = e.target.files[0];
   
    const reader = new FileReader();

    reader.onload = () => {
        // console.log(reader.result)
       setImgFile(reader.result)
    };

    reader.readAsDataURL(file);
    
  };
  const uploadFile = ()=>{
   axios.post(`${backendUrl}/uploadImage`, {file: imgFile, id: userDetail._id})
   .then((result) => {
    Swal.fire({
      text: result.data.message,
      icon: "success",
      showConfirmButton: false,
      timer: 1500
    })
   setTimeout(() => {
     window.location.reload()
   }, 2000);
   }).catch((err) => {
     
   });

 }
 
  
  return (
    <div>
      <Navbar userDetail={userDetail}/>
      <main id="dash">
        <section className="shadow-sm rounded bg-white">
          <div
            className="d-md-flex justify-content-around align-items-center bg-primary p-md-4 mt-5 pt-3 pb-3"
            style={{ background: "linear-gradient(45deg, #0045c7, #ff2c7d)" }}
          >
            <VirtualCard userDetail={userDetail} />

          
<div className="bg-white rounded p-3">
<h5 className="text-center" htmlFor="">Upload Profile Image</h5>
<div className="input-group mb-3 mt-3 ">
  <input type="file" className="form-control" onChange={(e) => uploadImage(e)}
                  accept="image/png, image/jpeg"/>
  <label className="input-group-text" for="inputGroupFile02" onClick={uploadFile}>Upload</label>
</div>
</div>
                
          </div>
          <div className="p-3">
            <Subscriptions />
          </div>
        </section>
        <div class="my-3 p-3 bg-body rounded shadow-sm">
          <h6 class="border-bottom pb-2 mb-0">Recent Notification</h6>
          <div class="d-flex text-body-secondary pt-3">
            <svg
              class="bd-placeholder-img flex-shrink-0 me-2 rounded"
              width="32"
              height="32"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Placeholder: 32x32"
              preserveAspectRatio="xMidYMid slice"
              focusable="false"
            >
              <title>Placeholder</title>
              <rect width="100%" height="100%" fill="#007bff" />
              <text x="50%" y="50%" fill="#007bff" dy=".3em">
                32x32
              </text>
            </svg>
            <p class="pb-3 mb-0 small lh-sm border-bottom">
              <strong class="d-block text-gray-dark">@username</strong>
              Some representative placeholder content, with some information
              about this user. Imagine this being some sort of status update,
              perhaps?
            </p>
          </div>
          <div class="d-flex text-body-secondary pt-3">
            <svg
              class="bd-placeholder-img flex-shrink-0 me-2 rounded"
              width="32"
              height="32"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Placeholder: 32x32"
              preserveAspectRatio="xMidYMid slice"
              focusable="false"
            >
              <title>Placeholder</title>
              <rect width="100%" height="100%" fill="#e83e8c" />
              <text x="50%" y="50%" fill="#e83e8c" dy=".3em">
                32x32
              </text>
            </svg>
            <p class="pb-3 mb-0 small lh-sm border-bottom">
              <strong class="d-block text-gray-dark">@username</strong>
              Some more representative placeholder content, related to this
              other user. Another status update, perhaps.
            </p>
          </div>
          <div class="d-flex text-body-secondary pt-3">
            <svg
              class="bd-placeholder-img flex-shrink-0 me-2 rounded"
              width="32"
              height="32"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Placeholder: 32x32"
              preserveAspectRatio="xMidYMid slice"
              focusable="false"
            >
              <title>Placeholder</title>
              <rect width="100%" height="100%" fill="#6f42c1" />
              <text x="50%" y="50%" fill="#6f42c1" dy=".3em">
                32x32
              </text>
            </svg>
            <p class="pb-3 mb-0 small lh-sm border-bottom">
              <strong class="d-block text-gray-dark">@username</strong>
              This user also gets some representative placeholder content. Maybe
              they did something interesting, and you really want to highlight
              this in the recent updates.
            </p>
          </div>
          <small class="d-block text-end mt-3">
            <a href="#">All notifications</a>
          </small>
        </div>
        <div class="my-3 p-3 bg-body rounded shadow-sm">
          <h6 class="border-bottom pb-2 mb-0">More Services</h6>

          <div class="d-flex text-body-secondary pt-3">
            <i class="fas fa-tv fa-2x me-2 text-primary"></i>
            <div class="pb-3 mb-0 small lh-sm border-bottom w-100">
              <div class="d-flex justify-content-between align-items-center">
                <strong class="text-gray-dark">Cable Subscription</strong>
                <Link to="">
                  <button className="btn btn-primary">Check</button>
                </Link>
              </div>
            </div>
          </div>

          <div class="d-flex text-body-secondary pt-3">
            <i class="fas fa-mobile-alt fa-2x me-2 text-success"></i>
            <div class="pb-3 mb-0 small lh-sm border-bottom w-100">
              <div class="d-flex justify-content-between align-items-center">
                <strong class="text-gray-dark">Airtime to Cash</strong>
                <Link to="">
                  <button className="btn btn-primary">Check</button>
                </Link>
              </div>
            </div>
          </div>

          <div class="d-flex text-body-secondary pt-3">
            <i class="fas fa-bolt fa-2x me-2 text-warning"></i>
            <div class="pb-3 mb-0 small lh-sm border-bottom w-100">
              <div class="d-flex justify-content-between align-items-center">
                <strong class="text-gray-dark">Electricity Bills</strong>
                <Link to="">
                  <button className="btn btn-primary">Check</button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        
      </main>
    </div>
  );
};

export default Dashboard;
