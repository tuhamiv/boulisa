import React from "react"
import { useFormContext } from "react-hook-form"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Field, FieldGroup } from "@/components/ui/field"
import { FormField } from "@/components/form-field"
import { Button } from "@/components/ui/button"
import type { FormSchema } from "@/routes/carrier/auth/schema"

function AccountStep({onNext}: {onNext: () => void}) {

  const { control, trigger } = useFormContext<FormSchema>();

  const handleNext = async () => {
    const isValid = await trigger(["account"]);
    if (isValid) {
      onNext()
    }
  }

  return (
    <>
      <div className="flex flex-col">
        <span className="text-2xl font-semibold">Account Information</span>
        <span className="text-base text-muted-foreground">
          Enter Your Account Details
        </span>
      </div>
      <FieldGroup className="grid grid-cols-2 gap-6">
        <FormField
          name="account.username"
          control={control}
          label="Username"
          placeholder="JohnDoe"
          autoComplete="on"
        />
        <FormField
          name="account.email"
          control={control}
          label="Email"
          placeholder="john.doe@example.com"
          autoComplete="on"
        />
        <FormField
          name="account.password"
          control={control}
          label="Password"
          type="password"
          placeholder="Password"
          autoComplete="new-password"
        />
        <FormField
          name="account.confirmPassword"
          control={control}
          label="Confirm Password"
          type="password"
          placeholder="Confirm Password"
          autoComplete="new-password"
        />
      </FieldGroup>
      <Field
        orientation="horizontal"
        className="mt-6 flex items-center justify-between"
      >
        <Button type="button" variant="ghost" disabled>
          <ArrowLeft /> Previous
        </Button>
        <Button type="button" size="lg" onClick={handleNext}>
          Next <ArrowRight />
        </Button>
      </Field>
    </>
  )
}

export default AccountStep;
