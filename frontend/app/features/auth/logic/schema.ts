import { z } from 'zod'

const nameConstraints = z
  .string()
  .transform((n) => n.trim().normalize("NFKC"))
  .pipe(z
    .string()
    .min(2, "Must be at least 2 characters")
    .max(50, "Must be at most 50 characters")
    .regex(/^[\p{L}\s'-]+$/u, "Letters, spaces, ' and - only")
    .regex(/^\p{L}/u, "Must start with a letter")
    .regex(/\p{L}$/u, "Must end with a letter")
  );

const nationalIdCenturyPattern = "[23]";
const nationalIdYearPattern = "(0[0-5]|[6-9][0-9])"; // 1960 : 2005
const nationalIdMonthPattern = "(0[1-9]|1[0-2])"; // 1 : 12
const nationalIdDayPattern = "(0[1-9]|[12][0-9]|3[01])"; // 1 : 31
const nationalIdGovernPattern = "(01|02|03|04|11|12|13|14|15|16|17|18|19|21|22|23|24|25|26|27|28|29|31|32|33|34|35|88)";
const nationalIdSequencePattern = "\\d{5}";
const nationalIdRegex = new RegExp(`^${nationalIdCenturyPattern}${nationalIdYearPattern}${nationalIdMonthPattern}${nationalIdDayPattern}${nationalIdGovernPattern}${nationalIdSequencePattern}$`);

const formSchema = z.object({
  account: z
    .object({
      username: z
        .string()
        .transform((s) => s.trim().normalize("NFKC").toLowerCase())
        .pipe(
          z
            .string()
            .min(3, "Must be at least 3 characters")
            .max(20, "Must be at most 20 characters")
            .regex(/^[\p{L}\p{N}._]+$/u, "Letters, numbers, . and _ only")
            .regex(/^[\p{L}\p{N}]/u, "Cannot start with a symbol")
            .regex(/[\p{L}\p{N}]$/u, "Cannot end with a symbol")
            .regex(/\p{L}/u, "Must contain at least one letter")
            .refine(
              (s) => !/[._]{2,}/.test(s),
              "Cannot contain consecutive symbols"
            )
            .refine(
              (s) => !["admin", "root", "support", "api", "help"].includes(s),
              "This username is reserved"
            )
        ),
      email: z.email("Please enter a valid email"),
      password: z
        .string()
        .min(16, "Must be at least 16 characters")
        .max(64, "Must be at most 64 characters"),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    })
    .refine((account) => account.password !== account.username, {
      message: "Password cannot be as the username",
      path: ["password"],
    }),

  profile: z.object({
    firstName: nameConstraints,
    fatherName: nameConstraints,
    grandfatherName: nameConstraints,
    familyName: nameConstraints,
    nationalId: z
      .string()
      .regex(nationalIdRegex, "Invalid national id")
      .refine(
        (nid) => {
          const century = Number(nid.substring(0, 1))
          const year =
            (century === 2 ? 1900 : 2000) + Number(nid.substring(1, 3))
          const month = Number(nid.substring(3, 5)) - 1 // As date month format is 0:11 not 1:12
          const day = Number(nid.substring(5, 7))
          const date = new Date(year, month, day)

          return (
            year === date.getFullYear() &&
            month === date.getMonth() &&
            day === date.getDate() &&
            ((century === 2 && year >= 1960 && year <= 1999) ||
              (century === 3 && year >= 2000 && year <= 2005))
          )
        },
        { message: "Invalid national id (check your birthdate)" }
      )
      .refine(
        (nid) => {
          const modulus = 11
          const checksum = Number(nid.slice(-1))
          const weights = [2, 7, 6, 5, 4, 3, 2, 7, 6, 5, 4, 3, 2]
          const digits = Array.from(nid, Number)
          const sum = weights.reduce(
            (accumulator, currentValue, currentIndex) =>
              accumulator + currentValue * (digits.at(currentIndex) ?? 0),
            0
          )
          const remainder = sum % modulus
          const calcChecksum = (() => {
            switch (remainder) {
              case 0:
                return 1
              case 1:
                return 0
              default:
                return modulus - remainder
            }
          })()
          return calcChecksum === checksum
        },
        { message: "Invalid national id" }
      ),
    mobile: z.string().regex(/^01[0125]\d{8}$/, "Invalid mobile number"),
  }),

  billing: z.object({
    plan: z.enum(["pro", "elite"]),
    nameOnCard: z
      .string()
      .transform((noc) => noc.trim().normalize("NFKC").toLowerCase())
      .pipe(
        z
          .string()
          .min(2, "Must be at least 2 letters")
          .max(50, "Must be at most 50 letters")
          .regex(/^[\p{L}\s'-]+$/u, "Letters, spaces, ' and - only")
          .regex(/^\p{L}/u, "Must start with a letter")
          .regex(/\p{L}$/u, "Must end with a letter")
      ),
    cardNumber: z
      .string()
      .pipe(z
        .string()
        .refine((cdn) => /^[245]/.test(cdn), {
          message: "Unsupported card number",
        })
        .length(16, "Card number must be 16 digits")
        .refine(
          (cdn) => {
            const cardDigits = Array.from(cdn, Number)
            const len = cardDigits.length
            let sum = 0
            for (let i = 0; i < len; i++) {
              let digit = cardDigits[len - i - 1]
              if (i % 2 === 1) {
                digit *= 2
                if (digit > 9) digit -= 9
              }
              sum += digit
            }
            return sum % 10 === 0
          },
          { message: "Invalid card number" }
        )
      ),
    expiryDate: z.string(),
    cvc: z.string(),
  }),
})

export default formSchema;

export type FormSchema = z.infer<typeof formSchema>;
