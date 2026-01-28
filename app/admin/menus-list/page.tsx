import { AddMenuItemSheet } from "./add-menu-item-sheet";
import { getMenuItems } from "./actions";
import { getMenuCategories } from "../menus-category/actions";
import DataTableWrapper from "./wrapper";

export default async function InventoryPage() {
  const {data,error} = await getMenuItems();
  const {data: categories, error: categoriesError} = await getMenuCategories();

  console.log("Menu items error:",data, error);
  console.log("Categories error:", categoriesError);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Menu List</h1>
          <p className="text-muted-foreground">Manage your hotel menu list.</p>
        </div>
        <AddMenuItemSheet categories={categories||[]}  />
      </div>
      <DataTableWrapper data={data || []} categories={categories||[]} />
    </div>
  );
}