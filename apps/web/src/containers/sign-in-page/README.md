# Sign In Page Container

This directory contains the container component and related components for the sign-in page.

## Directory Structure

```
sign-in-page/
├── index.tsx           # Main container component
└── components/         # Container-specific components
    └── sign-in-form.tsx
```

## Components

### SignInPage (index.tsx)

The main container component for the sign-in page. It:
- Renders the page layout and title
- Imports and uses the SignInForm component
- Provides links to sign up and forgot password pages

### SignInForm (components/sign-in-form.tsx)

A form component specific to the sign-in page. It:
- Handles form submission and validation
- Manages loading and error states
- Provides fields for email and password
- Includes "Remember me" checkbox
- Links to the forgot password page

## Usage

```tsx
// In a Next.js page component
import { SignInPage } from '@/containers/sign-in-page';
// or
import { SignInPage } from '@/containers/auth'; // If exported from auth/index.ts

export default function SignInPageRoute() {
  return <SignInPage />;
}
```

## Implementation Notes

This container follows the flat folder structure pattern, where container-specific components are kept together with the container itself. This approach:

- Keeps related components together in a single directory
- Makes it easier to find and manage components for a specific feature
- Reduces the need to navigate between multiple directories
- Allows for container-specific components that aren't meant to be reused elsewhere
