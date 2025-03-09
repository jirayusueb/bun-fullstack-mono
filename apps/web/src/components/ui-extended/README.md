# Extended UI Components

These components extend the base UI library with additional functionality while maintaining the same design system.

## Form Components

The form components provide integration with React Hook Form and Zod validation:

### `Form`

A wrapper component that provides form context for child form fields.

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui-extended';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
});

const MyForm = () => {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
    },
  });

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Form form={form} onSubmit={onSubmit}>
      {/* form fields */}
    </Form>
  );
};
```

### `FormField`

A wrapper for form fields that handles labels and error messages.

```tsx
import { FormField } from '@/components/ui-extended';

<FormField
  name="email"
  label="Email Address"
  description="We'll never share your email"
>
  {/* input element */}
</FormField>
```

### `FormInput`

An input component that integrates with React Hook Form.

```tsx
import { FormInput } from '@/components/ui-extended';

<FormInput
  name="email"
  register={form.register}
  type="email"
  placeholder="you@example.com"
/>
```

## Complete Example

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@workspace/ui/components/button';
import { Form, FormField, FormInput } from '@/components/ui-extended';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
});

type FormValues = z.infer<typeof schema>;

const ContactForm = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
    },
  });

  const onSubmit = (values: FormValues) => {
    console.log(values);
  };

  return (
    <Form form={form} onSubmit={onSubmit}>
      <FormField name="name" label="Name">
        <FormInput
          name="name"
          register={form.register}
          placeholder="John Doe"
        />
      </FormField>

      <FormField name="email" label="Email">
        <FormInput
          name="email"
          register={form.register}
          type="email"
          placeholder="you@example.com"
        />
      </FormField>

      <Button type="submit">Submit</Button>
    </Form>
  );
};
```
