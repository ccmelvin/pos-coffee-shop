# Security and Authentication Rules

## Authentication
- User sessions MUST be validated for protected routes
- Proper logout functionality MUST be implemented
- Authentication errors MUST be handled gracefully
- Secure password policies MUST be enforced for signup

## Data Protection
- Sensitive data MUST NOT be exposed in client-side code
- All user inputs MUST be validated on both client and server
- Proper content security policies SHOULD be used
- Rate limiting SHOULD be implemented for API endpoints

## API Security
- All API requests MUST be validated on the server
- Proper HTTP methods (GET, POST, PUT, DELETE) MUST be used
- Appropriate status codes MUST be returned
- Proper error handling MUST be implemented

## Session Management
- Secure, HTTP-only cookies MUST be used for session management
- Proper session timeout MUST be implemented
- Users SHOULD be allowed to manage their active sessions
- Proper CSRF protection MUST be implemented