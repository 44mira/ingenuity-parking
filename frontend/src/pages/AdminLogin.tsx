import AdminLoginForm from "@/components/AdminLoginForm";
import { useAuth } from "@/api/auth";
import { Navigate } from "react-router";

export default function AdminLogin() {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/admin/" replace />;
  }

  return (
    <div className="flex flex-col gap-5 min-h-screen max-h-screen justify-center items-center">
      <AdminLoginForm />
    </div>
  );
}
