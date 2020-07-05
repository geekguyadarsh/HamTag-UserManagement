import React, { useState } from "react";
import { getAUser } from "./apicalls/userapicalls";
import { isAuthenticated } from "./apicalls/authapicalls";

const ViewModal = (user) => {
  let name = user.user.name;
  let email = user.user.email;
  let gender = user.user.gender;
  let city = user.user.city;
  let phoneNo = user.user.phoneNo;

  return (
    <div className="add-btn-div col-1">
      <button
        type="button"
        className="btn btn-view"
        data-toggle="modal"
        data-target="#exampleModalCenter"
      ></button>

      <div
        className="modal fade"
        id="exampleModalCenter"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="user-name user-modal">
                Name
                <div className="inner-text">{name}</div>
              </div>
              <div className="user-email user-modal">
                Email
                <div className="inner-text">{email}</div>
              </div>
              <div className="user-gender user-modal">
                Gender
                <div className="inner-text">{gender}</div>
              </div>
              <div className="user-city user-modal">
                City
                <div className="inner-text">{city}</div>
              </div>
              <div className="user-phone user-modal">
                Phone number
                <div className="inner-text">{phoneNo}</div>
              </div>
            </div>
            <div className="modal-footer"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ViewModal;
