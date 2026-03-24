'use server';

import { supabase } from '@/lib/supabase';

export async function addToCart(formData: FormData) {
  const product_id = formData.get('product_id') as string;
  const user_id = 'demo-user'; // byt mot auth senare

  // 1. Kolla om produkten redan finns
  const { data: existingItem } = await supabase
    .from('cart_items')
    .select('*')
    .eq('user_id', user_id)
    .eq('product_id', product_id)
    .single();

  if (existingItem) {
    // 2. Uppdatera quantity
    await supabase
      .from('cart_items')
      .update({
        quantity: existingItem.quantity + 1,
      })
      .eq('id', existingItem.id);
  } else {
    // 3. Skapa ny rad
    await supabase
      .from('cart_items')
      .insert({
        user_id,
        product_id,
        quantity: 1,
      });
  }
}