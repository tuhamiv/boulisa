import formSchema from "@/features/auth/logic/schema"

describe("Validate National ID Logic", () => {
  const testCases = [
    // century
    {
      description: "Invalid century 1",
      nationalId: "10402210400139",
      expected: false,
    },
    {
      description: "Century/DOB logical conflict (1904)",
      nationalId: "20402210400139",
      expected: false,
    },
    {
      description: "Century/DOB logical conflict (2081)",
      nationalId: "38110020400205",
      expected: false,
    },
    {
      description: "Invalid century 4",
      nationalId: "40402210400139",
      expected: false,
    },
    { description: "Valid", nationalId: "30402210400139", expected: true },
    { description: "Valid", nationalId: "28110020400205", expected: true },
  ]

  it.each(testCases)("$description ($nationalId)", ({ nationalId, expected }) => {
    expect(formSchema.shape.profile.shape.nationalId.safeParse(nationalId).success).toBe(expected);
  })

})