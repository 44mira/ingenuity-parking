import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";

import DashboardParkingGroup from "./DashboardParkingGroup";
import DashboardUserGroup from "./DashboardUserGroup";
import DashboardAvatar from "./DashboardAvatar";
import { Separator } from "../ui/separator";

export function DashboardSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarHeader>
          <h2 className="text-xl font-bold">Ingenuity Parking Admin</h2>
        </SidebarHeader>
        <DashboardParkingGroup />
        <DashboardUserGroup />
        <Separator className="bg-gray-300" />
        <SidebarFooter>
          <DashboardAvatar />
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
