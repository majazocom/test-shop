import { supabase } from "@/lib/supabase";

type CartItem = {
  id: string;
  quantity: number;
  product: {
    name: string;
    price: number;
  } | null;
};

export default async function CartPage() {
  const { data } = await supabase.from("cart_items").select(`
    id,
    quantity,
    product:products (
      name,
      price
    )
  `);

  const typedData = data as unknown as (CartItem & {
    product: CartItem["product"][];
  })[];

  return (
    <div>
      <h1>Varukorg</h1>

      <ul>
        {typedData?.map((item) => (
          <li key={item.id}>
            {item.product?.[0]?.name} – {item.quantity} st
          </li>
        ))}
      </ul>
    </div>
  );
}
