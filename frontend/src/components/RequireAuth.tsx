import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/api/auth";

const RequireAuth = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login/" replace />;
  }

  return <Outlet />;
};

export default RequireAuth;
