import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase-server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const query = searchParams.get('query');
  
  try {
    console.log('API: Fetching products with category:', category);
    
    const supabase = await createServerSupabaseClient();
    console.log('API: Supabase client created');
    
    let queryBuilder = supabase.from('products').select('*');
    
    if (category) {
      queryBuilder = queryBuilder.eq('category', category);
    }
    
    if (query) {
      queryBuilder = queryBuilder.ilike('name', `%${query}%`);
    }
    
    console.log('API: Executing query');
    const { data, error } = await queryBuilder.order('name');
    
    if (error) {
      console.error('API Error fetching products:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }
    
    console.log(`API: Found ${data?.length || 0} products`);
    return NextResponse.json(data || []);
  } catch (error) {
    console.error('API Unexpected error:', error);
    if (error instanceof Error) {
      return NextResponse.json(
        { error: `Failed to fetch products: ${error.message}` },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const supabase = await createServerSupabaseClient();
    const productData = await request.json();
    
    // Add timestamps
    const now = new Date().toISOString();
    const dataWithTimestamps = {
      ...productData,
      created_at: now,
      updated_at: now
    };
    
    const { data, error } = await supabase
      .from('products')
      .insert(dataWithTimestamps)
      .select()
      .single();
    
    if (error) {
      console.error('Error creating product:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }
    
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error('Error in products API:', error);
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
