import { Controller, useFormContext } from "react-hook-form"
import { ArrowLeft } from "lucide-react"
import type { FormSchema } from "@/features/auth/logic/schema"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Field, FieldGroup } from "@/components/ui/field"
import { FormField } from "@/features/auth/components/form-field"
import { Button } from "@/components/ui/button"

const plans = [
  {
    id: "pro",
    title: "Pro",
    description: "Enjoy our services",
    price: "9999",
    frequency: "month",
  },
  {
    id: "elite",
    title: "Elite",
    description: "Enjoy our services",
    price: "99999",
    frequency: "year",
  },
]

function BillingStep({
  onPrev,
  onNext
}: {
  onPrev: () => void
  onNext: () => void
}) {

  const {control, handleSubmit} = useFormContext<FormSchema>();

  const onSubmit = (data: FormSchema) => {
    console.log(data);
    if(onNext) onNext();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-6 flex flex-col">
        <span className="text-2xl font-semibold">Select Plan</span>
        <span className="text-base text-muted-foreground">
          Select Plan as per Your Requirements
        </span>
      </div>
      <Controller control={control} name="billing.plan" render={({ field }) => (
          <RadioGroup onValueChange={field.onChange} value={field.value} defaultValue={field.value} className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {plans.map((plan) => (
              <Label key={plan.id} htmlFor={plan.id} className="cursor-pointer">
                <Card className="w-full has-data-[state=checked]:border-ring has-data-[state=checked]:ring-3 has-data-[state=checked]:ring-ring/50">
                  <CardHeader>
                    <CardTitle className="text-center font-medium">
                      {plan.title}
                    </CardTitle>
                    <CardDescription
                      className="text-center text-sm"
                      children={plan.description}
                    />
                  </CardHeader>
                  <CardContent className="flex items-baseline justify-center">
                    <sup className="mt-2 mr-0.5 self-start text-2xl font-medium text-muted-foreground">
                      £
                    </sup>
                    <span className="text-4xl font-extrabold tracking-tight">
                      {plan.price}
                    </span>
                    <span className="ml-1 text-xl font-medium text-muted-foreground">
                      /{plan.frequency}
                    </span>
                  </CardContent>
                  <CardFooter className="flex items-center justify-center border-none bg-background">
                    <RadioGroupItem value={plan.id} id={plan.id} />
                  </CardFooter>
                </Card>
              </Label>
            ))}
          </RadioGroup>
        )} />
      <div className="my-6 flex flex-col">
        <span className="text-2xl font-semibold">Payment Information</span>
        <span className="text-base text-muted-foreground">
          Enter Your Card Information
        </span>
      </div>
      <FieldGroup className="grid grid-cols-4 gap-6">
        <FormField
          name="billing.nameOnCard"
          control={control}
          label="Name on Card"
          placeholder="John Doe"
          className="col-span-4"
        />
        <FormField
          name="billing.cardNumber"
          control={control}
          label="Card Number"
          placeholder="0123 4567 8901 2345"
          className="col-span-2"
        />
        <FormField
          name="billing.expiryDate"
          control={control}
          label="Expiry Date"
          placeholder="MM/YY"
          className="col-span-1"
        />
        <FormField
          name="billing.cvc"
          control={control}
          label="CVC"
          placeholder="123"
          className="col-span-1"
        />
      </FieldGroup>
      <Field orientation="horizontal" className="mt-6 flex items-center justify-between">
        <Button type="button" variant="ghost" onClick={onPrev}>
          <ArrowLeft />
          Previous
        </Button>
        <Button type="submit" size="lg">
          Submit
        </Button>
      </Field>
    </form>
  )
}

export default BillingStep;
