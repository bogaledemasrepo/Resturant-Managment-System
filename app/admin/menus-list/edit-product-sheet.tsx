"use client";

import { useState } from "react";
import { Edit3 } from "lucide-react";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet";// Ensure ProductForm accepts 'initialData' prop
import { MenuForm } from "./product-form";

interface MenuItem {
    id: string;
    name: string;
    description: string;
    image_url: string;
    price: number;
}

export function EditProductSheet({data,categories}: {data:MenuItem,categories:{id:string,name:string,description:string}[]}) {
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
          <SheetTitle>Edit {data.name}</SheetTitle>
        </SheetHeader>
        {/* Pass the existing dessert data as initialData to the form */}
        <MenuForm 
          categories={categories}
          initialData={data} 
          onSuccess={() => setOpen(false)} 
        />
      </SheetContent>
    </Sheet>
  );
}