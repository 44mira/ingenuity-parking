import { Button } from "@/components/ui/button";
import { useAuth } from "@/api/auth";
import { useNavigate } from "react-router";

export default function AdminProfile() {
  const { logout, user } = useAuth();
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
