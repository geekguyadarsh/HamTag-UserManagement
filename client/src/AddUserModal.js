import React, { useState } from "react";
import { getAUser, createUser } from "./apicalls/userapicalls";
import { isAuthenticated } from "./apicalls/authapicalls";

const AddUserModal = () => {
  const { token } = isAuthenticated();
  const [values, setValues] = useState({
    name: "",
    email: "",
    genders: ["Male", "Female"],
    gender: "",
    city: "",
    phoneNo: "",
    error: "",
    createdUser: "",
    success: false,
  });

  const {
    name,
    email,
    genders,
    gender,
    city,
    phoneNo,
    error,
    createdUser,
    success,
  } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const successMessage = () => (
    <div
      className="alert alert-success mt-3"
      style={{ display: createdUser ? "" : "none" }}
    >
      <h4>{createdUser} is created Successfully.</h4>
    </div>
  );

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    createUser(token, { name, email, gender, city, phoneNo }).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, success: false });
      } else {
        setValues({
          ...values,
          name: "",
          email: "",
          gender: "",
          city: "",
          phoneNo: "",
          createdUser: data.name,
        });
      }
    });
  };

  const errorMessage = () => (
    <div
      className="alert alert-danger mt-3"
      style={{ display: error ? "" : "none" }}
    >
      <h4>{error}</h4>
    </div>
  );

  return (
    <div className="add-btn-div col-3">
      <button
        type="button"
        className="btn btn-primary btn add-btn"
        data-toggle="modal"
        data-target=".bd-example-modal-lg"
      >
        + Add
      </button>

      <div
        className="modal fade bd-example-modal-lg"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="myLargeModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-center">Add User</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="user-form">
              {successMessage()}
              {errorMessage()}
              <form>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>Name</label>
                    <input
                      className="form-control"
                      onChange={handleChange("name")}
                      type="text"
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label>Phone No.</label>
                    <input
                      className="form-control"
                      onChange={handleChange("phoneNo")}
                      type="number"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="inputState">Gender</label>
                    <select
                      onChange={handleChange("gender")}
                      className="form-control"
                      placeholder="Select Gender"
                    >
                      <option>Select Gender</option>
                      {genders.map((gender, index) => (
                        <option key={index} value={gender}>
                          {gender}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="inputCity">City</label>
                    <input
                      type="text"
                      onChange={handleChange("city")}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>Email</label>
                    <input
                      className="form-control"
                      onChange={handleChange("email")}
                      type="email"
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <button
                      type="submit"
                      onClick={onSubmit}
                      className="btn btn-success mb-2 add-user-btn"
                    >
                      Add User
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUserModal;
