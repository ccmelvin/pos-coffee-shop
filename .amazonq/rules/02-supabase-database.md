# Supabase and Database Rules

## Database Access
- Typed queries with the database types MUST be used
- Server components SHOULD be used for initial data fetching when possible
- Client-side fetching SHOULD only be used for dynamic updates
- Loading and error states MUST be handled for all data fetching operations

## Authentication
- Supabase Auth MUST be used for all authentication needs
- User authentication status MUST be checked before accessing protected resources
- Proper role-based access control MUST be implemented in database rules
- Sensitive user information MUST NOT be exposed in client-side code

## Data Modeling
- The established schema in `database.types.ts` MUST be followed
- Database types MUST be kept up-to-date with actual database schema
- UUIDs MUST be used for primary keys
- created_at and updated_at timestamps SHOULD be included for all tables

## Error Handling
- Potential errors in database operations MUST be handled
- Meaningful error messages MUST be provided to users
- Detailed errors SHOULD be logged for debugging purposes
- Retry mechanisms SHOULD be implemented for transient failures

## Environment Variables
- Supabase credentials MUST NOT be hardcoded
- Environment variables MUST be used for all configuration
- Proper validation for required environment variables MUST be included
- Sensitive environment variables MUST be kept in .env.local (not committed to git)