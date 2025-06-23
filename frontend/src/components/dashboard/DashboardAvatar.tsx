import { useAuth } from "@/api/auth";
import { useQuery } from "@tanstack/react-query";

import { NavLink } from "react-router";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";

import { get_user } from "@/api/queries";

export default function DashboardAvatar() {
  const { user } = useAuth();

  const { status, data } = useQuery({
    queryKey: ["username"],
    queryFn: () => get_user(user),
  });

  if (status === "pending") {
    return (
      <div className="animate-pulse bg-gray-200 h-10 w-32 rounded-md"></div>
    );
  }

  return (
    <NavLink to="profile">
      <div className="flex gap-2 items-center border border-gray-300 rounded-md p-2">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <h2 className="">{data.username}</h2>
      </div>
    </NavLink>
  );
}
