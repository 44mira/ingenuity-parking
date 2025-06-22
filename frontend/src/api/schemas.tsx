import type { ColumnDef } from "@tanstack/react-table";

export type Location = {
  id: number;
  slots: number;
  available_slots: number;
  name: string;
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
];
