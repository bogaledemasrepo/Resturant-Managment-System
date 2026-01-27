"use client";

import { motion } from "framer-motion";
import { ChevronLeft, LayoutDashboard, Cookie, ShoppingCart,DollarSign, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

// 1. Define the interface for Type Safety
interface AdminSidebarProps {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
}

// 2. Define Animation Variants for Framer Motion
const sidebarVariants = {
  open: { width: "256px" }, // w-64
  closed: { width: "80px" },  // w-20
};

export function AdminSidebar({ isOpen, setOpen }: AdminSidebarProps) {
  return (
    <motion.div
      initial={false}
      animate={isOpen ? "open" : "closed"}
      variants={sidebarVariants}
      className="fixed left-0 top-0 h-screen bg-slate-900 text-slate-300 z-50 flex flex-col border-r border-slate-800"
    >
      {/* Header / Logo */}
      <div className="flex items-center justify-between p-6">
        {isOpen && (
          <motion.span 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="font-bold text-white text-xl"
          >
            SweetAdmin
          </motion.span>
        )}
        <button 
          onClick={() => setOpen(!isOpen)}
          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors"
        >
          <ChevronLeft className={cn("transition-transform duration-300", !isOpen && "rotate-180")} size={18} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2">
        <SidebarItem icon={LayoutDashboard} label="Dashboard" href="/admin/" isOpen={isOpen} />
        <SidebarItem icon={Cookie} label="Menus Category" href="/admin/menus-category" isOpen={isOpen} />
        <SidebarItem icon={Cookie} label="Menu Items" href="/admin/menus-list" isOpen={isOpen} />
        <SidebarItem icon={ShoppingCart} label="Orders" href="/admin/orders" isOpen={isOpen} />
        <SidebarItem icon={DollarSign} label="Transactions" href="/admin/transactions" isOpen={isOpen} />
        <SidebarItem icon={Settings} label="Settings" href="/admin/settings" isOpen={isOpen} />
      </nav>
    </motion.div>
  );
}

// Sub-component for clean code
function SidebarItem({ icon: Icon, label, href, isOpen }: {
    icon: React.ComponentType<{ size?: number; className?: string }>;
    label: string;
    href: string;
    isOpen: boolean;
}) {
  return (
    <Link href={href} className="flex items-center gap-4 p-3 hover:bg-slate-800 rounded-xl transition-all group">
      <Icon size={22} className="min-w-5.5" />
      {isOpen && (
        <motion.span 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="whitespace-nowrap overflow-hidden"
        >
          {label}
        </motion.span>
      )}
    </Link>
  );
}