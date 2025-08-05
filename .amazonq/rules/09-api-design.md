# API Design and Standards Rules

## RESTful Design
- API endpoints MUST follow RESTful conventions
- HTTP methods MUST be used correctly (GET, POST, PUT, DELETE, PATCH)
- Resource naming MUST use plural nouns (e.g., `/api/orders`, `/api/products`)
- Nested resources SHOULD be used appropriately (e.g., `/api/orders/{id}/items`)

## Request/Response Format
- All API responses MUST use consistent JSON structure
- Error responses MUST include error codes and descriptive messages
- Request validation MUST be performed on all input parameters
- Response pagination MUST be implemented for list endpoints

## Status Codes
- HTTP status codes MUST be used correctly and consistently
- 2xx codes MUST be used for successful operations
- 4xx codes MUST be used for client errors with clear messages
- 5xx codes MUST be used for server errors with appropriate logging

## Authentication and Authorization
- All protected endpoints MUST validate authentication tokens
- Role-based access control MUST be implemented where appropriate
- API keys SHOULD be used for service-to-service communication
- Rate limiting MUST be implemented to prevent abuse

## Data Validation
- Input validation MUST be performed on all API endpoints
- Schema validation SHOULD be used for complex request bodies
- Sanitization MUST be applied to prevent injection attacks
- Business rule validation MUST be enforced at the API level

## Error Handling
- All errors MUST be logged with appropriate detail levels
- Error responses MUST NOT expose sensitive system information
- Retry mechanisms SHOULD be documented for transient failures
- Circuit breakers SHOULD be implemented for external service calls

## Documentation
- All API endpoints MUST be documented with examples
- Request/response schemas MUST be clearly defined
- Authentication requirements MUST be documented
- Rate limits and usage guidelines SHOULD be provided
