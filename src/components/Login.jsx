import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import BackendUrl from "../userData/BackendUrl";
import { toast } from "react-toastify";

const Login = () => {
  const backendUrl = BackendUrl();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      phoneNumber: "",
      password: "",
    },
    validationSchema: yup.object({
      phoneNumber: yup.string().required("Phone Number is required"),
      password: yup.string().required("Password is required"),
    }),
    onSubmit: (values) => {
      console.log(values);
      axios
        .post(`${backendUrl}/login`, values)
        .then((result) => {
          console.log(result.data);
          if (result.data.status == true) {
            localStorage.setItem('token', result.data.token);
            localStorage.setItem('userId', result.data.userId);
            navigate("/dashboard");
            toast.success(result.data.message);
          } else {
            toast.error(result.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  return (
    <>
      <div className="card-front text-white text-center mt-4">
        <div className="center-wrap m-auto col-md-4 p-md-3 p-2 mt-5">
          <div className="section">
            
            <img
              src="/login.svg"
              alt=""
              className="login-im"
              style={{ width: "80px" }}
            />
            <h4 className="pb-3 pt-3">Log In</h4>
            <form onSubmit={formik.handleSubmit}>
              <div className="form-group">
                <input
                  type="tel"
                  name="phoneNumber"
                  className="form-style"
                  placeholder="Phone number"
                  id="logphoneNumber"
                  autoComplete="off"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phoneNumber}
                />
                <i className="input-icon fas fa-phone"></i>
              </div>
              <div className="text-danger text-start">
                {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                  <span>{formik.errors.phoneNumber}</span>
                )}
              </div>
              <div className="form-group mt-2">
                <input
                  type="password"
                  name="password"
                  className="form-style"
                  placeholder="Password"
                  id="logpass"
                  autoComplete="off"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
                <i className="input-icon fas fa-lock"></i>
              </div>
              <div className="text-danger text-start">
                {formik.touched.password && formik.errors.password && (
                  <span>{formik.errors.password}</span>
                )}
              </div>
              <div className="d-flex justify-content-between pt-3">
                <div className="check_box">
                  <input type="checkbox" />
                  <span className="ps-1">Remember me</span>
                </div>
                <div className="forget_div">
                  <Link to="#" className="a">
                    Forgot password?
                  </Link>
                </div>
              </div>
              <button type="submit" className="btnn mt-4">
                Log In
              </button>
            </form>
            <div className="pt-3">
              <Link to="/register" className="ps-3 a">
                <span>Not a member?</span>{" "}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
