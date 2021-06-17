import React from "react";

import LoginForm from "../../components/LoginForm";
import SignupForm from "../../components/SignupForm";

export const LogIn = ({
  refreshFiles,
  refreshUser,
  updateUserByKey,
  history
}) => {
  const [isSignUp, setisSignUp] = React.useState(false);
  React.useEffect(() => {
    if (localStorage.getItem("userToken")) {
      refreshFiles();
      refreshUser();
    }
  }, []);

  return (
    <div className="container-fluid p-0 ">
      <div className="login-wrap">
        <div className="title">
          <div className="logo"></div>
        </div>
        <div className="login-form">
          {isSignUp ? (
            <SignupForm history={history} updateUserByKey={updateUserByKey} />
          ) : (
            <LoginForm history={history} updateUserByKey={updateUserByKey} />
          )}
          <p className={"text-white"}>
            Don't have an id ?{" "}
            <a
              onClick={() => {
                setisSignUp(!isSignUp);
              }}
            >
              {isSignUp ? "Switch to Login" : "Sign up here"}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
