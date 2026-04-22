import { useFormContext } from "react-hook-form"
import { type FormSchema } from "@/routes/carrier/auth/schema"
import { Field, FieldGroup } from "@/components/ui/field"
import { FormField } from "@/components/form-field"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"
import React from "react"
import { formatMobile, formatNationalId, parseRawValue } from "@/lib/formatters"

function ProfileStep({
  onPrev,
  onNext,
}: {
  onPrev: () => void
  onNext: () => void
}) {

  const { control, trigger } = useFormContext<FormSchema>();

  const handleNext = async () => {
    const isValid = await trigger(["profile"]);
    if (isValid) {
      onNext();
    }
  }

  return (
    <>
      <div className="flex flex-col">
        <span className="text-2xl font-semibold">Personal Information</span>
        <span className="text-base text-muted-foreground">
          Enter Your Personal Information
        </span>
      </div>
      <FieldGroup className="grid grid-cols-4 gap-6">
        <FormField
          name="profile.firstName"
          control={control}
          label="First Name"
          placeholder="John"
        />
        <FormField
          name="profile.fatherName"
          control={control}
          label="Father Name"
          placeholder="William"
        />
        <FormField
          name="profile.grandfatherName"
          control={control}
          label="Grandfather Name"
          placeholder="Robert"
        />
        <FormField
          name="profile.familyName"
          control={control}
          label="Family Name"
          placeholder="Doe"
        />
        <FormField
          name="profile.nationalId"
          control={control}
          label="National ID"
          formatValue={formatNationalId}
          parseValue={parseRawValue}
          placeholder="0 12 34 56 78 901 23"
          className="col-span-2"
        />
        <FormField
          name="profile.mobile"
          control={control}
          label="Mobile"
          formatValue={formatMobile}
          parseValue={parseRawValue}
          placeholder="012 3456 7890"
          className="col-span-2"
        />
      </FieldGroup>
      <Field orientation="horizontal" className="mt-6 flex items-center justify-between">
        <Button type="button" variant="ghost" onClick={onPrev}>
          <ArrowLeft />
          Previous
        </Button>
        <Button type="button" size="lg" onClick={handleNext}>
          Next
          <ArrowRight />
        </Button>
      </Field>
    </>
  )
}

export default ProfileStep;
