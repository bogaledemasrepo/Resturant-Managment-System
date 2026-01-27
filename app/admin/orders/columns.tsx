"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { Order } from "@/types"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import Link from "next/link"

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header: "Order ID",
    cell: ({ row }) => {
      const id = row.getValue("id") as string
      return (
        <Link 
          href={`/admin/orders/${id}`} 
          className="font-mono text-xs hover:underline text-primary font-bold"
        >
          #{id.slice(0, 8)}
        </Link>
      )
    },
  },
  {
    accessorKey: "customer_email",
    header: "Customer Email",
  },
  {
    accessorKey: "total_amount_cents",
    header: "Amount",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("total_amount_cents")) / 100
      return (
        <div className="font-medium">
          {new Intl.NumberFormat("en-US", { 
            style: "currency", 
            currency: "USD" 
          }).format(amount)}
        </div>
      )
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge 
          // Note: ensure your Badge component has these variants defined
          variant={
            status === "delivered" ? "success" : 
            status === "pending" ? "warning" : 
            status === "cancelled" ? "destructive" : "default"
          }
          className="capitalize"
        >
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: "created_at",
    header: "Order Date",
    cell: ({ row }) => format(new Date(row.getValue("created_at")), "MMM dd, hh:mm a"),
  },
  {
    id: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => {
      const order = row.original

      return (
        <div className="text-right">
          <Button asChild variant="ghost" size="sm">
            <Link href={`/admin/orders/${order.id}`}>
              <Eye className="w-4 h-4 mr-2" />
              View Details
            </Link>
          </Button>
        </div>
      )
    },
  },
]