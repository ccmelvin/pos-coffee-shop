import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase-server';

export async function GET() {
  try {
    // Check environment variables
    const envVars = {
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || 'Not set',
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set (hidden)' : 'Not set',
    };
    
    // Test Supabase connection
    const supabase = createServerSupabaseClient();
    const { data: tablesData, error: tablesError } = await supabase
      .from('pg_catalog.pg_tables')
      .select('tablename')
      .eq('schemaname', 'public');
    
    // Test products table
    const { data: productsData, error: productsError } = await supabase
      .from('products')
      .select('*')
      .limit(1);
    
    return NextResponse.json({
      status: 'Running diagnostics',
      environment: envVars,
      supabaseConnection: tablesError ? 'Failed' : 'Success',
      tables: tablesError ? tablesError.message : tablesData,
      productsTable: {
        exists: !productsError,
        error: productsError ? productsError.message : null,
        sample: productsData
      }
    });
  } catch (error) {
    console.error('Debug API error:', error);
    return NextResponse.json(
      { 
        status: 'Error',
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : null
      },
      { status: 500 }
    );
  }
}
