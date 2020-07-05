import React, { useState, useEffect } from "react";
import "./index.css";
import { isAuthenticated, signout } from "./apicalls/authapicalls";
import { getAllUsers, deleteUser } from "./apicalls/userapicalls";
import ViewModal from "./ViewModal";
import AddUserModal from "./AddUserModal";
import { Link, Redirect } from "react-router-dom";

const Dashboard = () => {
  const [users, setUsers] = useState([]);

  const { token } = isAuthenticated();

  const preload = () => {
    getAllUsers(token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setUsers(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const deletThiseUser = (userId, token) => {
    deleteUser(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        preload();
      }
    });
  };

  const userInfoCard = (users) => {
    return users.map((user, index) => {
      return (
        <div key={index} className="user-info">
          <div className="main-content row user-container">
            <div className="sl-no col-1 content-text">{index + 1}</div>
            <div className="name col-2 content-text">{user.name}</div>
            <div className="gender col-2 content-text">{user.gender}</div>
            <div className="city col-2 content-text">{user.city}</div>
            <div className="phone col-2 content-text">{user.phoneNo}</div>

            <ViewModal user={user} />
            <div className="add-btn-div col-1">
              <button
                onClick={() => {
                  deletThiseUser(user._id, token);
                }}
                className="btn btn-delete"
              ></button>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="dashboard">
      <div className="container-fluid">
        <div className="row flex-row flex-nowrap">
          <div className="col-md-2 dashboard-sidebar">
            <p className="sidebar-text">
              <b>USERS</b>
            </p>
          </div>
          <div className="col-md-10 main container-fluid">
            <div className="blank-head">
              <Link
                className="btn btn-danger signout-btn"
                onClick={() => {
                  signout(() => {
                    return <Redirect to="/" />;
                  });
                }}
              >
                Signout
              </Link>
            </div>
            <div className="header-tab">
              <div className="main-header row">
                <div className="sl-no col-1 header-text">Sl. No</div>
                <div className="name col-2 header-text">Name</div>
                <div className="gender col-2 header-text">Gender</div>
                <div className="city col-2 header-text">City</div>
                <div className="phone col-2 header-text">Phone No.</div>
                <AddUserModal />
              </div>
            </div>
            <div className="content-container">{userInfoCard(users)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
