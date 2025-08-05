# Mobile and Responsive Design Rules

## Responsive Breakpoints
- Mobile-first design approach MUST be used
- Tailwind breakpoints MUST be used consistently (sm, md, lg, xl, 2xl)
- Touch targets MUST be at least 44px for mobile devices
- Content MUST be readable without horizontal scrolling on all devices

## Mobile-Specific Interactions
- Touch gestures SHOULD be implemented for common actions (swipe, pinch)
- Hover states MUST have touch equivalents for mobile devices
- Form inputs MUST use appropriate input types for mobile keyboards
- Loading states MUST be optimized for slower mobile connections

## Tablet Optimization
- Tablet layouts SHOULD utilize the larger screen real estate effectively
- Split-screen layouts MAY be used for tablet-specific workflows
- Touch-friendly navigation MUST be provided for tablet users
- Orientation changes MUST be handled gracefully

## Performance on Mobile
- Images MUST be optimized for different screen densities
- Critical CSS MUST be inlined to reduce render-blocking
- JavaScript bundles SHOULD be optimized for mobile networks
- Service workers MAY be implemented for offline functionality

## POS-Specific Mobile Considerations
- Order entry MUST be optimized for quick touch interactions
- Payment interfaces MUST work reliably on mobile devices
- Receipt generation MUST be mobile-friendly
- Inventory management SHOULD be accessible on mobile devices

## Testing Requirements
- All features MUST be tested on actual mobile devices
- Cross-browser testing MUST include mobile browsers
- Performance testing SHOULD include mobile network conditions
- Accessibility testing MUST include mobile screen readers
