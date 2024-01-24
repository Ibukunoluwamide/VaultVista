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
import Swal from 'sweetalert2';

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
        first_name: user.first_name,
        middle_name: user.middle_name,
        last_name: user.last_name,
        email: user.email,
        phone_number: user.phone_number,
        national_id: user.national_id,
        country: user.country,
        date_of_birth: user.date_of_birth,
        gender: user.gender,
        account_number: user.account_number,
        id: user._id,
      },
      validationSchema: yup.object({
        first_name: yup.string().required("First Name is required"),
        middle_name: yup.string(),
        last_name: yup.string().required("Last Name is required"),
        email: yup
          .string()
          .email("Invalid email address")
          .required("Email is required"),
        phone_number: yup.string().required("Phone Number is required"),
        national_id: yup.string(),
        country: yup.string().required("Country is required"),
        date_of_birth: yup.string(),
        gender: yup.string().required("Gender is required"),
      }),
      onSubmit: (values) => {
        console.log(values);
        axios.post(`${backendUrl}/updateprofile`, values)
          .then((result) => {
              // console.log(result);
              if (result.data.status == true) {
                  Swal.fire({
                      confirmButtonColor: "#3085d6",
                      text: result.data.message,
                      icon: "success",
                    });
                    navigate("/dashboard");
            }else{
              Swal.fire({
                confirmButtonColor: "#3085d6",
                text: result.data.message,
                icon: "error",
              });
            }
          })
          .catch((err) => {
              console.log(err);
          });
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
                      name="first_name"
                      className={`form-control ${
                        formik.touched.first_name && formik.errors.first_name
                          ? "is-invalid"
                          : ""
                      }`}
                      value={formik.values.first_name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                    />
                    {formik.touched.first_name && formik.errors.first_name && (
                      <div className="invalid-feedback">
                        {formik.errors.first_name}
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
                      name="middle_name"
                      className={`form-control ${
                        formik.touched.middle_name && formik.errors.middle_name
                          ? "is-invalid"
                          : ""
                      }`}
                      value={formik.values.middle_name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      
                    />
                    {formik.touched.middle_name && formik.errors.middle_name && (
                      <div className="invalid-feedback">
                        {formik.errors.middle_name}
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
                      formik.touched.last_name && formik.errors.last_name
                        ? "is-invalid"
                        : ""
                    }`}
                    value={formik.values.last_name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    required
                  />
                  {formik.touched.last_name && formik.errors.last_name && (
                    <div className="invalid-feedback">
                      {formik.errors.last_name}
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
                      name="phone_number"
                      className={`form-control ${
                        formik.touched.phone_number && formik.errors.phone_number
                          ? "is-invalid"
                          : ""
                      }`}
                      value={formik.values.phone_number}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      required
                      pattern="[0-9]{10}"
                      disabled
                    />
                    {formik.touched.phone_number && formik.errors.phone_number && (
                      <div className="invalid-feedback">
                        {formik.errors.phone_number}
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
                      name="date_of_birth"
                      className={`form-control ${
                        formik.touched.date_of_birth && formik.errors.date_of_birth
                          ? "is-invalid"
                          : ""
                      }`}
                      value={formik.values.date_of_birth}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      disabled
                    />
                    {formik.touched.date_of_birth && formik.errors.date_of_birth && (
                      <div className="invalid-feedback">
                        {formik.errors.date_of_birth}
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
                      name="national_id"
                      className={`form-control ${
                        formik.touched.national_id && formik.errors.national_id
                          ? "is-invalid"
                          : ""
                      }`}
                      value={formik.values.national_id}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.national_id && formik.errors.national_id && (
                      <div className="invalid-feedback">
                        {formik.errors.national_id}
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