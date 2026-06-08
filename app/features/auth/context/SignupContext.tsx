import { createContext } from "react"

type SignupContextType = {
  message: string
  setMessage: React.Dispatch<React.SetStateAction<string>>
}

export const SignupContext = createContext<SignupContextType>({
  message: "",
  setMessage: () => {}
})