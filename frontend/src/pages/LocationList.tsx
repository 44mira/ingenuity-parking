import { locationColumns } from "@/api/schemas";
import { parkingLocations } from "@/api/mockData";
import { DataTable } from "@/components/ui/data-table";

function LocationListTable() {
  const data = parkingLocations.results;

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
