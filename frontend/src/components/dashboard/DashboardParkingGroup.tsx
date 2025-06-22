import { NavLink } from "react-router";
import { ParkingMeter } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items.
const items = [
  {
    title: "Locations",
    url: "locations",
  },
  {
    title: "Reservations",
    url: "reservations",
  },
];

export default function DashboardParkingGroup() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>
        <div className="flex gap-1 justify-center items-center">
          <span className="font-bold">Parking</span>
          <ParkingMeter size={20} strokeWidth={1.25} />
        </div>
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <NavLink to={item.url}>
                  <span>{item.title}</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
