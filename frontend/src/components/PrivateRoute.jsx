import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  // For demo purposes, always allow access
  return children;
};

export default PrivateRoute;
