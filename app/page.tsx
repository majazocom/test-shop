import { supabase } from '@/lib/supabase';
import { addToCart } from './actions/cart';
import Link from 'next/link';

export default async function Home() {
  const { data: products } = await supabase
    .from('products')
    .select('*');

  return (
    <main>
      <h1>Produkter</h1>

      <ul>
        {products?.map((product) => (
          <li key={product.id}>
            <h2>{product.name}</h2>
            <p>{product.price} kr</p>

            <form action={addToCart}>
              <input
                type="hidden"
                name="product_id"
                value={product.id}
              />
              <button type="submit">
                Lägg i varukorg
              </button>
            </form>
          </li>
        ))}
      </ul>

      <Link href="/cart">Varukorgen</Link>
    </main>
  );
}