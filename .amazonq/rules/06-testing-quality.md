# Testing and Quality Assurance Rules

## Test Coverage Requirements
- All business logic functions MUST have unit tests
- Components with user interactions MUST have integration tests
- Critical user flows (login, checkout, payment) MUST have end-to-end tests
- Test coverage SHOULD be maintained above 80%

## Test Structure
- Test files MUST be co-located with components or in `__tests__` directories
- Test names MUST clearly describe the behavior being tested
- Tests MUST follow the Arrange-Act-Assert pattern
- Mock data SHOULD be realistic and represent actual POS scenarios

## Testing Patterns
- React Testing Library MUST be used for component testing
- User-centric queries (getByRole, getByLabelText) MUST be preferred
- Tests MUST NOT rely on implementation details
- Async operations MUST be properly awaited in tests

## POS-Specific Testing
- Order calculations MUST be tested with various scenarios
- Payment processing flows MUST have comprehensive error handling tests
- Real-time features SHOULD be tested with mock WebSocket connections
- Database operations MUST be tested with proper cleanup

## Quality Gates
- All tests MUST pass before code can be merged
- No console.error or console.warn SHOULD appear in test output
- Tests MUST run in isolation without dependencies on external services
- Performance-critical functions SHOULD have benchmark tests
