"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { DeleteProductButton } from "./delete-dessert-btn";
import { EditProductSheet } from "./edit-product-sheet";
interface MenuItem {
    id: string;
    name: string;
    description: string;
    image_url: string;
    price: number;
}
// Pass the MenuItem type to ColumnDef
export const columns=(categories:{id:string,name:string,description:string}[]): ColumnDef<MenuItem>[] => [
    {
    accessorKey: "image_url",
    header: "Image",
    cell: ({ row }) => (
      <div className="w-12 h-12 rounded-md overflow-hidden border bg-slate-100">
        <Image 
          src={row.original.image_url||"/images/placeholder.png"} 
          alt={row.original.name} 
          width={100}
          height={100}
          className="w-full h-full object-cover" 
        />
      </div>
    ),
  },
  {
    accessorKey: "name",
    header: "Dessert Name",
    cell: ({ row }) => <span className="font-medium">{row.getValue("name")}</span>,
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price")) / 100;
      return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
    },
  },
  
  {
    id: "actions",
    cell: ({ row }) => {
      const data = row.original;

      return (
        <div className="flex items-center justify-end gap-2">
          <EditProductSheet data={data} categories={categories}/>
          <DeleteProductButton id={data.id} name={data.name} />
        </div>
      );
    },
  },
];