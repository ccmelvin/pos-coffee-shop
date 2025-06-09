# Security and Authentication Rules

## Authentication
- Always validate user sessions for protected routes
- Implement proper logout functionality
- Handle authentication errors gracefully
- Use secure password policies for signup

## Data Protection
- Never expose sensitive data in client-side code
- Validate all user inputs on both client and server
- Use proper content security policies
- Implement rate limiting for API endpoints

## API Security
- Validate all API requests on the server
- Use proper HTTP methods (GET, POST, PUT, DELETE)
- Return appropriate status codes
- Implement proper error handling

## Session Management
- Use secure, HTTP-only cookies for session management
- Implement proper session timeout
- Allow users to manage their active sessions
- Implement proper CSRF protection