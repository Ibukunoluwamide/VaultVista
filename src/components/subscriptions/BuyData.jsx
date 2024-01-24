import { useFormik } from 'formik';
import React from 'react'

const BuyData = () => {
      // Formik configuration for Buy Data modal
  const buyDataFormik = useFormik({
    initialValues: {
      network: "",
      dataType: "",
      plan: "",
      phoneNumber: "",
      pin: "",
    },
    onSubmit: (values) => {
      // Handle form submission logic for Buy Data
      console.log("Buy Data Form Values:", values);
    },
  });
  return (
    <>
     <div
       className="modal show"
       style={{ display: 'block', width: '100%'}}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="buyDataLabel">
              Buy Data
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {/* Form */}
              <form onSubmit={buyDataFormik.handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="network" className="form-label">
                    Network
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="dataNetwork"
                    name="dataNetwork"
                    onChange={buyDataFormik.handleChange}
                    value={buyDataFormik.values.network}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="dataType" className="form-label">
                    Data Type
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="dataType"
                    name="Type"
                    onChange={buyDataFormik.handleChange}
                    value={buyDataFormik.values.dataType}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="plan" className="form-label">
                    Plan
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="plan"
                    name="plan"
                    onChange={buyDataFormik.handleChange}
                    value={buyDataFormik.values.plan}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="phoneNumber" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="dataphoneNumber"
                    name="phoneNumber"
                    onChange={buyDataFormik.handleChange}
                    value={buyDataFormik.values.phoneNumber}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="pin" className="form-label">
                    PIN
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="datapin"
                    name="pin"
                    onChange={buyDataFormik.handleChange}
                    value={buyDataFormik.values.pin}
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
              </form>
              {/* End Form */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default BuyData