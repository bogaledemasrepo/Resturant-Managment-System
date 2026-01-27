"use client";

import { useState } from "react";
import { toast } from "sonner";
import { updateOrderStatus } from "./actions";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Loader2, ChevronDown } from "lucide-react";

const statusOptions = ["pending", "processing", "delivered", "cancelled"];

export function StatusCell({ orderId, initialStatus }: { orderId: string, initialStatus: string }) {
  const [status, setStatus] = useState(initialStatus);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = async (newStatus: string) => {
    if (newStatus === status) return;
    
    setIsUpdating(true);
    const result = await updateOrderStatus(orderId, newStatus);
    
    if (result.success) {
      setStatus(newStatus);
      toast.success(`Order status updated to ${newStatus}`);
    } else {
      toast.error("Failed to update status");
    }
    setIsUpdating(false);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none group">
        <Badge 
          variant={status === "delivered" ? "success" : status === "pending" ? "warning" : "default"}
          className="capitalize cursor-pointer flex items-center gap-1 group-hover:ring-2 ring-slate-200 transition-all"
        >
          {isUpdating ? <Loader2 className="h-3 w-3 animate-spin" /> : status}
          <ChevronDown size={12} className="opacity-50" />
        </Badge>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {statusOptions.map((opt) => (
          <DropdownMenuItem 
            key={opt} 
            className="capitalize"
            onClick={() => handleUpdate(opt)}
          >
            {opt}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}