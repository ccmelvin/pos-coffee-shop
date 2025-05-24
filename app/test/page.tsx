import { createServerSupabaseClient } from '@/lib/supabase-server'

export default async function TestPage() {
  const supabase = createServerSupabaseClient()
  
  // Test database connection by fetching products
  const { data: products, error } = await supabase.from('products').select('*').limit(5)
  
  // Test auth session
  const { data: { session } } = await supabase.auth.getSession()
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Supabase Connection Test</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Database Connection:</h2>
        {error ? (
          <div className="p-4 bg-red-100 text-red-700 rounded-md">
            <p className="font-medium">Error connecting to database:</p>
            <pre className="mt-2 text-sm">{JSON.stringify(error, null, 2)}</pre>
          </div>
        ) : (
          <div className="p-4 bg-green-100 text-green-700 rounded-md">
            <p className="font-medium">Successfully connected to database!</p>
            {products && products.length > 0 ? (
              <div className="mt-4">
                <p>Found {products.length} products:</p>
                <ul className="mt-2 list-disc pl-5">
                  {products.map(product => (
                    <li key={product.id}>{product.name} - ${product.price}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="mt-2">No products found. You may need to add some sample data.</p>
            )}
          </div>
        )}
      </div>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Authentication Status:</h2>
        {session ? (
          <div className="p-4 bg-green-100 text-green-700 rounded-md">
            <p className="font-medium">User is authenticated!</p>
            <div className="mt-2">
              <p>User ID: {session.user.id}</p>
              <p>Email: {session.user.email}</p>
            </div>
          </div>
        ) : (
          <div className="p-4 bg-yellow-100 text-yellow-700 rounded-md">
            <p className="font-medium">No active session.</p>
            <p className="mt-2">User is not logged in. This is expected if you haven't signed in yet.</p>
          </div>
        )}
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-2">Environment Variables:</h2>
        <div className="p-4 bg-blue-100 text-blue-700 rounded-md">
          <p className="font-medium">Checking environment variables:</p>
          <ul className="mt-2 list-disc pl-5">
            <li>
              NEXT_PUBLIC_SUPABASE_URL: {
                process.env.NEXT_PUBLIC_SUPABASE_URL 
                  ? "✅ Set" 
                  : "❌ Not set"
              }
            </li>
            <li>
              NEXT_PUBLIC_SUPABASE_ANON_KEY: {
                process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY 
                  ? "✅ Set" 
                  : "❌ Not set"
              }
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
