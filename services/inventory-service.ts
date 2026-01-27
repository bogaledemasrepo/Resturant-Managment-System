export const getDesserts = async () => {
  // Simulated fetch - replace with actual data fetching logic
  return [
    {
      id: "1",
      name: "Chocolate Cake",
      description: "Rich chocolate cake with ganache frosting",
      price_cents: 2500,
      stock_quantity: 15,       
        image_url: "https://plus.unsplash.com/premium_photo-1713447395823-2e0b40b75a89",
        category: "Cakes",
        created_at: "2024-01-01T12:00:00Z",
    },
    {
      id: "2",
        name: "Vanilla Ice Cream",
        description: "Creamy vanilla ice cream made with real vanilla beans",
        price_cents: 1200,
        stock_quantity: 8,
        image_url: "https://images.unsplash.com/photo-1558326567-98ae2405596b",
        category: "Ice Creams",
        created_at: "2024-02-15T12:00:00Z",
    },
    // More dessert items...
  ];
}