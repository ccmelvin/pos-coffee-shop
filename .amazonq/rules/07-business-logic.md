# Business Logic and Domain Rules

## Order Management
- Order states MUST follow the defined lifecycle: pending → processing → completed → cancelled
- Order totals MUST be calculated server-side to prevent tampering
- Inventory checks MUST be performed before order confirmation
- Order modifications MUST be logged with timestamps and user information

## Pricing and Calculations
- All monetary calculations MUST use decimal precision (not floating point)
- Tax calculations MUST be rounded according to local regulations
- Discounts MUST be validated against business rules before application
- Price changes MUST NOT affect existing pending orders

## Inventory Management
- Stock levels MUST be decremented atomically with order creation
- Out-of-stock items MUST be handled gracefully in the UI
- Inventory updates SHOULD trigger real-time notifications
- Stock reservations MUST have expiration timeouts

## Payment Processing
- Payment amounts MUST match order totals exactly
- Failed payments MUST restore inventory levels
- Payment methods MUST be validated before processing
- Refunds MUST follow the original payment method when possible

## Data Consistency
- All financial transactions MUST be logged for audit purposes
- Database operations MUST use transactions for multi-table updates
- Real-time updates MUST maintain data consistency across clients
- Business rule violations MUST be handled with clear error messages
