import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { toast } from "react-toastify";
import { storeContext } from "@/Context/StoreContext";

const ProtectedRoute = ({ children }) => {
  const { token } = useContext(storeContext);

  if (!token) {
    toast.error("You must be logged in to access this page.");
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
