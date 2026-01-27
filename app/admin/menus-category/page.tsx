import { DataTable } from "@/components/shared/data-table";
import { columns } from "./columns";
import { AddMenuCategorySheet } from "./add-menu-category-sheet";
import { getMenuCategories } from "./actions";

export default async function InventoryPage() {
  const {data,error} = await getMenuCategories();
console.log("Menu Categories Data:", data, "Error:", error);
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Menu Categories</h1>
          <p className="text-muted-foreground">Manage your hotel menu categories.</p>
        </div>
        <AddMenuCategorySheet />
      </div>

      <DataTable columns={columns} data={data||[]} searchKey="name" />
    </div>
  );
}