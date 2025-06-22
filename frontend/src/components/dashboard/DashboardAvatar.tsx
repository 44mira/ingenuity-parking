import { NavLink } from "react-router";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";

export default function DashboardAvatar() {
  return (
    <NavLink to="profile">
      <div className="flex gap-2 items-center border border-gray-300 rounded-md p-2">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <h2 className="">Username</h2>
      </div>
    </NavLink>
  );
}
