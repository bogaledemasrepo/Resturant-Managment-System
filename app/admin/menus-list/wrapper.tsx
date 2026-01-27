"use client";
import { DataTable } from "@/components/shared/data-table";
import { columns } from "./columns";

function DataTableWrapper({
  data,
  categories,
}: {
  data: {
    id: string;
    name: string;
    category: string;
    price: number;
    image_url: string;
    description: string;
  }[];
  categories: { id: string; name: string; description: string }[];
}) {
  return (
    <DataTable
      data={data || []}
      searchKey="name"
      columns={columns(categories || [])}
    />
  );
}

export default DataTableWrapper;
