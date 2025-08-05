# Code Style and Architecture Rules

## Project Structure
- Related components, hooks, and utilities MUST be kept in their respective directories
- Complex features SHOULD use feature-based organization
- Reusable UI components MUST be placed in the `components/ui` directory
- Page-specific components MUST be placed in their respective page directories

## TypeScript
- Proper interfaces for data structures MUST be defined
- TypeScript's strict mode MUST be used
- The `any` type SHOULD NOT be used unless absolutely necessary
- Types that are used across multiple files MUST be exported

## React Best Practices
- Functional components with hooks MUST be used
- Components MUST be focused on a single responsibility
- Reusable logic SHOULD be extracted into custom hooks
- Context MUST be used for state that needs to be accessed by many components
- Controlled components SHOULD be preferred over uncontrolled ones

## Naming Conventions
- React components and their files MUST use PascalCase
- Variables, functions, and non-component files MUST use camelCase
- CSS class names MUST use kebab-case
- Names MUST be descriptive and reflect the purpose

## Imports
- Imports MUST be grouped in the following order:
  1. React and Next.js imports
  2. Third-party libraries
  3. Project components and utilities
  4. Styles
- Absolute imports with `@/` prefix MUST be used for project files