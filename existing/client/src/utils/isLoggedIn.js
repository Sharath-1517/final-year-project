import getCookie from "./cookie/getCookie";

const isLoggedIn = () => {
  if (!(getCookie("loggedIn") === "true")) {
    return false;
  }
  return true;
};

export default isLoggedIn;
