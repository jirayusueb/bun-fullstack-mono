# Sign Up Page Container

This directory contains the container component and related components for the sign-up page.

## Directory Structure

```
sign-up-page/
├── index.tsx           # Main container component
├── components/         # UI components
│   └── sign-up-form.tsx
└── hooks/              # Custom hooks
    └── use-sign-up-form.tsx
```

## Components

### SignUpPage (index.tsx)

The main container component for the sign-up page. It:

- Renders the page layout and title
- Imports and uses the SignUpForm component
- Handles redirects after successful sign-up
- Provides links to the sign-in page

### SignUpForm (components/sign-up-form.tsx)

A form component specific to the sign-up page. It:

- Handles UI rendering and user interactions
- Uses the useSignUpForm hook for form state and API integration
- Renders form fields, validation messages, and error alerts
- Includes terms and conditions checkbox

## Hooks

### useSignUpForm (hooks/use-sign-up-form.tsx)

A custom hook that:

- Manages form state using react-hook-form
- Handles form validation using zod schemas
- Integrates with the API using the useSignUp mutation hook
- Handles error states and loading states
- Calls the onSuccess callback after successful registration

## Usage

```tsx
// In a Next.js page component
import { SignUpPage } from "@/containers/sign-up-page";
// or
import { SignUpPage } from "@/containers"; // If exported from containers/index.ts

export default function SignUpPageRoute() {
  return <SignUpPage />;
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
