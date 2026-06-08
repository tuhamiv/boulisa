import { useContext } from "react"
import { SignupContext } from "@/features/auth/context/SignupContext"

function FormSentStep() {

  const { message } = useContext(SignupContext)

  return (
    <>
      <div className="mb-6 flex flex-col p-3">
        <span className="text-2xl font-semibold">Form Submitted</span>
        <span className="text-base text-muted-foreground">{message}</span>
      </div>
    </>
  )
}

export default FormSentStep