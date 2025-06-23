import { useAuth } from "@/api/auth";
import { useQuery } from "@tanstack/react-query";
import { reservation_list } from "@/api/queries";
import { reservationColumns } from "@/api/schemas";
import { DataTable } from "@/components/ui/data-table";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

function ReservationListTable() {
  const { user } = useAuth();
  const { status, data } = useQuery({
    queryKey: ["reservation-list", user],
    queryFn: () => reservation_list(user),
  });

  if (status == "error") {
    return <div>There was an error fetching the data.</div>;
  }

  if (status == "pending") {
    return <div>Loading</div>;
  }

  return (
    <div className="container py-10">
      <DataTable columns={reservationColumns} data={data.results} />
    </div>
  );
}

export default function ReservationList() {
  const navigate = useNavigate();

  return (
    <main className="min-w-full">
      <h1 className="text-2xl font-bold">Reservations</h1>

      <ReservationListTable />
      <Button onClick={() => navigate("create")}>
        <Plus /> Create new Reservation
      </Button>
    </main>
  );
}
