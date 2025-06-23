import type { ColumnDef } from "@tanstack/react-table";
import { Trash, Pencil } from "lucide-react";

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
      return (
        <div className="flex items-center gap-2 px-2">
          <Trash size={20} color="red" />
          <Pencil size={20} color="gray" />
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
      return (
        <div className="flex items-center gap-2 px-2">
          <Trash size={20} color="red" />
          <Pencil size={20} color="gray" />
        </div>
      );
    },
  },
];
