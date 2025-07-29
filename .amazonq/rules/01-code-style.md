# Code Style and Architecture Rules

## Project Structure
- Keep related components, hooks, and utilities in their respective directories
- Use feature-based organization for complex features
- Place reusable UI components in the `components/ui` directory
- Place page-specific components in their respective page directories

## TypeScript
- Always define proper interfaces for data structures
- Use TypeScript's strict mode
- Avoid using `any` type when possible
- Export types that are used across multiple files

## React Best Practices
- Use functional components with hooks
- Keep components focused on a single responsibility
- Extract reusable logic into custom hooks
- Use context for state that needs to be accessed by many components
- Prefer controlled components over uncontrolled ones

## Naming Conventions
- Use PascalCase for React components and their files
- Use camelCase for variables, functions, and non-component files
- Use kebab-case for CSS class names
- Use descriptive names that reflect the purpose

## Imports
- Group imports in the following order:
  1. React and Next.js imports
  2. Third-party libraries
  3. Project components and utilities
  4. Styles
- Use absolute imports with `@/` prefix for project files