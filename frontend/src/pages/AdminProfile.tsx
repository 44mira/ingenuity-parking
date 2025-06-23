import { useAuth } from "@/api/auth";
import { useNavigate } from "react-router";

import { Button } from "@/components/ui/button";

export default function AdminProfile() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div>
      <Button
        onClick={() => {
          logout();
          navigate("/login/");
        }}
      >
        Logout
      </Button>
    </div>
  );
}
