# UI Component Rules

## Component Design
- The established design system MUST be followed
- UI components from the components/ui directory MUST be used
- Consistent spacing, typography, and color usage MUST be maintained
- All components MUST be responsive

## Accessibility
- All interactive elements MUST be keyboard accessible
- Semantic HTML elements MUST be used
- Proper ARIA attributes MUST be included when needed
- Sufficient color contrast MUST be maintained
- Components SHOULD be tested with screen readers

## State Management
- Local state SHOULD be used for component-specific state
- Context SHOULD be used for shared state across components
- State SHOULD be kept as close as possible to where it's used
- Prop drilling SHOULD be avoided by using context or composition

## Performance
- Expensive calculations SHOULD be memoized with useMemo
- Re-renders SHOULD be optimized with React.memo and useCallback
- Components that aren't needed immediately SHOULD be lazy loaded
- Proper keys for lists MUST be used to optimize rendering

## Responsive Design
- Mobile-first design MUST be implemented
- Relative units (rem, em) SHOULD be used instead of pixels when appropriate
- Multiple screen sizes MUST be tested
- Media queries or responsive utilities from Tailwind SHOULD be used