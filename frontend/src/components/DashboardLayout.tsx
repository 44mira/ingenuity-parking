import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { Outlet, useLocation, useNavigate } from "react-router";
import { useAuth } from "@/api/auth";

export default function DashboardLayout() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  if (!user && pathname != "/admin-login/") {
    navigate("/admin-login/");
  }

  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="flex flex-col p-5 gap-3">
        <div className="bg-gray-200 max-w-fit h-fit rounded-lg">
          <SidebarTrigger />
        </div>
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
