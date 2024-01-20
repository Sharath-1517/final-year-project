import React from "react";
import { Navigate, Outlet } from "react-router-dom";

//utils
import isLoggedIn from "../../utils/isLoggedIn";

const PrivateRoute = () => {
  const auth = isLoggedIn();

  return auth ? <Outlet private_route={true} /> : <Navigate to="/login" />;
};

export default PrivateRoute;
