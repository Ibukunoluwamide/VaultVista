import React from 'react'
import Navbar from './Navbar'
import ChangePassword from './settings/ChangePassword'
import ChangePin from './settings/ChangePin'

const Pin_Password = () => {
  return (
    <>
        <Navbar/>
        <div className="container text-white">
        <div className="d-md-flex justify-content-center gap-5 " >
          <ChangePin/>
          <ChangePassword/>
       </div>
     </div>
    </>
  )
}

export default Pin_Password