# Forgot Password Page Container

This directory contains the container component and related components for the forgot password page.

## Directory Structure

```
forgot-password-page/
├── index.tsx           # Main container component
├── components/         # UI components
│   └── forgot-password-form.tsx
└── hooks/              # Custom hooks
    └── use-forgot-password-form.tsx
```

## Components

### ForgotPasswordPage (index.tsx)

The main container component for the forgot password page. It:

- Renders the page layout and title
- Imports and uses the ForgotPasswordForm component
- Provides instructions for password reset

### ForgotPasswordForm (components/forgot-password-form.tsx)

A form component specific to the forgot password page. It:

- Handles UI rendering and user interactions
- Uses the useForgotPasswordForm hook for form state and API integration
- Renders form fields, validation messages, and error alerts
- Shows success message after form submission

## Hooks

### useForgotPasswordForm (hooks/use-forgot-password-form.tsx)

A custom hook that:

- Manages form state using react-hook-form
- Handles form validation using zod schemas
- Integrates with the API using the useForgotPassword mutation hook
- Handles error states, loading states, and submission states

## Usage

```tsx
// In a Next.js page component
import { ForgotPasswordPage } from "@/containers/forgot-password-page";
// or
import { ForgotPasswordPage } from "@/containers"; // If exported from containers/index.ts

export default function ForgotPasswordPageRoute() {
  return <ForgotPasswordPage />;
}
```

## Implementation Pattern

This container follows a hooks-based pattern where:

1. **API Integration** is handled by hooks in the `@/features/auth/api` directory
2. **Form Logic** is encapsulated in custom hooks in the `hooks/` directory
3. **UI Rendering** is handled by components in the `components/` directory

This approach:

- Separates concerns between data fetching, form logic, and UI rendering
- Makes components more testable and maintainable
- Allows for reuse of form logic across different components
- Provides a clean interface between the UI and the API
