# Forgot Password Page Container

This directory contains the container component and related components for the forgot password page.

## Directory Structure

```
forgot-password-page/
├── index.tsx                  # Main container component
└── components/                # Container-specific components
    └── forgot-password-form.tsx
```

## Components

### ForgotPasswordPage (index.tsx)

The main container component for the forgot password page. It:
- Renders the page layout and title
- Imports and uses the ForgotPasswordForm component
- Provides instructions for password reset

### ForgotPasswordForm (components/forgot-password-form.tsx)

A form component specific to the forgot password page. It:
- Handles form submission and validation
- Manages loading, error, and success states
- Provides field for email address
- Shows success message after form submission
- Provides link back to sign-in page

## Usage

```tsx
// In a Next.js page component
import { ForgotPasswordPage } from '@/containers/forgot-password-page';
// or
import { ForgotPasswordPage } from '@/containers/auth'; // If exported from auth/index.ts

export default function ForgotPasswordPageRoute() {
  return <ForgotPasswordPage />;
}
```

## Implementation Notes

This container follows the flat folder structure pattern, where container-specific components are kept together with the container itself. This approach:

- Keeps related components together in a single directory
- Makes it easier to find and manage components for a specific feature
- Reduces the need to navigate between multiple directories
- Allows for container-specific components that aren't meant to be reused elsewhere
