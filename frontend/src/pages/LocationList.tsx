import { locationColumns } from "@/api/schemas";
import { location_list } from "@/api/queries";
import { DataTable } from "@/components/ui/data-table";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

function LocationListTable() {
  const { status, data } = useQuery({
    queryKey: ["location-list"],
    queryFn: location_list,
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

      <QueryClientProvider client={queryClient}>
        <LocationListTable />
      </QueryClientProvider>
    </main>
  );
}
