import { SalesChart } from "@/components/sales-chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getMonthlySales } from "@/services/analytics-services";
import { DollarSign } from "lucide-react";
export default async function AdminDashboard() {
  const chartData = await getMonthlySales();
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Dashboard Overview</h2>
      
      <SalesChart data={chartData} />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,231.89</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        
        {/* Repeat for Orders, Products, and Active Users */}
      </div>
      
      {/* Chart Section */}
      <div className="mt-8">
         <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Sales Analytics</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
               {/* Add Recharts component here */}
            </CardContent>
         </Card>
      </div>
    </div>
  );
}