# Performance Optimization Rules

## React Performance
- Components MUST be memoized with React.memo when appropriate
- Expensive calculations MUST be wrapped in useMemo
- Event handlers MUST be memoized with useCallback to prevent re-renders
- Large lists SHOULD use virtualization for 100+ items

## Database Performance
- Database queries MUST use proper indexing strategies
- N+1 query problems MUST be avoided with proper joins or batching
- Real-time subscriptions SHOULD be limited to necessary data only
- Database connections MUST be properly pooled and managed

## Bundle Optimization
- Code splitting MUST be implemented for route-based chunks
- Heavy dependencies SHOULD be dynamically imported when possible
- Unused code MUST be eliminated through tree-shaking
- Bundle size SHOULD be monitored and kept under reasonable limits

## Caching Strategies
- Static assets MUST have appropriate cache headers
- API responses SHOULD be cached when data doesn't change frequently
- Client-side caching MUST be implemented for frequently accessed data
- Cache invalidation strategies MUST be clearly defined

## Real-time Performance
- WebSocket connections SHOULD be throttled to prevent overwhelming clients
- Real-time updates MUST be batched when multiple changes occur rapidly
- Connection recovery MUST be handled gracefully with exponential backoff
- Memory leaks MUST be prevented in long-running real-time connections

## Monitoring and Metrics
- Core Web Vitals MUST be monitored and optimized
- Database query performance SHOULD be logged and analyzed
- Client-side performance metrics SHOULD be collected
- Performance regressions MUST be caught in CI/CD pipeline
