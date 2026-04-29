import React, { useState } from "react"
import { Controller } from "react-hook-form"
import type { Control, FieldValues, Path } from "react-hook-form"
import { Eye, EyeOff } from "lucide-react"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

interface FormFieldProps<
  T extends FieldValues,
> extends React.InputHTMLAttributes<HTMLInputElement> {
  name: Path<T>
  control: Control<T>
  label: string
  formatValue?: (value: string) => string
  parseValue?: (value: string) => string
}

export function FormField<T extends FieldValues>({
  name,
  label,
  control,
  className,
  type,
  formatValue,
  parseValue,
  ...props
}: FormFieldProps<T>) {

  const [showPassword, setShowPassword] = useState(false)
  const isPasswordField = type === "password";
  const inputType = isPasswordField ? (showPassword ? "text" : "password") : type;
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev)
  }
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field className={className}>
          <FieldLabel htmlFor={field.name} className="text-base font-normal">
            {label}
          </FieldLabel>
          <div className="relative">
            <Input
              {...field}
              id={field.name}
              type={inputType}
              value={formatValue ? formatValue(field.value || "") : field.value}
              onChange={e => {
                const value = e.target.value
                field.onChange(parseValue ? parseValue(value) : value)
              }}
              {...props}
              className={isPasswordField ? "pr-10" : ""}
            />

            {isPasswordField && (
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            )}
          </div>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  )
}
