import instance from "@/lib/api"
import type { FormSchema } from "@/features/auth/logic/schema"

export const signup = async (data: FormSchema) => {
  try {
    const response = instance.post("/v1/auth/signup", data)
    console.log("Response on signup: " + response)
  } catch (error) {
    console.error("Error on catch: " + error)
  } finally {
    console.log("Request Completed...")
  }
}