import signupHi from "@/features/auth/assets/signup-hi.svg"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ChevronRight, CreditCard, House, User } from "lucide-react"
import React, { Fragment, useState } from "react"
import Logo from "@/components/shared/logo"
import FormStep from "@/features/auth/components/form-step"
import formSchema, { type FormSchema } from "@/features/auth/logic/schema"
import AccountStep from "@/features/auth/components/account-step"
import ProfileStep from "@/features/auth/components/profile-step"
import BillingStep from "@/features/auth/components/billing-step"
import FormSentStep from "@/features/auth/components/form-sent-step"
import { Button } from "@/components/ui/button"

const steps = [
  {
    id: 1,
    primaryText: "Account Details",
    secondaryText: "Setup Account Details",
    icon: House,
  },
  {
    id: 2,
    primaryText: "Personal Information",
    secondaryText: "Add Personal Info",
    icon: User,
  },
  {
    id: 3,
    primaryText: "Billing",
    secondaryText: "Payment Details",
    icon: CreditCard,
  },
]

export function SignupWizard() {

  const [currentStep, setCurrentStep] = useState(1)

  const prevStep = () => setCurrentStep(currentStep - 1)

  const nextStep = () => setCurrentStep(currentStep + 1)

  const methods = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      account: {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      profile: {
        firstName: "",
        fatherName: "",
        grandfatherName: "",
        familyName: "",
        nationalId: "",
        mobile: "",
      },
      billing: {
        plan: "pro",
        nameOnCard: "",
        cardNumber: "",
        expiryDate: "",
        cvc: "",
      },
    },
  })

  const renderSteps = () => {
    switch (currentStep) {
      case 1:
        return <AccountStep onNext={nextStep} />
      case 2:
        return <ProfileStep onPrev={prevStep} onNext={nextStep} />
      case 3:
        return <BillingStep onPrev={prevStep} onNext={nextStep} />
      case 4:
        return <FormSentStep />
      default:
        return null
    }
  }

  return (
    <FormProvider {...methods}>
      <div className="grid min-h-screen w-full lg:grid-cols-3">
        <div className="hidden flex-col border-r bg-red-50 lg:col-span-1 lg:flex">
          <div className="p-10">
            <Logo />
          </div>
          <div className="">
            <img src={signupHi} alt="Hi user" />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center p-6 md:p-12 lg:col-span-2">
          <div className="w-full max-w-200 space-y-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => {
                const isActive = index < currentStep
                return (
                  <Fragment key={step.id}>
                    <Button
                      onClick={() => setCurrentStep(step.id)}
                      variant="ghost"
                      className="hover:bg-transparent"
                    >
                      <FormStep
                        Icon={step.icon}
                        primaryText={step.primaryText}
                        secondaryText={step.secondaryText}
                        isActive={isActive}
                      />
                    </Button>
                    {index < steps.length - 1 && <ChevronRight size={16} />}
                  </Fragment>
                )
              })}
            </div>
            {renderSteps()}
          </div>
        </div>
      </div>
    </FormProvider>
  )
}
