import instance from "@/lib/api"

type CreateCarrierBody = {
  account: {
    username: string,
    email: string,
    password: string
  },
  profile: {
    firstName: string,
    fatherName: string,
    grandfatherName: string,
    familyName: string,
    nationalId: string,
    mobile: string
  },
  billing: {
    plan: string,
    nameOnCard: string,
    cardNumber: string,
    expiryDate: string,
    cvv: string
  }
}

type CreateCarrierResponse = {
  message: string
}

export const createCarrier = async (data: CreateCarrierBody): Promise<CreateCarrierResponse> => {
  const response = await instance.post<CreateCarrierResponse>(
    "/v1/auth/signup",
    data
  )
  return response.data;
}
