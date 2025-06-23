import { Navigate } from "react-router";
import { useAuth } from "@/api/auth";

import AdminLoginForm from "@/components/LoginForm";

export default function Login() {
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
