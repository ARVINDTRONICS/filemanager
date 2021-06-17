import React from "react";
import logo from "../../assets/img/msd-logo.svg";

export const NavBar = ({ userName, refreshFiles, refreshUser, history }) => {
  return (
    <div className="navbar-wrap">
      <div className="logo">
        <img alt="logo" src={logo}></img>
      </div>
      <div className="user-profile">
        <h4>{`Welcome,${userName}`}</h4>
        <h4
          onClick={() => {
            refreshFiles();
            refreshUser();

            history.push("/login");
          }}
          className="logout"
        >
          Logout
        </h4>
      </div>
    </div>
  );
};
