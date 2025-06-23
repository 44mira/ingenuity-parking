import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Trash, Pencil, X } from "lucide-react";
import { useAuth } from "./auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reservation_delete, location_delete } from "./queries";
import { useNavigate } from "react-router";

export type Location = {
  id: number;
  slots: number;
  available_slots: number;
  name: string;
};

export type Reservation = {
  id: number;
  location: {
    name: string;
  };
  price: string;
  price_currency: string;
  status: "ACTIVE" | "UPCOMING" | "CANCELLED" | "PAST";
  reserve_start: string;
  reserve_end: string;
  created_at: string;
  owner: number;
};

export const locationColumns: ColumnDef<Location>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "available_slots",
    header: "Available Slots",
  },
  {
    accessorKey: "slots",
    header: "Total Slots",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const queryClient = useQueryClient();
      const navigate = useNavigate();
      const id = row.original.id;
      const { user } = useAuth();
      const mutation = useMutation({
        mutationFn: () => {
          return location_delete(user, id);
        },
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["location-list", user],
          });
        },
      });

      return (
        <div className="flex items-center gap-2 px-2">
          <Button variant="outline" onClick={() => mutation.mutate()}>
            <Trash size={20} color="red" />
          </Button>
          <Button variant="outline" onClick={() => navigate(`update/${id}/`)}>
            <Pencil size={20} color="gray" />
          </Button>
        </div>
      );
    },
  },
];

export const reservationColumns: ColumnDef<Reservation>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "location.name",
    header: "Location",
  },
  {
    accessorKey: "price_currency",
    header: "Currency",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "reserve_start",
    header: "Start Time",
    cell: ({ row }) => {
      const formatted = new Date(row.getValue("reserve_start"));
      return (
        <div className="text-left font-medium">
          {formatted.toLocaleString()}
        </div>
      );
    },
  },
  {
    accessorKey: "reserve_end",
    header: "End Time",
    cell: ({ row }) => {
      const formatted = new Date(row.getValue("reserve_end"));
      return (
        <div className="text-left font-medium">
          {formatted.toLocaleString()}
        </div>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Created At",
    cell: ({ row }) => {
      const formatted = new Date(row.getValue("created_at"));
      return (
        <div className="text-left font-medium">
          {formatted.toLocaleString()}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const id = row.original.id;
      const queryClient = useQueryClient();
      const { user } = useAuth();
      const mutation = useMutation({
        mutationFn: () => {
          return reservation_delete(user, id);
        },
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["reservation-list", user],
          });
        },
      });

      return (
        <div className="flex items-center gap-2 px-2">
          <X size={20} color="red" />
          <Button variant="outline" onClick={() => mutation.mutate()}>
            <Trash size={20} color="red" />
          </Button>
          <Pencil size={20} color="gray" />
        </div>
      );
    },
  },
];
