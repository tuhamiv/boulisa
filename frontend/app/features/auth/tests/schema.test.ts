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

describe("Validate Name on Card Logic", () => {
  const testCases = [
    {
      description: "Valid, violate minimum length",
      nameOnCard: "N",
      expected: false,
    },
    {
      description: "Valid, violate maximum length",
      nameOnCard:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      expected: false,
    },
    {
      description: "Invalid, violate allowed characters",
      nameOnCard: "N#me",
      expected: false,
    },
    {
      description: "Invalid, violate allowed characters",
      nameOnCard: "4587",
      expected: false,
    },
    {
      description: "Valid, follow allowed characters",
      nameOnCard: "I'm",
      expected: true,
    },
    {
      description: "Valid, follow allowed characters",
      nameOnCard: "Lily-Rose",
      expected: true,
    },
    {
      description: "Invalid, violate starting rule",
      nameOnCard: "-ame",
      expected: false,
    },
    {
      description: "Invalid, violate starting rule",
      nameOnCard: "#@",
      expected: false,
    },
    {
      description: "Invalid, violate ending rule",
      nameOnCard: "ame-",
      expected: false,
    },
    {
      description: "Valid, Arabic name support",
      nameOnCard: "محمد بن عبدالمطلب",
      expected: true,
    },
    {
      description: "Valid, handle normalization (trimming)",
      nameOnCard: "   John Doe   ",
      expected: true,
    }
  ]

  it.each(testCases)("$description ($nameOnCard)", ({ nameOnCard, expected }) => {
    expect(formSchema.shape.billing.shape.nameOnCard.safeParse(nameOnCard).success).toBe(expected);
  })
})