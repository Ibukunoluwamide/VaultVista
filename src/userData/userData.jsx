import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import BackendUrl from './BackendUrl';

const userData = () => {
    const navigate = useNavigate()
    let backendUrl = BackendUrl()
    const [userDetail, setUserDetail] = useState({})
    useEffect(() => {
        const token = localStorage.getItem('token')
        const userId = localStorage.getItem('userId')
        if (token) {
          axios.get(`${backendUrl}/dashboard`, {
            headers: {
                    Authorization: `Bearer ${token} ${userId}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    
                  }
          })

          .then((result) => {
            // console.log(result.data);
              if (result.data.status==true) {
                //   console.log(result.data.data);
                  setUserDetail(result.data.userData)
                  localStorage.setItem('vaultvista_user', JSON.stringify(result.data.userData))
                  if (result.data.pinStatus==true) {
                    localStorage.setItem('pinStatus', result.data.pinStatus)
                  }
              }else{
                localStorage.removeItem('token')
                  navigate('/login')
              }
          }).catch((err) => {
              console.log(err);
          });
        }else{
           navigate('/login')
        }
        
    }, [])
    return userDetail
    
  
}

export default userData