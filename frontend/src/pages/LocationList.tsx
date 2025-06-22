import { locationColumns } from "@/api/schemas";
import { location_list } from "@/api/queries";
import { DataTable } from "@/components/ui/data-table";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/api/auth";

function LocationListTable() {
  const { user } = useAuth();
  const { status, data } = useQuery({
    queryKey: ["location-list"],
    queryFn: () => location_list(user),
  });

  if (status == "error") {
    return <div>There was an error fetching the data.</div>;
  }

  if (status == "pending") {
    return <div>Loading</div>;
  }

  return (
    <div className="container py-10">
      <DataTable columns={locationColumns} data={data} />
    </div>
  );
}

export default function LocationList() {
  return (
    <main className="min-w-full">
      <h1 className="text-2xl font-bold">Parking Locations</h1>

      <LocationListTable />
    </main>
  );
}
