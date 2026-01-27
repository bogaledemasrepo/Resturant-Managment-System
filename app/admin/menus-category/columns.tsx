"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DeleteMenuCategoryButton } from "./delete-menu-category-btn";
import { EditCategorySheet } from "./edit-menu-category-sheet";

// Pass the Dessert type to ColumnDef
export const columns: ColumnDef<{
    id: string;
    name: string;
    description: string;
}>[] = [
    
  {
    accessorKey: "name",
    header: "Category Name",
    cell: ({ row }) => <span className="font-medium">{row.getValue("name")}</span>,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => <span className="font-medium">{row.getValue("description")}</span>,
  },
  
  {
    id: "actions",
    cell: ({ row }) => {
      const dessert = row.original;

      return (
        <div className="flex items-center justify-end gap-2">
          <EditCategorySheet id={dessert.id} name={dessert.name} description={dessert.description} />
          <DeleteMenuCategoryButton id={dessert.id} name={dessert.name} />
        </div>
      );
    },
  },
];