import { lazy } from "react";

const Home = lazy(() => import("../containers/Home"));
const LogIn = lazy(() => import("../containers/LogIn"));
export default [
  {
    name: "home",
    path: "/home",
    component: Home,
    exact: true,
    authentication: true
  },
  {
    name: "default",
    path: "/",
    component: LogIn,
    exact: true,
    authentication: false
  },
  {
    name: "login",
    path: "/login",
    component: LogIn,
    exact: true,
    authentication: false
  }
];
