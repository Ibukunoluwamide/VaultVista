import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import BackendUrl from "../../userData/BackendUrl";
import Swal from "sweetalert2";

const ChangePin = () => {
  const [msg, setMsg] = useState("");
  const [style, setStyle] = useState("");
  const backendUrl = BackendUrl();
  const [user, setuser] = useState(JSON.parse(localStorage['vaultvista_user'])||null)
  useEffect(() => {
  }, [user])
  const formik = useFormik({
    initialValues: {
      current_pin: "",
      new_pin: "",
      confirm_pin: "",
      id: user._id
    },
    validationSchema: yup.object({
      current_pin: yup
        .string()
        .required("Current PIN is required")
        .length(4, "PIN must be 4 digits"),
      new_pin: yup
        .string()
        .required("New PIN is required")
        .length(4, "PIN must be 4 digits"),
      confirm_pin: yup
        .string()
        .required("Confirm PIN is required")
        .length(4, "PIN must be 4 digits")
        .oneOf([yup.ref("new_pin"), null], "PINs does not match"),
    }),
    onSubmit: (values) => {
      // Handle form submission here
      // console.log(values);
      if(values.new_pin=="1234"){
        Swal.fire({
          title: "Default PIN can't be used",
          text: "Enter another PIN!",
          icon: "error",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Ok"
        })
      }else{

        axios
          .post(`${backendUrl}/changepin`, values)
          .then((result) => {
            // console.log(result);
            if (result.data.status == true) {
              Swal.fire({
                confirmButtonColor: "#3085d6",
                text: result.data.message,
                icon: "success",
              });
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
      }
    },
  });

  return (
   
        <form onSubmit={formik.handleSubmit} className="center-wrap2 col-md-4  p-md-3 p-2">
        <div className="pb-3 d-flex align-items-center"> <h3>Change PIN </h3> <span style={{ fontSize: 'smaller' }}>(default PIN is 1234)</span></div>
          <div className="form-group">
            <input
              type="password"
              name="current_pin"
              className="form-style"
              placeholder="Current PIN"
              id="current_pin"
              autoComplete="off"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.current_pin}
            />
            <i className="input-icon fas fa-lock"></i>
          </div>
          <div className="text-danger text-start">
            {formik.touched.current_pin && formik.errors.current_pin && (
              <span>{formik.errors.current_pin}</span>
            )}
          </div>
          <div className="form-group mt-2">
            <input
              type="password"
              name="new_pin"
              className="form-style"
              placeholder="New PIN"
              id="new_pin"
              autoComplete="off"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.new_pin}
            />
            <i className="input-icon fas fa-lock"></i>
          </div>
          <div className="text-danger text-start">
            {formik.touched.new_pin && formik.errors.new_pin && (
              <span>{formik.errors.new_pin}</span>
            )}
          </div>
          <div className="form-group mt-2">
            <input
              type="password"
              name="confirm_pin"
              className="form-style"
              placeholder="Confirm PIN"
              id="confirm_pin"
              autoComplete="off"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirm_pin}
            />
            <i className="input-icon fas fa-lock"></i>
          </div>
          <div className="text-danger text-start">
            {formik.touched.confirm_pin && formik.errors.confirm_pin && (
              <span>{formik.errors.confirm_pin}</span>
            )}
          </div>
          <button type="submit" className="btnn mt-4">Change Pin</button>
        </form>
       
  
  );
};

export default ChangePin;
