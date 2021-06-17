import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { signUpService } from "../../services/index";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
const SignUpSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address format")
    .required("Email is required"),
  password: Yup.string()
    .min(3, "Password must be 3 characters at minimum")
    .required("Password is required")
});
const SignUpForm = ({ history, updateUserByKey }) => {
  const [isSnackBar, setisSnackBar] = React.useState({
    state: false,
    message: "",
    severity: "success"
  });
  const [userName, setUserName] = React.useState("");

  async function handleSignUp(values) {
    let res = await signUpService(values);

    if (res.status === 200) {
      setUserName(values.email);
      updateUserByKey({ isLoggedIn: true, username: values.email });
      setisSnackBar({
        state: true,
        message: "Successfully Created User",
        severity: "success"
      });
      setTimeout(() => {
        history.push("/home");
      }, 3000);
    } else {
      setisSnackBar({
        state: true,
        message: "Error while creating User",
        severity: "error"
      });
    }
  }

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={isSnackBar.state}
        onClose={() => {
          setisSnackBar({ state: false });
        }}
        autoHideDuration={2000}
      >
        <MuiAlert elevation={6} variant="filled" severity={isSnackBar.severity}>
          {isSnackBar.message}
        </MuiAlert>
      </Snackbar>
      <>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={SignUpSchema}
          onSubmit={async (values, actions) => {
            actions.setSubmitting(false);
            await handleSignUp(values);
          }}
        >
          {({ touched, errors, isSubmitting }) => (
            <Form className="login">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Field
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  className={`form-control ${
                    touched.email && errors.email ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  component="div"
                  name="email"
                  className="invalid-feedback"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Field
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  className={`form-control ${
                    touched.password && errors.password ? "is-invalid" : ""
                  }`}
                />
                <ErrorMessage
                  component="div"
                  name="password"
                  className="invalid-feedback"
                />
              </div>

              <button
                type="submit"
                className="btn  btn-block"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Please wait..." : "Sign Up"}
              </button>
            </Form>
          )}
        </Formik>
      </>
    </>
  );
};
export default SignUpForm;
