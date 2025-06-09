# Next.js Coffee Shop POS: Modern Point of Sale System with Real-Time Order Management

A modern, responsive Point of Sale (POS) system built with Next.js and Supabase, designed specifically for coffee shops. This application provides real-time order management, secure authentication, and a responsive UI that works seamlessly across desktop and mobile devices.

The system offers comprehensive features for managing a coffee shop's daily operations, including:
- Real-time order tracking and management with Supabase integration
- Secure user authentication and role-based access control
- Responsive UI components built with Radix UI and Tailwind CSS
- Client and server-side data validation
- Mobile-first design approach with adaptive layouts
- Comprehensive product catalog management with search and filtering
- Order history and analytics with Recharts integration

## Repository Structure
```
├── app/                      # Next.js app directory with route handlers and pages
│   ├── api/                 # API routes for products, debugging, and authentication
│   ├── auth/                # Authentication-related pages and routes
│   └── profile/            # User profile management pages
├── components/              # Reusable React components
│   ├── auth/               # Authentication-related components
│   ├── order/             # Order management components
│   └── ui/                # Shared UI components built with Radix UI
├── contexts/               # React context providers for auth and orders
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions and API clients
└── styles/                 # Global styles and Tailwind CSS configuration
```

## Usage Instructions
### Prerequisites
- Node.js 16.x or higher
- pnpm package manager
- Supabase account and project
- Environment variables configured in `.env.local`:
  ```
  NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
  NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
  ```

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd coffee-shop-pos

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# Start development server
pnpm dev
```

### Quick Start
1. Sign in or create an account:
```typescript
// Using the auth form
import { LoginForm } from '@/components/auth/login-form';

// Example usage
<LoginForm onSuccess={() => router.push('/dashboard')} />
```

2. Managing orders:
```typescript
// Using the order context
import { useOrder } from '@/contexts/order-context';

const { addToCart, updateQuantity, clearCart } = useOrder();

// Add item to cart
addToCart({
  id: 'product-id',
  name: 'Cappuccino',
  price: 4.99,
  quantity: 1
});
```

### More Detailed Examples
1. Product filtering and search:
```typescript
// In page.tsx
const { data: products } = await supabase
  .from('products')
  .select('*')
  .eq('category', category)
  .ilike('name', `%${searchQuery}%`);
```

2. Processing orders:
```typescript
// In order-actions.tsx
const handlePayment = async () => {
  try {
    await saveOrder({
      items: cart,
      subtotal,
      tax,
      total,
      customerId: user.id
    });
    clearCart();
    toast.success('Order completed successfully');
  } catch (error) {
    toast.error('Failed to process order');
  }
};
```

### Troubleshooting
Common issues and solutions:

1. Authentication Issues
```bash
# Clear Supabase session
supabase.auth.signOut()
# Check authentication status
const { data: { session } } = await supabase.auth.getSession()
```

2. Database Connection Issues
```bash
# Test database connection
curl https://<your-project>.supabase.co/rest/v1/health
# Check environment variables
echo $NEXT_PUBLIC_SUPABASE_URL
```

## Data Flow
The application follows a client-server architecture where the Next.js frontend communicates with Supabase backend for data storage and real-time updates.

```ascii
[Client] -> [Next.js API Routes] -> [Supabase]
    ^                                   |
    |                                   v
[React Components] <- [Real-time Updates]
```

Key interactions:
1. Authentication flow through Supabase Auth
2. Real-time order updates using Supabase subscriptions
3. Product catalog management through REST API
4. Order processing with transaction support
5. User session management with secure cookies
6. Client-side state management with React Context
7. Server-side rendering for initial data load