'use client';

import React from 'react';
import { FieldPath, FieldValues, UseFormRegister, useFormContext } from 'react-hook-form';
import { cn } from '@workspace/ui/lib/utils';

/**
 * Form field wrapper component that handles labels and error messages
 */
type FormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName;
  label?: string;
  description?: string;
  className?: string;
  children: React.ReactNode;
};

export function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  label,
  description,
  className,
  children,
}: FormFieldProps<TFieldValues, TName>): React.ReactElement {
  const { formState: { errors } } = useFormContext<TFieldValues>();
  const errorMessage = errors[name]?.message as string | undefined;
  const id = `field-${name}`;

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <div className="flex items-center justify-between">
          <label
            htmlFor={id}
            className="block text-sm font-medium text-foreground"
          >
            {label}
          </label>
        </div>
      )}

      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}

      {children}

      {errorMessage && (
        <p className="text-xs text-destructive">
          {errorMessage}
        </p>
      )}
    </div>
  );
}

/**
 * Input component with form registration
 */
type FormInputProps<
  TFieldValues extends FieldValues = FieldValues
> = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name'> & {
  name: FieldPath<TFieldValues>;
  register: UseFormRegister<TFieldValues>;
};

export function FormInput<
  TFieldValues extends FieldValues = FieldValues
>({
  name,
  register,
  className,
  ...props
}: FormInputProps<TFieldValues>): React.ReactElement {
  const { formState: { errors } } = useFormContext<TFieldValues>();
  const hasError = Boolean(errors[name]);

  return (
    <input
      id={`field-${name}`}
      className={cn(
        "block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        hasError && "border-destructive focus-visible:ring-destructive",
        className
      )}
      {...register(name)}
      {...props}
    />
  );
}
