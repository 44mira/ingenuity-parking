import { useAuth } from "@/api/auth";
import { useQuery } from "@tanstack/react-query";

import { DataTable } from "@/components/ui/data-table";

import { user_list } from "@/api/queries";
import { userColumns } from "@/api/schemas";

function UserListTable() {
  const { user } = useAuth();
  const { status, data } = useQuery({
    queryKey: ["user-list", user],
    queryFn: () => user_list(user),
  });

  if (status == "error") {
    return <div>There was an error fetching the data.</div>;
  }

  if (status == "pending") {
    return <div>Loading</div>;
  }

  return (
    <div className="container py-10">
      <DataTable columns={userColumns} data={data.results} />
    </div>
  );
}

export default function UserList() {
  return (
    <main className="min-w-full">
      <h1 className="text-2xl font-bold">Users</h1>

      <UserListTable />
    </main>
  );
}
