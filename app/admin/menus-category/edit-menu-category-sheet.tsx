"use client";

import { useState } from "react";
import { Edit3 } from "lucide-react";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet";// Ensure CategoryForm accepts 'initialData' prop
import { CategoryForm } from "./menu-category-form";

export function EditCategorySheet({id,name,description}:{
    id: string;
    name: string;
    description: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="p-2 hover:bg-slate-100 text-slate-600 rounded-lg transition-colors">
          <Edit3 size={18} />
        </button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-135 overflow-y-auto">
        <SheetHeader className="mb-8">
          <SheetTitle>Edit {name}</SheetTitle>
        </SheetHeader>
        {/* Pass the existing dessert data as initialData to the form */}
        <CategoryForm 
          initialData={{id,name,description}} 
          onSuccess={() => setOpen(false)} 
        />
      </SheetContent>
    </Sheet>
  );
}