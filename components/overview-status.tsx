import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Package, ShoppingCart, DollarSign } from "lucide-react";

const stats = [
  { label: "Total Revenue", value: "$45,231", icon: DollarSign, trend: "+12%" },
  { label: "Active Orders", value: "154", icon: ShoppingCart, trend: "+5%" },
  { label: "Total Inventory", value: "2,340", icon: Package, trend: "Stable" },
  { label: "Growth Rate", value: "18.5%", icon: TrendingUp, trend: "+2%" },
];

export function OverviewStats() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label} className="border-none shadow-sm shadow-slate-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">{stat.label}</CardTitle>
            <stat.icon className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs font-semibold text-emerald-600 mt-1">{stat.trend}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}