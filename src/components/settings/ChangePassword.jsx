import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import Swal from 'sweetalert2';
import BackendUrl from '../../userData/BackendUrl';

const ChangePassword = () => {
  const [msg, setMsg] = useState('');
  const [style, setStyle] = useState('');
  const backendUrl = BackendUrl();
  const [user, setuser] = useState(JSON.parse(localStorage['vaultvista_user'])||null)
  useEffect(() => {
  }, [user])
  const formik = useFormik({
    initialValues: {
      current_password: '',
      new_password: '',
      confirm_password: '',
      id: user._id
    },
    validationSchema: yup.object({
      current_password: yup.string().required('Current Password is required'),
      new_password: yup.string().required('New Password is required').min(6, 'Password must be at least 6 characters'),
      confirm_password: yup.string()
        .required('Confirm Password is required')
        .oneOf([yup.ref('new_password'), null], 'Passwords does not match'),
    }),
    onSubmit: values => {
      // Handle form submission here
      // console.log(values);
      axios
      .post(`${backendUrl}/changepassword`, values)
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
    },
  });



  return (
    <form onSubmit={formik.handleSubmit}  className="center-wrap2 col-md-4  p-md-3 p-2 mt-4 mt-md-0">
              <h3 className=" pb-3">Change Password</h3>

            <div className="form-group">
              <input
                type="password"
                name="current_password"
                className="form-style"
                placeholder="Current Password"
                id="current_password"
                autoComplete="off"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.current_password}
              />
              <i className="input-icon fas fa-lock"></i>
            </div>
            <div className="text-danger text-start">
              {formik.touched.current_password && formik.errors.current_password && (
                <span>{formik.errors.current_password}</span>
              )}
            </div>
            <div className="form-group mt-2">
              <input
                type="password"
                name="new_password"
                className="form-style"
                placeholder="New Password"
                id="new_password"
                autoComplete="off"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.new_password}
              />
              <i className="input-icon fas fa-lock"></i>
            </div>
            <div className="text-danger text-start">
              {formik.touched.new_password && formik.errors.new_password && (
                <span>{formik.errors.new_password}</span>
              )}
            </div>
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
              {formik.touched.confirm_password && formik.errors.confirm_password && (
                <span>{formik.errors.confirm_password}</span>
              )}
            </div>
            <button type="submit" className="btnn mt-4">Change Password</button>
          </form>
  );
};

export default ChangePassword;
