# Container Patterns

This directory contains container components that follow different architectural patterns to separate concerns and improve maintainability.

## Overview

Containers are higher-level components that:

- Combine multiple presentation components
- Handle page-level concerns (routing, API integration, global state)
- Provide data and callbacks to presentation components
- Organize related functionality

## Hooks-Based Pattern

Used in: `sign-in-page`, `sign-up-page`, `forgot-password-page`

This pattern separates concerns into three main parts:

```
container-name/
├── index.tsx           # Main container component
├── components/         # UI components
│   └── component.tsx
└── hooks/              # Custom hooks
    └── use-feature.tsx
```

### Key Characteristics:

- **API Integration**: Handled by hooks in the `@/features/*/api` directories
- **Form Logic**: Encapsulated in custom hooks in the container's `hooks/` directory
- **UI Rendering**: Handled by components in the `components/` directory

### Benefits:

- Clear separation between data fetching, business logic, and UI
- Hooks are easily testable in isolation
- Logic can be reused across different components
- Clean interface between UI and API

## Best Practices

Follow these best practices when implementing containers:

1. **Keep UI components focused on presentation**

   - Avoid business logic in UI components
   - Pass data and callbacks as props

2. **Isolate API calls**

   - Keep API integration separate from UI components
   - Handle loading and error states consistently

3. **Use form libraries consistently**

   - Use react-hook-form for form state management
   - Use zod for form validation

4. **Document the interface between layers**

   - Clearly define props and return types
   - Document the purpose of each component and hook

5. **Write tests for each layer**
   - Test hooks and logic in isolation
   - Test UI components with mock data and callbacks
