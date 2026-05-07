import React, { useState } from "react"
import { Controller } from "react-hook-form"
import type { Control, FieldValues, Path } from "react-hook-form"
import { Eye, EyeOff } from "lucide-react"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface FormFieldProps<
  T extends FieldValues,
> extends React.InputHTMLAttributes<HTMLInputElement> {
  name: Path<T>
  control: Control<T>
  label: string
  formatValue?: (value: string) => string
  parseValue?: (value: string) => string
  suffix?: React.ReactNode
}

export function FormField<T extends FieldValues>({
  name,
  label,
  control,
  className,
  type,
  formatValue,
  parseValue,
  suffix,
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
              onChange={(e) => {
                const value = e.target.value
                field.onChange(parseValue ? parseValue(value) : value)
              }}
              {...props}
              className={cn(
                className,
                suffix ? "pr-20" : "",
                isPasswordField ? "pr-10" : ""
              )}
            />

            <div className="absolute top-1/2 right-3 flex -translate-y-1/2 items-center gap-2">
              {isPasswordField ? (
                <button type="button" onClick={togglePasswordVisibility}>
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>) : (
                suffix
              )}
            </div>
          </div>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  )
}
