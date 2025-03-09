# Sign Up Page Container

This directory contains the container component and related components for the sign-up page.

## Directory Structure

```
sign-up-page/
├── index.tsx           # Main container component
└── components/         # Container-specific components
    └── sign-up-form.tsx
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
- Handles form submission and validation
- Manages loading and error states
- Provides fields for name, email, and password
- Includes terms and conditions checkbox
- Calls the onSuccess callback after successful registration

## Usage

```tsx
// In a Next.js page component
import { SignUpPage } from '@/containers/sign-up-page';
// or
import { SignUpPage } from '@/containers/auth'; // If exported from auth/index.ts

export default function SignUpPageRoute() {
  return <SignUpPage />;
}
```

## Implementation Notes

This container follows the flat folder structure pattern, where container-specific components are kept together with the container itself. This approach:

- Keeps related components together in a single directory
- Makes it easier to find and manage components for a specific feature
- Reduces the need to navigate between multiple directories
- Allows for container-specific components that aren't meant to be reused elsewhere
