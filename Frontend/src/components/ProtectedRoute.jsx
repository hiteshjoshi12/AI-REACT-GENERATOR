import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { toast } from "react-toastify";
import { storeContext } from "@/Context/StoreContext";
import { Loader2 } from "lucide-react";

const ProtectedRoute = ({ children }) => {
  const { token, isCheckingAuth } = useContext(storeContext);

  // If the Context is still reading localStorage, show a loader
  if (isCheckingAuth) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#09090B]">
        <Loader2 className="animate-spin text-purple-500" size={40} />
      </div>
    );
  }

  if (!token) {
    toast.error("You must be logged in to access this page.");
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;