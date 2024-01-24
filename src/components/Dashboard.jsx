import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import userData from '../userData/userData'
import Navbar from './Navbar'
import '../styles/dashboard.css'
import BackendUrl from '../userData/BackendUrl'
import Swal from 'sweetalert2';
import Subscriptions from './Subscriptions'
import VirtualCard from './VirtualCard'
const Dashboard = () => {
    const navigate = useNavigate()
    const [userDetail, setUserDetail] = useState(
      JSON.parse(localStorage["vaultvista_user"]) || null
    );  
     let backendUrl = BackendUrl()
   useEffect(() => {
    const pinStatus = JSON.parse(localStorage['pinStatus'] || null)
    // console.log(pinStatus);
    if (pinStatus==true) {
      Swal.fire({
        title: "PIN is not set yet!",
        text: 'Set Pin?',
        showCancelButton: true,
        confirmButtonText: "Ok",
        confirmButtonColor: "#3085d6",
cancelButtonColor: "#d33",
        icon: 'warning'
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem('pinStatus')
          navigate('/changepin')
        }else{
          localStorage.removeItem('pinStatus')

        }
      });
    }
    // console.log('User Detail:', userDetail);
  }, [userDetail]);





const uploadImage = (e) => {
          const formData = new FormData();
        const accNo = userDetail.account_number;
        formData.append('image', e.target.files[0]);
        formData.append('accountnumber', accNo);
  
        axios.post(`${backendUrl}/uploadImage.php`, formData)
         .then((response) => {
             if (response.data.status==true) {
               Swal.fire({
                 confirmButtonColor: '#3085d6',
                 text: response.data.message,
                 icon: 'success',
               });
               
            } else {
               Swal.fire({
                 confirmButtonColor: '#3085d6',
                 text: response.data.message,
                 icon: 'error',
               });
             }
         }).catch((err) => {
            console.log(err);
         });
  
      };

return (
    <div>
    <Navbar/>
  <main id='dash'>
    <section className="shadow-sm rounded bg-white">
     <div className="d-md-flex justify-content-around align-items-center bg-primary p-md-4 mt-5 pt-3 pb-3" style={{background: 'linear-gradient(45deg, #0045c7, #ff2c7d)'
}}>
     <VirtualCard/>
     {/* <div className="smallDiv col-md-2 mt-3  m-auto mt-md-0 m-md-0">
      <i className="fas fa-wallet"></i> 
      <p>Fund Wallet</p>
    </div> */}
    <div className="mt-3  m-auto mt-md-0 m-md-0">
      <label className="custum-file-upload" htmlFor="file">
        <div className="icon">
        <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24"><g strokeWidth="0" id="SVGRepo_bgCarrier"></g><g strokeLinejoin="round" strokeLinecap="round" id="SVGRepo_tracerCarrier"></g><g id="SVGRepo_iconCarrier"> <path fill="" d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" clipRule="evenodd" fillRule="evenodd"></path> </g></svg>

        </div>
        <div className="text">
          <span>Click to upload profile picture</span>
        </div>
        <input type="file" id="file" onChange={(e)=>uploadImage(e)} accept="image/png, image/jpeg"  />
      </label>
    </div>
     </div>
     <div className="p-3">
    <Subscriptions/>

     </div>
    </section>
    <div class="my-3 p-3 bg-body rounded shadow-sm">
    <h6 class="border-bottom pb-2 mb-0">More Services</h6>

    <div class="d-flex text-body-secondary pt-3">
        <i class="fas fa-tv fa-2x me-2 text-primary"></i>
        <div class="pb-3 mb-0 small lh-sm border-bottom w-100">
            <div class="d-flex justify-content-between align-items-center">
                <strong class="text-gray-dark">Cable Subscription</strong>
                <Link to=""><button className='btn btn-primary'>Check</button></Link>
            </div>
        </div>
    </div>

    <div class="d-flex text-body-secondary pt-3">
        <i class="fas fa-mobile-alt fa-2x me-2 text-success"></i>
        <div class="pb-3 mb-0 small lh-sm border-bottom w-100">
            <div class="d-flex justify-content-between align-items-center">
                <strong class="text-gray-dark">Airtime to Cash</strong>
                <Link to=""><button className='btn btn-primary'>Check</button></Link>
            </div>
        </div>
    </div>

    <div class="d-flex text-body-secondary pt-3">
        <i class="fas fa-bolt fa-2x me-2 text-warning"></i>
        <div class="pb-3 mb-0 small lh-sm border-bottom w-100">
            <div class="d-flex justify-content-between align-items-center">
                <strong class="text-gray-dark">Electricity Bills</strong>
                <Link to=""><button className='btn btn-primary'>Check</button></Link>
            </div>
        </div>
    </div>
</div>


  <div class="my-3 p-3 bg-body rounded shadow-sm">
    <h6 class="border-bottom pb-2 mb-0">Recent updates</h6>
    <div class="d-flex text-body-secondary pt-3">
      <svg class="bd-placeholder-img flex-shrink-0 me-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#007bff"/><text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text></svg>
      <p class="pb-3 mb-0 small lh-sm border-bottom">
        <strong class="d-block text-gray-dark">@username</strong>
        Some representative placeholder content, with some information about this user. Imagine this being some sort of status update, perhaps?
      </p>
    </div>
    <div class="d-flex text-body-secondary pt-3">
      <svg class="bd-placeholder-img flex-shrink-0 me-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#e83e8c"/><text x="50%" y="50%" fill="#e83e8c" dy=".3em">32x32</text></svg>
      <p class="pb-3 mb-0 small lh-sm border-bottom">
        <strong class="d-block text-gray-dark">@username</strong>
        Some more representative placeholder content, related to this other user. Another status update, perhaps.
      </p>
    </div>
    <div class="d-flex text-body-secondary pt-3">
      <svg class="bd-placeholder-img flex-shrink-0 me-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#6f42c1"/><text x="50%" y="50%" fill="#6f42c1" dy=".3em">32x32</text></svg>
      <p class="pb-3 mb-0 small lh-sm border-bottom">
        <strong class="d-block text-gray-dark">@username</strong>
        This user also gets some representative placeholder content. Maybe they did something interesting, and you really want to highlight this in the recent updates.
      </p>
    </div>
    <small class="d-block text-end mt-3">
      <a href="#">All updates</a>
    </small>
  </div>
  </main>
    
    </div>
);
}

export default Dashboard