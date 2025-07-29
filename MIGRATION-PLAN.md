# MCP Migration Plan

This document outlines the plan for migrating the coffee shop POS application to the MCP (Model-Controller-Presenter) pattern.

## Current Status

- ✅ Products feature migrated to MCP
- ✅ Orders feature migrated to MCP
- ⬜ Authentication feature still using original structure

## Migration Steps

### Phase 1: Products (Completed)

1. ✅ Create Model, Controller, and Presenter for Products
2. ✅ Update API routes to use the Controller
3. ✅ Create a service layer to maintain API compatibility
4. ✅ Update `lib/api.ts` to re-export from the service layer

### Phase 2: Orders (Completed)

1. ✅ Create `OrderModel`, `OrderController`, and `OrderPresenter`
2. ✅ Update order API routes to use the Controller
3. ✅ Create order service layer for API compatibility
4. ✅ Update `lib/api.ts` to re-export order functions

### Phase 3: Authentication (Next)

1. Create `AuthModel`, `AuthController`, and `AuthPresenter`
2. Update auth routes to use the Controller
3. Create auth service layer for API compatibility

## Benefits of This Approach

1. **Gradual Migration**: Features are migrated one at a time
2. **API Compatibility**: Existing components continue to work
3. **Clean Architecture**: Clear separation of concerns
4. **Improved Testability**: Each layer can be tested independently

## How to Use During Migration

### For Already Migrated Features (Products)

Use the new MCP structure:

```typescript
// Direct usage
import { ProductModel } from '@/src/models/ProductModel';
import { ProductPresenter } from '@/src/presenters/ProductPresenter';
import { useProducts } from '@/src/hooks/useProducts';

// Or through the compatibility layer
import { getProducts } from '@/lib/api';
```

### For Features Not Yet Migrated (Orders)

Continue using the original structure:

```typescript
import { getOrders, createOrder } from '@/lib/api';
```

## Next Steps

1. Complete the Orders migration
2. Update components to use the new hooks
3. Add unit tests for each layer