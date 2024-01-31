import axios from "axios";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import BackendUrl from "../../userData/BackendUrl";
import DashboardNavbar from "../Navbar";

const BuyData = () => {
  const navigate = useNavigate();
  const bankendURL = BackendUrl();
  const [dataApi, setdataApi] = useState({});
  const [selectedNetwork, setselectedNetwork] = useState([]);
  const [filterCategory, setfilterCategory] = useState([]);
  const networkOptions = ["MTN", "Airtel", "GLO", "9mobile"];
  const categories = ["SME", "CORPORATE GIFTING", "GIFTING", "DATA COUPONS"];

  useEffect(() => {
    axios.get(`${bankendURL}/sublink-api`).then((result) => {
      console.log(result.data.Dataplans);
      setdataApi(result.data.Dataplans);
    });
  }, []);

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
      // console.log("Buy Data Form Values:", values);
      Swal.fire({
        title: "Transfer successful",
        text: `${values.plan} was successfully to ${values.phoneNumber}`,
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Ok"
      })
    },
  });
  const handleChange = (event) => {
    const selectedValue = event.target.value;
    networkOptions.forEach((item) => {
      if (selectedValue === item) {
        if (item == "MTN") {
          setselectedNetwork(dataApi.MTN_PLAN.ALL);
          console.log(selectedValue);

          // console.log(filtered);
        } else if (item == "Airtel") {
          setselectedNetwork(dataApi.AIRTEL_PLAN.ALL);
        } else if (item == "GLO") {
          setselectedNetwork(dataApi.GLO_PLAN.ALL);
        } else if (item == "9mobile") {
          setselectedNetwork(dataApi["9MOBILE_PLAN"].ALL);
        }
      }
    });

    categories.forEach((items) => {
      if (items == selectedValue) {
        const filtered = selectedNetwork.filter(
          (item) => item.plan_type == selectedValue
        );
        console.log(filtered);
        setfilterCategory(filtered);
      }
    });
    buyDataFormik.handleChange(event);
  };
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
              <h1 className="modal-title fs-5" id="buyDataLabel">
                Buy Data
              </h1>
              <button
                type="button"
                className="btn-close"
                onClick={closeBtn}
              ></button>
            </div>
            <div className="modal-body">
              {/* Form */}
              <form onSubmit={buyDataFormik.handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="network" className="form-label">
                    Network
                  </label>
                  <select
                    className="form-control"
                    id="dataNetwork"
                    name="network"
                    onChange={handleChange}
                    value={buyDataFormik.values.network}
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
                  <label htmlFor="dataType" className="form-label">
                    Data Type
                  </label>
                  <select
                    className="form-control"
                    id="dataType"
                    name="dataType"
                    onChange={handleChange}
                    value={buyDataFormik.values.dataType}
                    required
                  >
                    <option defaultValue=""   hidden>
                      Choose Type
                    </option>

                    {selectedNetwork &&
                      [
                        ...new Set(
                          selectedNetwork.map((item) => item.plan_type)
                        ),
                      ].map((planType, index) => (
                        <option key={index} value={planType}>
                          {planType}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="plan" className="form-label">
                    Plan
                  </label>
                  <select
                    className="form-control"
                    id="plan"
                    name="plan"
                    onChange={handleChange}
                    value={buyDataFormik.values.plan}
                    required
                  >
                    <option defaultValue=""  hidden>
                      Choose plan
                    </option>
                    {filterCategory &&
                      filterCategory.map((item, index) => (
                        <option key={item.id} value={item.plan}>
                          {item.plan_type} {item.plan}
                          {" = "} {"₦" + item.plan_amount} {item.month_validate}
                        </option>
                      ))}
                  </select>
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
                    onChange={handleChange}
                    value={buyDataFormik.values.phoneNumber}
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
                    id="datapin"
                    name="pin"
                    onChange={handleChange}
                    value={buyDataFormik.values.pin}
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

export default BuyData;
