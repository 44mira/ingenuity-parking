import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";

import DashboardParkingGroup from "./DashboardParkingGroup";
import DashboardUserGroup from "./DashboardUserGroup";

export function DashboardSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarHeader>
          <h2 className="text-xl font-bold">Ingenuity Parking Admin</h2>
        </SidebarHeader>
        <DashboardParkingGroup />
        <DashboardUserGroup />
      </SidebarContent>
    </Sidebar>
  );
}
