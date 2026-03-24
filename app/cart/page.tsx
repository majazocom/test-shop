import { supabase } from "@/lib/supabase";

export default async function CartPage() {
  const { data } = await supabase.from("cart_items").select(`
    id,
    quantity,
    product:products (
      name,
      price
    )
  `);

  return (
    <div>
      <h1>Varukorg</h1>

      <ul>
        {data?.map((item) => {
          const product = item.product?.[0];
          return (
            <li key={item.id}>
              {product?.name ?? "Okänd produkt"} – {item.quantity} st
            </li>
          );
        })}
      </ul>
    </div>
  );
}
