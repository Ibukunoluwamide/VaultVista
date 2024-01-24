import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import BackendUrl from "../userData/BackendUrl";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const Register = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };
  const backendUrl = BackendUrl();
  const navigate = useNavigate();
  const [Countries, setCountries] = useState([]);
  useEffect(() => {
    axios
      .get("https://countriesnow.space/api/v0.1/countries")
      .then((result) => {
        setCountries(result.data.data);
      });
    // console.log(Countries);
  }, []);

  const formik = useFormik({
    initialValues: {
      first_name: "",
      middle_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      national_id: "",
      country: "",
      date_of_birth: "",
      gender: "",
      password: "",
      confirm_password: "",
      pin: "1234",
      account_number: Math.round(Math.random() * 10000000000),
      agreement: true,
    },
    validationSchema: yup.object({
      first_name: yup
        .string()
        .required("First Name is required")
        .min(3, "Minimum length required is 3"),
      middle_name: yup.string().min(3, "Minimum length required is 3"),
      last_name: yup
        .string()
        .required("Last Name is required")
        .min(3, "Minimum length required is 3"),
      email: yup
        .string()
        .email("Invalid email address")
        .required("Email is required"),
      phone_number: yup
        .string()
        .required("Phone Number is required")
        .min(11, "Invalid Phone Number"),
      national_id: yup.string(),
      country: yup.string().required("Country is required"),
      date_of_birth: yup.string().required("Date of Birth is required"),
      gender: yup.string().required("Gender is required"),
      password: yup
        .string()
        .required("Password is required")
        .min(6, "Password must be at least 6 characters"),
      confirm_password: yup
        .string()
        .required("Confirm Password is required")
        .min(6, "Password must be at least 6 characters")
        .oneOf([yup.ref("password"), null], "Passwords does not match"),
      agreement: yup.boolean().oneOf([true], "Agreement is required"),
    }),
    onSubmit: (values) => {
      // console.log(values);
      axios
        .post(`${backendUrl}/register`, values)
        .then((result) => {
          // console.log(result);
          if (result.data.status == true) {
            //  console.log(result.data);
            toast.success(result.data.message);
            navigate("/login");
          } else {
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
  const submitBtn = () => {
    formik.validateForm().then((errors) => {
      if (Object.keys(errors).length === 0) {
        formik.handleSubmit();
      } else {
    // console.log("Validation errors:", errors);
        Swal.fire({
          confirmButtonColor: "#3085d6",
          text: "Please fill in all required fields before proceeding.",
          icon: "error",
        });
      }
    });
  };
  return (
    <>
      <div className="card-front text-white text-center ">
        <div className="center-wrap m-auto p-md-3 p-2 shadow col-md-5">
          <div className="section">
            <img
              src="/avatar.svg"
              alt=""
              className="login-im"
              style={{ width: "130px" }}
            />
            <h4 className="mb-4">Register</h4>
            <p>
              Welcome to VaultVista. Please fill out the form below to create
              your account.
            </p>

            <form onSubmit={formik.handleSubmit}>
              {currentStep === 1 && (
                <>
                  {/* Step 1: Personal Information */}
                  {/* First Name */}
                  <div className="form-group">
                    <input
                      type="text"
                      name="first_name"
                      className="form-style"
                      placeholder="First Name"
                      id="first_name"
                      autoComplete="off"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.first_name}
                    />
                    <i className="input-icon fas fa-user"></i>
                  </div>
                  <div className="text-danger text-start">
                    {formik.touched.first_name && formik.errors.first_name && (
                      <span>{formik.errors.first_name}</span>
                    )}
                  </div>

                  {/* Middle Name */}
                  <div className="form-group">
                    <input
                      type="text"
                      name="middle_name"
                      className="form-style"
                      placeholder="Middle Name"
                      id="middle_name"
                      autoComplete="off"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.middle_name}
                    />
                    <i className="input-icon fas fa-user"></i>
                  </div>
                  <div className="text-danger text-start">
                    {formik.touched.middle_name &&
                      formik.errors.middle_name && (
                        <span>{formik.errors.middle_name}</span>
                      )}
                  </div>

                  {/* Last Name */}
                  <div className="form-group">
                    <input
                      type="text"
                      name="last_name"
                      className="form-style"
                      placeholder="Last Name"
                      id="last_name"
                      autoComplete="off"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.last_name}
                    />
                    <i className="input-icon fas fa-user"></i>
                  </div>
                  <div className="text-danger text-start">
                    {formik.touched.last_name && formik.errors.last_name && (
                      <span>{formik.errors.last_name}</span>
                    )}
                  </div>

                  {/* Email */}
                  <div className="form-group">
                    <input
                      type="text"
                      name="email"
                      className="form-style"
                      placeholder="Email address"
                      id="email"
                      autoComplete="off"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.email}
                    />
                    <i className="input-icon fas fa-envelope"></i>
                  </div>
                  <div className="text-danger text-start">
                    {formik.touched.email && formik.errors.email && (
                      <span>{formik.errors.email}</span>
                    )}
                  </div>
                  <div className="sign_up text-end pt-2">
                    <Link to="/login" className="a">
                      Already a member?
                    </Link>
                  </div>
                  <div className="text-end">
                    <button
                      type="button"
                      className="btn btn-info text-white w-25 mt-4"
                      onClick={nextStep}
                    >
                      Next
                    </button>
                  </div>
                </>
              )}

              {currentStep === 2 && (
                <>
                  {/* Step 2: Contact Information */}

                  <div className="form-group">
                    <input
                      type="tel"
                      name="phone_number"
                      className="form-style"
                      placeholder="Phone Number"
                      id="phone_number"
                      autoComplete="off"
                      maxLength="11"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.phone_number}
                    />
                    <i className="input-icon fas fa-phone"></i>
                  </div>
                  <div className="text-danger text-start">
                    {formik.touched.phone_number &&
                      formik.errors.phone_number && (
                        <span>{formik.errors.phone_number}</span>
                      )}
                  </div>
                  {/* National ID */}
                  <div className="form-group">
                    <input
                      type="text"
                      name="national_id"
                      className="form-style"
                      placeholder="National ID(optional)"
                      id="national_id"
                      autoComplete="off"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.national_id}
                    />
                    <i className="input-icon fas fa-id-card"></i>
                  </div>
                  <div className="text-danger text-start">
                    {formik.touched.national_id &&
                      formik.errors.national_id && (
                        <span>{formik.errors.national_id}</span>
                      )}
                  </div>

                  {/* Country */}
                  <div className="form-group">
                    <select
                      name="country"
                      className="form-style"
                      placeholder="Your Country"
                      id="country"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.country}
                    >
                      <option value="" hidden>
                        Select Country
                      </option>
                      {Countries &&
                        Countries.map((item, index) => (
                          <option key={index} value={item.country}>
                            {item.country}
                          </option>
                        ))}
                    </select>

                    <i className="input-icon fas fa-globe"></i>
                  </div>
                  <div className="text-danger text-start">
                    {formik.touched.country && formik.errors.country && (
                      <span>{formik.errors.country}</span>
                    )}
                  </div>

                  {/* Date of Birth */}
                  <div className="form-group">
                    <input
                      type="date"
                      name="date_of_birth"
                      className="form-style"
                      id="date_of_birth"
                      autoComplete="off"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.date_of_birth}
                    />
                    <i className="input-icon fas fa-calendar"></i>
                  </div>
                  <div className="text-danger text-start">
                    {formik.touched.date_of_birth &&
                      formik.errors.date_of_birth && (
                        <span>{formik.errors.date_of_birth}</span>
                      )}
                  </div>

                  {/* Gender */}
                  <div className="form-group">
                    <select
                      name="gender"
                      className="form-style"
                      id="gender"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.gender}
                    >
                      <option value="" label="Select Gender"></option>
                      <option value="male" label="Male"></option>
                      <option value="female" label="Female"></option>
                      <option value="other" label="Other"></option>
                    </select>
                    <i className="input-icon fas fa-venus-mars"></i>
                  </div>
                  <div className="text-danger text-start">
                    {formik.touched.gender && formik.errors.gender && (
                      <span>{formik.errors.gender}</span>
                    )}
                  </div>
                  <div className="sign_up text-end pt-2">
                    <Link to="/login" className="a">
                      Already a member?
                    </Link>
                  </div>
                  <div className="d-flex justify-content-between mt-2">
                    <button
                      type="button"
                      className="btn btn-secondary w-25 mt-4"
                      onClick={prevStep}
                    >
                      Previous
                    </button>
                    <button
                      type="button"
                      className="btn btn-info text-white w-25 mt-4"
                      onClick={nextStep}
                    >
                      Next
                    </button>
                  </div>
                </>
              )}

              {currentStep === 3 && (
                <>
                  {/* Step 3: Account Information */}
                  {/* Password */}
                  <div className="form-group">
                    <input
                      type="password"
                      name="password"
                      className="form-style"
                      placeholder="Password"
                      id="password"
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

                  {/* Confirm Password */}
                  <div className="form-group mt-2">
                    <input
                      type="password"
                      name="confirm_password"
                      className="form-style"
                      placeholder="Confirm Password"
                      id="confirm_password"
                      autoComplete="off"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.confirm_password}
                    />
                    <i className="input-icon fas fa-lock"></i>
                  </div>
                  <div className="text-danger text-start">
                    {formik.touched.confirm_password &&
                      formik.errors.confirm_password && (
                        <span>{formik.errors.confirm_password}</span>
                      )}
                  </div>

                  {/* Agreement */}
                  <div className="d-flex justify-content-between mt-2">
                    <div className="check_box">
                      <input
                        type="checkbox"
                        name="agreement"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        checked={formik.values.agreement}
                      />
                      <span className="ps-1">
                        Agree to terms and conditions
                      </span>
                    </div>
                    <div className="sign_up">
                      <Link to="/login" className="a">
                        Already a member?
                      </Link>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between mt-2">
                    <button
                      type="button"
                      className="btn btn-secondary w-25 mt-4"
                      onClick={prevStep}
                    >
                      Previous
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary w-25 mt-4 text-center"
                      onClick={submitBtn}
                    >
                      Register
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
