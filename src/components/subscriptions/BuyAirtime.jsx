import { useFormik } from "formik";
import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import DashboardNavbar from "../Navbar";

const BuyAirtime = () => {
  const navigate = useNavigate();
  const networkOptions = ["MTN", "Airtel", "GLO", "9mobile"];

  // Formik configuration for Buy Airtime modal
  const buyAirtimeFormik = useFormik({
    initialValues: {
      network: "",
      type: "VTU",
      amount: "",
      phoneNumber: "",
      pin: "",
    },
    onSubmit: (values) => {
      // Handle form submission logic for Buy Airtime
      // console.log("Buy Airtime Form Values:", values);
      Swal.fire({
        title: "Transfer successful",
        text: `₦${values.amount} was successfully to ${values.phoneNumber}`,
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Ok"
      })
    },
  });
  const closeBtn = () => {
    navigate("/dashboard");
  };
  return (
    <>
      <DashboardNavbar />
      <div
        className="modal show mt-5"
        style={{ display: "block", position: "static", width: "100%" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="buyAirtimeLabel">
                Airtime TopUp
              </h1>
              <button
                type="button"
                className="btn-close"
                onClick={closeBtn}
              ></button>
            </div>
            <div className="modal-body">
              {/* Form */}
              <form onSubmit={buyAirtimeFormik.handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="network" className="form-label">
                    Network
                  </label>
                  <select
                    className="form-control"
                    id="dataNetwork"
                    name="network"
                    onChange={buyAirtimeFormik.handleChange}
                    value={buyAirtimeFormik.values.network}
                    required
                  >
                    <option value="" disabled>
                      Select Network
                    </option>
                    {networkOptions.map((network) => (
                      <option key={network} value={network}>
                        {network}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="type" className="form-label">
                    Type
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="type"
                    name="type"
                    onChange={buyAirtimeFormik.handleChange}
                    value={buyAirtimeFormik.values.type}
                    disabled
                  />
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
                    onChange={buyAirtimeFormik.handleChange}
                    value={buyAirtimeFormik.values.amount}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="phoneNumber" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phoneNumber"
                    name="phoneNumber"
                    onChange={buyAirtimeFormik.handleChange}
                    value={buyAirtimeFormik.values.phoneNumber}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="pin" className="form-label">
                    PIN
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="pin"
                    name="pin"
                    onChange={buyAirtimeFormik.handleChange}
                    value={buyAirtimeFormik.values.pin}
                    required
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={closeBtn}
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Proceed
                  </button>
                </div>
              </form>
              {/* End Form */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BuyAirtime;
