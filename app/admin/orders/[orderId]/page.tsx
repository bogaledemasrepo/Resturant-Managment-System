import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export default async function OrderDetailsPage({ params }: { params: { orderId: string } }) {
  const supabase = await createClient();

  // Fetch order with nested items and dessert names
  const { data: order, error } = await supabase
    .from("orders")
    .select(`
      *,
      order_items (
        id,
        quantity,
        price_at_time,
        desserts (name, image_url)
      )
    `)
    .eq("id", params.orderId)
    .single();
console.log(order);
  if (error || !order) notFound();

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Order Details</h1>
        <Badge className="text-lg px-4 py-1 capitalize">{order.status}</Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Customer & Shipping Info */}
        <Card className="md:col-span-1">
          <CardHeader><CardTitle className="text-sm font-medium">Customer</CardTitle></CardHeader>
          <CardContent className="space-y-1">
            <p className="font-semibold">{order.customer_name}</p>
            <p className="text-sm text-muted-foreground">{order.customer_email}</p>
            <Separator className="my-2" />
            <p className="text-xs uppercase text-muted-foreground font-bold">Shipping Address</p>
            <p className="text-sm">{order.shipping_address}</p>
          </CardContent>
        </Card>

        {/* Order Items List */}
        <Card className="md:col-span-2">
          <CardHeader><CardTitle>Items</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-4">
              {order.order_items.map((item: {
                id: string;
                quantity:number;
                price_at_time:number;
                desserts: { name: string; image_url: string };
              }) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-md overflow-hidden bg-slate-100">
                      <Image src={item.desserts.image_url} alt="" className="object-cover h-full w-full" />
                    </div>
                    <div>
                      <p className="font-medium">{item.desserts.name}</p>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-medium">${(item.price_at_time / 100).toFixed(2)}</p>
                </div>
              ))}
              <Separator />
              <div className="flex justify-between font-bold text-lg pt-2">
                <span>Total</span>
                <span>${(order.total_amount / 100).toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}