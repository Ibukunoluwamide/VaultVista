import { useFormik } from 'formik';
import React from 'react'
import * as yup from "yup";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackendUrl from '../userData/BackendUrl';
import axios from 'axios';
import { useEffect } from 'react';
import Navbar from './Navbar';
import userData from '../userData/userData';

const Profile = () => {
    const navigate = useNavigate();
    const backendUrl = BackendUrl();
    let userDetail = userData()
    const [user, setuser] = useState(
      JSON.parse(localStorage["vaultvista_user"]) || null
    );
    useEffect(() => {}, [user]);
    // console.log(user);
    const formik = useFormik({
      initialValues: {
        firstname: user.first_name,
        middlename: user.middle_name,
        lastname: user.last_name,
        email: user.email,
        phoneNumber: user.phone_number,
        nationalId: user.national_id,
        country: user.country,
        dateOfBirth: user.date_of_birth,
        gender: user.gender,
        accountnumber: user.account_number,
      },
      validationSchema: yup.object({
        firstname: yup.string().required("First Name is required"),
        middlename: yup.string(),
        lastname: yup.string().required("Last Name is required"),
        email: yup
          .string()
          .email("Invalid email address")
          .required("Email is required"),
        phoneNumberNumber: yup.string().required("phoneNumber is required"),
        nationalId: yup.string(),
        country: yup.string().required("Country is required"),
        dateOfBirth: yup.string(),
        gender: yup.string().required("Gender is required"),
      }),
      onSubmit: (values) => {
        console.log(values);
        // axios.post(`${backendUrl}/updateprofile.php`, values)
        //   .then((result) => {
        //     console.log(result);
        //     if (result.data.status == true) {
        //       Swal.fire({
        //         confirmButtonColor: "#3085d6",
        //         text: result.data.message,
        //         icon: "success",
        //       });
        //       navigate("/dashboard");
        //     }
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //   });
      },
    });
  
    return (
      <>
        <Navbar />
        <section className="text-white container p-2">
          <div className="center-wrap2 col-md-5 m-auto p-md-3 p-2">
            <form onSubmit={formik.handleSubmit}>
              <h3 className="text-center">Edit Personal Information</h3>
  
              {/* First Name */}
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                  <div className="form-group">
                    <label className="profile_details_text">First Name:</label>
                    <input
                      type="text"
                      name="firstname"
                      className={`form-control ${
                        formik.touched.firstname && formik.errors.firstname
                          ? "is-invalid"
                          : ""
                      }`}
                      value={formik.values.firstname}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                    />
                    {formik.touched.firstname && formik.errors.firstname && (
                      <div className="invalid-feedback">
                        {formik.errors.firstname}
                      </div>
                    )}
                  </div>
                </div>
  
                {/* Middle Name */}
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                  <div className="form-group">
                    <label className="profile_details_text">Middle Name:</label>
                    <input
                      type="text"
                      name="middlename"
                      className={`form-control ${
                        formik.touched.middlename && formik.errors.middlename
                          ? "is-invalid"
                          : ""
                      }`}
                      value={formik.values.middlename}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      
                    />
                    {formik.touched.middlename && formik.errors.middlename && (
                      <div className="invalid-feedback">
                        {formik.errors.middlename}
                      </div>
                    )}
                  </div>
                </div>
              </div>
  
              {/* Last Name */}
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="form-group">
                  <label className="profile_details_text">Last Name:</label>
                  <input
                    type="text"
                    name="lastname"
                    className={`form-control ${
                      formik.touched.lastname && formik.errors.lastname
                        ? "is-invalid"
                        : ""
                    }`}
                    value={formik.values.lastname}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                  />
                  {formik.touched.lastname && formik.errors.lastname && (
                    <div className="invalid-feedback">
                      {formik.errors.lastname}
                    </div>
                  )}
                </div>
              </div>
              {/* Email Address */}
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div className="form-group">
                    <label className="profile_details_text">Email Address:</label>
                    <input
                      type="email"
                      name="email"
                      className={`form-control ${
                        formik.touched.email && formik.errors.email
                          ? "is-invalid"
                          : ""
                      }`}
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                      disabled
                    />
                    {formik.touched.email && formik.errors.email && (
                      <div className="invalid-feedback">
                        {formik.errors.email}
                      </div>
                    )}
                  </div>
                </div>
              </div>
  
              {/* Mobile Number */}
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div className="form-group">
                    <label className="profile_details_text">Mobile Number:</label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      className={`form-control ${
                        formik.touched.phoneNumber && formik.errors.phoneNumber
                          ? "is-invalid"
                          : ""
                      }`}
                      value={formik.values.phoneNumber}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                      pattern="[0-9]{10}"
                      disabled
                    />
                    {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                      <div className="invalid-feedback">
                        {formik.errors.phoneNumber}
                      </div>
                    )}
                  </div>
                </div>
              </div>
  
              {/* Date Of Birth */}
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div className="form-group">
                    <label className="profile_details_text">Date Of Birth:</label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      className={`form-control ${
                        formik.touched.dateOfBirth && formik.errors.dateOfBirth
                          ? "is-invalid"
                          : ""
                      }`}
                      value={formik.values.dateOfBirth}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      disabled
                    />
                    {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
                      <div className="invalid-feedback">
                        {formik.errors.dateOfBirth}
                      </div>
                    )}
                  </div>
                </div>
              </div>
  
              {/* Gender */}
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div className="form-group">
                    <label className="profile_details_text">Gender:</label>
                    <select
                      name="gender"
                      className={`form-control ${
                        formik.touched.gender && formik.errors.gender
                          ? "is-invalid"
                          : ""
                      }`}
                      value={formik.values.gender}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                    >
                      <option value="" disabled>
                        Select Gender
                      </option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                    {formik.touched.gender && formik.errors.gender && (
                      <div className="invalid-feedback">
                        {formik.errors.gender}
                      </div>
                    )}
                  </div>
                </div>
              </div>
  
              {/* Country */}
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div className="form-group">
                    <label className="profile_details_text">Country:</label>
                    <input
                      type="text"
                      name="country"
                      className={`form-control ${
                        formik.touched.country && formik.errors.country
                          ? "is-invalid"
                          : ""
                      }`}
                      value={formik.values.country}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                      disabled
                    />
                    {formik.touched.country && formik.errors.country && (
                      <div className="invalid-feedback">
                        {formik.errors.country}
                      </div>
                    )}
                  </div>
                </div>
              </div>
  
              {/* National ID */}
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                  <div className="form-group">
                    <label className="profile_details_text">National ID:</label>
                    <input
                      type="text"
                      name="nationalId"
                      className={`form-control ${
                        formik.touched.nationalId && formik.errors.nationalId
                          ? "is-invalid"
                          : ""
                      }`}
                      value={formik.values.nationalId}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.nationalId && formik.errors.nationalId && (
                      <div className="invalid-feedback">
                        {formik.errors.nationalId}
                      </div>
                    )}
                  </div>
                </div>
              </div>
  
              {/* Submit Button */}
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 submit">
                  <div className="form-group">
                    <input
                      type="submit"
                      className="btn btn-success"
                      value="Update"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </section>
      </>
    );
}

export default Profile