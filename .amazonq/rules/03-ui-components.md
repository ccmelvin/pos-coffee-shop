# UI Component Rules

## Component Design
- Follow the established design system
- Use the UI components from the components/ui directory
- Maintain consistent spacing, typography, and color usage
- Ensure all components are responsive

## Accessibility
- Ensure all interactive elements are keyboard accessible
- Use semantic HTML elements
- Include proper ARIA attributes when needed
- Maintain sufficient color contrast
- Test with screen readers

## State Management
- Use local state for component-specific state
- Use context for shared state across components
- Keep state as close as possible to where it's used
- Avoid prop drilling by using context or composition

## Performance
- Memoize expensive calculations with useMemo
- Optimize re-renders with React.memo and useCallback
- Lazy load components that aren't needed immediately
- Use proper keys for lists to optimize rendering

## Responsive Design
- Design mobile-first
- Use relative units (rem, em) instead of pixels when appropriate
- Test on multiple screen sizes
- Use media queries or responsive utilities from Tailwind