import { type Control, useWatch } from "react-hook-form"
import type { FormSchema } from "@/features/auth/logic/schema"
import { MastercardSVG, VisaSVG } from "@/features/auth/components/card-icons"

function CardBrandIcons({ control } : { control: Control<FormSchema>}) {

  const cardNumber = useWatch({
    control,
    name: "billing.cardNumber",
    defaultValue: "",
  })

  const isEmpty= cardNumber.length === 0;
  const isVisa = cardNumber.startsWith("4");
  const isMastercard = cardNumber.startsWith("2") || cardNumber.startsWith("5")

  return (
    <div className="flex items-center gap-2">
      {(isEmpty || isVisa) && <VisaSVG />}
      {(isEmpty || isMastercard) && <MastercardSVG />}
    </div>
  );

}

export default CardBrandIcons;