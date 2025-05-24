import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase-server';

export async function GET() {
  try {
    console.log('Debug API: Starting database check');
    
    // Check environment variables
    const envVars = {
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || 'Not set',
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set (hidden)' : 'Not set',
    };
    console.log('Debug API: Environment variables:', envVars);
    
    // Test Supabase connection
    console.log('Debug API: Creating Supabase client');
    const supabase = await createServerSupabaseClient();
    console.log('Debug API: Supabase client created');
    
    // Check if tables exist
    console.log('Debug API: Checking tables');
    const { data: tablesData, error: tablesError } = await supabase
      .from('pg_catalog.pg_tables')
      .select('tablename')
      .eq('schemaname', 'public');
    
    if (tablesError) {
      console.error('Debug API: Error checking tables:', tablesError);
    } else {
      console.log('Debug API: Tables found:', tablesData);
    }
    
    // Test products table specifically
    console.log('Debug API: Checking products table');
    const { data: productsData, error: productsError } = await supabase
      .from('products')
      .select('*')
      .limit(5);
    
    if (productsError) {
      console.error('Debug API: Error checking products table:', productsError);
    } else {
      console.log(`Debug API: Found ${productsData?.length || 0} products`);
    }
    
    // Check RLS policies
    console.log('Debug API: Checking RLS policies');
    const { data: policiesData, error: policiesError } = await supabase
      .from('pg_catalog.pg_policies')
      .select('*');
    
    if (policiesError) {
      console.error('Debug API: Error checking policies:', policiesError);
    } else {
      console.log('Debug API: Policies found:', policiesData);
    }
    
    return NextResponse.json({
      status: 'Running diagnostics',
      environment: envVars,
      supabaseConnection: tablesError ? 'Failed' : 'Success',
      tables: tablesError ? tablesError.message : tablesData,
      productsTable: {
        exists: !productsError,
        error: productsError ? productsError.message : null,
        sample: productsData || []
      },
      policies: policiesError ? policiesError.message : policiesData
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
