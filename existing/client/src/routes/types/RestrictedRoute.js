import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import isLoggedIn from "../../utils/isLoggedIn";

const RestrictedRoute = () => {
  const auth = isLoggedIn();

  return auth ? <Navigate to="/" /> : <Outlet />;
};

export default RestrictedRoute;
