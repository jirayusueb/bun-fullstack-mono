'use client';

import React from 'react';
import { FieldValues, FormProvider, SubmitHandler, UseFormReturn } from 'react-hook-form';
import { cn } from '@workspace/ui/lib/utils';

type FormProps<TFieldValues extends FieldValues = FieldValues> = {
  form: UseFormReturn<TFieldValues>;
  onSubmit: SubmitHandler<TFieldValues>;
  className?: string;
  children: React.ReactNode;
};

/**
 * Form component that provides form context for child form fields
 */
export function Form<TFieldValues extends FieldValues = FieldValues>({
  form,
  onSubmit,
  className,
  children,
}: FormProps<TFieldValues>): React.ReactElement {
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('space-y-6', className)}
      >
        {children}
      </form>
    </FormProvider>
  );
}
