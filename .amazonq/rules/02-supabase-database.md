# Supabase and Database Rules

## Database Access
- Always use typed queries with the database types
- Use server components for initial data fetching when possible
- Use client-side fetching only for dynamic updates
- Handle loading and error states for all data fetching operations

## Authentication
- Use Supabase Auth for all authentication needs
- Always check user authentication status before accessing protected resources
- Implement proper role-based access control in database rules
- Never expose sensitive user information in client-side code

## Data Modeling
- Follow the established schema in `database.types.ts`
- Keep database types up-to-date with actual database schema
- Use UUIDs for primary keys
- Include created_at and updated_at timestamps for all tables

## Error Handling
- Always handle potential errors in database operations
- Provide meaningful error messages to users
- Log detailed errors for debugging purposes
- Implement retry mechanisms for transient failures

## Environment Variables
- Never hardcode Supabase credentials
- Use environment variables for all configuration
- Include proper validation for required environment variables
- Keep sensitive environment variables in .env.local (not committed to git)