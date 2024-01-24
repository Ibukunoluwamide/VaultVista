import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Navbar from './Navbar';
import axios from 'axios';
import BackendUrl from '../userData/BackendUrl';
import Swal from 'sweetalert2';

const Transfer = () => {
 const backendUrl = BackendUrl()
 const [bankList, setbankList] = useState([])
 const [user, setuser] = useState(JSON.parse(localStorage['vaultvista_user'])||null)
 useEffect(() => {
 }, [user])
 useEffect(() => {
  const config = {
    method: 'get',
    url: 'https://api.tryduplo.com/v1/merchants/utilities/banks/list?country=Nigeria',
    headers: {
      'Authorization': 'Bearer dp_test_b8fd9f3f397e01b225c0c76c99fa87ca22ab273d479e10a3fce16a69f021877e06720cca83d16d17bb560e44b930c3c2bc10211cc7a4570ece7b0038e37376ef3c2a6a67565b4ecb2f5a080a4be1ed5d08db629064fc78aae74b4edf494c46e31b90827d29e047afa84ced13d4204482e886e5b32acd1b8b9a86018dc1bfcc93'
    }
  };

  axios(config)
    .then(response => {
      setbankList(response.data.data)
    })
    .catch(error => {
      console.log(error);
    });
   }, [])
   
  const validationSchema = yup.object({
    accountNumber: yup.string().required('Account Number is required').matches(/^\d{10}$/, 'Invalid account number format'),
    bank: yup.string().required('Select Bank'),
    amount: yup.string().required('Amount is required'),
    pin: yup.string().required('PIN is required'),
    notes: yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      accountNumber: '',
      bank: '',
      amount: '',
      pin: '',
      notes: '',
      senderAccountNumber: user.account_number
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      console.log(user.account_number);
        const amount = values.amount;
        // Format as currency
        const formattedAmount = new Intl.NumberFormat('en-NG', {
          style: 'currency',
          currency: 'NGN',
        }).format(amount);
    
        if (values.accountNumber === user.account_number) {
          Swal.fire({
            confirmButtonColor: "#3085d6",
            title: "Transfer to other accounts",
            text: `${values.accountNumber} is your Account number`,
            icon: "error"
          });
        } else {
          axios.post(`${backendUrl}/accountChecker`, values)
            .then(response => {
                const res = response.data;
                console.log(res);
              if (res.status == false) {
                Swal.fire({
                  confirmButtonColor: "#3085d6",
                  text: res.result.message,
                  icon: "error"
                });
              } else {
                Swal.fire({
                  title: "Are you sure?",
                  text: `Send ${formattedAmount} to ${res.result.data.account_name}`,
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Confirm"
                }).then((result) => {
                  if (result.isConfirmed) {
                    axios.post(`${backendUrl}/transfer`, values)
                      .then(result => {
                        const res = result.data;
                        console.log(res);
                        if (res.status == false) {
                          Swal.fire({
                            confirmButtonColor: "#3085d6",
                            text: res.message,
                            icon: "error"
                          });
                        } else {
                          Swal.fire({
                            confirmButtonColor: "#3085d6",
                            text: res.message,
                            icon: "success"
                          });
                        }
                      })
                      .catch(error => {
                        console.error('Error making transfer:', error);
                      });
                  }
                });
              }
            })
            .catch(error => {
              console.error('Error checking account:', error);
            });
        }
    },
  });

  return (
    <>
    <Navbar/>
    <div className="container">
      <div className="row justify-content-center">
        <div className="">
          <div className="center-wrap2 shadow p-3 rounded col-md-5 m-auto text-white">
            <div className="card-header">
              <h4 className="card-title">Transfer Funds</h4>
            </div>
            <div className="card-body">
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="accountNumber" className="form-label">
                    Account Number
                    <span style={{ fontSize: 'small' }}>(a valid account number)</span>
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="accountNumber"
                    name="accountNumber"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.accountNumber}
                  />
                  {formik.touched.accountNumber && formik.errors.accountNumber && (
                    <div className="text-danger">{formik.errors.accountNumber}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="bank">Select Bank</label>
                  <select
                    name="bank"
                    className="form-control"
                    id="accountName"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.bank}
                  >
                    <option value="">Select Bank</option>
                    {bankList && (bankList.map((bank) => (
                      <option key={bank.code} value={bank.code}>
                        {bank.name}
                      </option>
                    )))}
                  </select>
                  {formik.touched.bank && formik.errors.bank && <div className="text-danger">{formik.errors.bank}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="amount" className="form-label">
                    Amount
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="amount"
                    name="amount"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.amount}
                  />
                  {formik.touched.amount && formik.errors.amount && (
                    <div className="text-danger">{formik.errors.amount}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="pin" className="form-label">
                    PIN <span style={{ fontSize: 'smaller' }}>(default PIN is 1234)</span>
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="pin"
                    name="pin"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.pin}
                  />
                  {formik.touched.pin && formik.errors.pin && <div className="text-danger">{formik.errors.pin}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="notes" className="form-label">
                    Notes
                  </label>
                  <textarea
                    className="form-control"
                    id="notes"
                    name="notes"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.notes}
                    rows="3"
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">
                  Transfer
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Transfer;
