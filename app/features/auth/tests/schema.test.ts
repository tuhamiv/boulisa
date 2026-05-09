import formSchema from "@/features/auth/logic/schema"

describe("Validate Username Logic", () => {
  const testCases = [
    {
      description: "Invalid, Should be a least 3 characters",
      username: "uu",
      expected: false
    },
    {
      description: "Invalid, Should be a most 20 characters",
      username: "u".repeat(21),
      expected: false,
    },
    {
      description: "Invalid, Should be only letters, numbers, . _ -, and '",
      username: "u$u",
      expected: false
    },
    {
      description: "Invalid, Should start with a letter or number",
      username: "_uu",
      expected: false
    },
    {
      description: "Invalid, Should end with a letter or number",
      username: "uu_",
      expected: false
    },
    {
      description: "Invalid, Should contain at least one letter",
      username: "1_2",
      expected: false
    },
    {
      description: "Invalid, Should not contain consecutive symbols",
      username: "u..u",
      expected: false
    },
    {
      description: "Invalid, Should be a non-reserved",
      username: "admin",
      expected: false
    }
  ]

  it.each(testCases)("$description ($username)", ({ username, expected }) => {
    expect(
      formSchema.shape.account.shape.username.safeParse(username).success
    ).toBe(expected)
  })
})

describe("Account Cross-Field (username - password) Logic", () => {
  it("Should fail if password is the same as username", () => {
    const invalidData = {
      username: "username12345678",
      email: "test@test.com",
      password: "username12345678",
      confirmPassword: "username12345678",
    }

    const result = formSchema.shape.account.safeParse(invalidData);

    expect(result.success).toBe(false);

    if (!result.success) {
      const passwordError = result.error.issues.find(i => i.path.includes("password"));
      expect(passwordError?.message).toBe("Password cannot be as the username");
    }
  });
});

describe("Validate Name (first - father - grandfather - family) Logic", () => {
  const testCases = [
    {
      description: "Invalid, Should be at least 2 characters",
      name: "n",
      expected: false,
    },
    {
      description: "Invalid, Should be at most 30 characters",
      name: "n".repeat(31),
      expected: false,
    },
    {
      description: "Invalid, Should have only letters, spaces, - and '",
      name: "n&e",
      expected: false,
    },
    {
      description: "Invalid, Should have only letters, spaces, - and '",
      name: "n3e",
      expected: false,
    },
    {
      description: "Invalid, Should start with letter",
      name: "-nn",
      expected: false,
    },
    {
      description: "Invalid, Should end with letter",
      name: "nn-",
      expected: false,
    },
    {
      description: "Invalid, Should not contain consecutive symbols",
      name: "n  n",
      expected: false
    },
    {
      description: "Invalid, Should not contain consecutive symbols",
      name: "n''n",
      expected: false
    },
    {
      description: "Invalid, Should not contain consecutive symbols",
      name: "n--n'",
      expected: false
    }
  ]

  it.each(testCases)("$description ($name)", ({name, expected}) => {
    expect(formSchema.shape.profile.shape.firstName.safeParse(name).success).toBe(expected);
  })
})

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

describe("Validate Card Number Logic", () => {
  const testCases = [
    {
      description: "Valid, start with valid digit",
      cardNumber: "4111111111111111",
      expected: true,
    },
    {
      description: "Valid, start with valid digit",
      cardNumber: "5555555555554444",
      expected: true,
    },
    {
      description: "Invalid, start with invalid digit",
      cardNumber: "378282246310005",
      expected: false,
    },
    {
      description: "Invalid, contain only digits",
      cardNumber: "4111111111111d11",
      expected: false,
    },
    {
      description: "Invalid, violate length rule",
      cardNumber: "421571392437670",
      expected: false,
    },
    {
      description: "Invalid, violate length rule",
      cardNumber: "555415864802680",
      expected: false,
    },
    {
      description: "Invalid, violate Luhn algorithm",
      cardNumber: "4111111111111112",
      expected: false,
    },
    {
      description: "Invalid, violate Luhn algorithm",
      cardNumber: "2221000000000001",
      expected: false,
    },
    {
      description: "Invalid, violate Luhn algorithm",
      cardNumber: "5105105105105106",
      expected: false,
    },
  ]

  it.each(testCases)("$description ($cardNumber)", ({ cardNumber, expected }) => {
    expect(formSchema.shape.billing.shape.cardNumber.safeParse(cardNumber).success).toBe(expected);
  })

})

describe("Validate Card Expiry Date Logic", () => {
  const testCases = [
    {
      description: "Invalid, contains non-digit characters",
      expiryDate: "bell",
      expected: false,
    },
    {
      description: "Invalid, contains non-digit characters",
      expiryDate: "mm26",
      expected: false,
    },
    {
      description: "Invalid, contains non-digit characters",
      expiryDate: "12yy",
      expected: false,
    },
    {
      description: "Invalid, incomplete expiry date",
      expiryDate: "",
      expected: false,
    },
    {
      description: "Invalid, incomplete expiry date",
      expiryDate: "1",
      expected: false,
    },
    {
      description: "Invalid, incomplete expiry date",
      expiryDate: "12",
      expected: false,
    },
    {
      description: "Invalid, incomplete expiry date",
      expiryDate: "123",
      expected: false,
    },
    {
      description: "Valid, complete expiry date",
      expiryDate: "1230",
      expected: true,
    },
    {
      description: "Invalid, invalid month",
      expiryDate: "1326",
      expected: false,
    },
    {
      description: "Invalid, card has expired",
      expiryDate: "1225",
      expected: false,
    },
    {
      description: "Invalid, card has expired",
      expiryDate: "0326",
      expected: false
    }
  ]

  it.each(testCases)("$description ($expiryDate)", ({ expiryDate, expected }) => {
    expect(formSchema.shape.billing.shape.expiryDate.safeParse(expiryDate).success).toBe(expected);
  })
})

describe("Validate Card CVV Logic", () => {
  const testCases = [
    {
      description: "Invalid, violates length rule",
      cvv: "",
      expected: false,
    },
    {
      description: "Invalid, violates length rule",
      cvv: "1",
      expected: false,
    },
    {
      description: "Invalid, violates length rule",
      cvv: "12",
      expected: false,
    },
    {
      description: "Valid, follow length rule",
      cvv: "123",
      expected: true,
    },
    {
      description: "Invalid, contains non-digit characters",
      cvv: "$23",
      expected: false,
    },
    {
      description: "Invalid, contains non-digit characters",
      cvv: "r23",
      expected: false,
    },
  ]

  it.each(testCases)("$description ($cvv)", ({ cvv, expected }) => {
    expect(formSchema.shape.billing.shape.cvv.safeParse(cvv).success).toBe(expected);
  })
})
