# Next.js and ESLint Rules

## Next.js Best Practices
- Server components MUST be used by default, client components only when needed
- The App Router directory structure conventions MUST be followed
- Proper metadata for SEO optimization MUST be used
- Proper error handling with error.tsx files MUST be implemented
- loading.tsx files MUST be used for loading states

## ESLint Configuration
- The Next.js recommended ESLint rules MUST be followed
- Unused variables or imports MUST NOT be present
- Console statements MUST NOT be present in production code
- Proper React hooks dependencies MUST be enforced
- Proper accessibility rules (jsx-a11y) MUST be used
- Consistent component structure MUST be maintained

## Performance
- Proper image optimization with next/image MUST be used
- Proper code splitting MUST be implemented
- Dynamic imports SHOULD be used for large components
- Fonts SHOULD be optimized with next/font
- Proper caching strategies MUST be implemented

## Routing
- Proper route grouping for organization SHOULD be used
- Proper route handlers for API endpoints MUST be implemented
- Proper route parameters and query parameters MUST be used
- Proper middleware for protected routes MUST be implemented