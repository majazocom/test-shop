import { supabase } from "@/lib/supabase";

export default async function CartPage() {
  const { data } = await supabase.from("cart_items").select(`
    id,
    quantity,
    product:products!inner (
      name,
      price
    )
  `);

  return (
    <div>
      <h1>Varukorg</h1>

      <ul>
        {data?.map((item) => {
          const product = Array.isArray(item.product) ? item.product[0] : item.product;
          
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
