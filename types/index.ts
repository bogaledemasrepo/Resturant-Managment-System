// src/types/index.ts

export type OrderStatus = "pending" | "processing" | "completed" | "cancelled";

export interface Dessert {
  id: string;
  name: string;
  description: string;
  price_cents: number;
  stock_quantity: number;
  image_url: string;
  category: string;
  created_at: string;
}

export interface Order {
    id: string;
    created_at: string;
    user_id: string;
    total_amount_cents: number;
    status: string;
    customer_email: string;
    shipping_address: null;
    n8n_processed: boolean;
}


export interface OrderItem {
  id: string;
  dessert_id: string;
  quantity: number;
  unit_price: number;
}