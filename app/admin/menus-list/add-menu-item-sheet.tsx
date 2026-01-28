"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet";// Ensure MenuForm accepts 'initialData' prop
import { MenuForm } from "./menu-form";

export function AddMenuItemSheet({categories}:{categories:{id:string,name:string,description:string}[]}) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="p-2 hover:bg-slate-100 text-slate-600 rounded-lg transition-colors flex gap-4 items-center">
          <Plus size={18} /> Add Menu Item
        </button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-135 overflow-y-auto">
        <SheetHeader className="mb-8">
          <SheetTitle>Add Menu Item</SheetTitle>
        </SheetHeader>
        {/* Pass the existing dessert data as initialData to the form */}
        <MenuForm 
          onSuccess={() => setOpen(false)} categories={categories}        />
      </SheetContent>
    </Sheet>
  );
}