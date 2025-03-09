# Sign In Page Container

This directory contains the container component and related components for the sign-in page.

## Directory Structure

```
sign-in-page/
├── index.tsx           # Main container component
├── components/         # UI components
│   └── sign-in-form.tsx
└── hooks/              # Custom hooks
    └── use-sign-in-form.tsx
```

## Components

### SignInPage (index.tsx)

The main container component for the sign-in page. It:

- Renders the page layout and title
- Imports and uses the SignInForm component
- Provides links to sign up and forgot password pages

### SignInForm (components/sign-in-form.tsx)

A form component specific to the sign-in page. It:

- Handles UI rendering and user interactions
- Uses the useSignInForm hook for form state and API integration
- Renders form fields, validation messages, and error alerts

## Hooks

### useSignInForm (hooks/use-sign-in-form.tsx)

A custom hook that:

- Manages form state using react-hook-form
- Handles form validation using zod schemas
- Integrates with the API using the useSignIn mutation hook
- Handles error states and loading states

## Usage

```tsx
// In a Next.js page component
import { SignInPage } from "@/containers/sign-in-page";
// or
import { SignInPage } from "@/containers"; // If exported from containers/index.ts

export default function SignInPageRoute() {
  return <SignInPage />;
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
