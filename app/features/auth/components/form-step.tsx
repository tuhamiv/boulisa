import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

type Props = {
  Icon: LucideIcon,
  bgColor?: string,
  strokeColor?: string,
  primaryText: string,
  secondaryText: string,
  isActive: boolean,
}

function FormStep({
  Icon,
  primaryText,
  secondaryText,
  isActive,
}: Props) {
  const bgColor = isActive ? "bg-primary" : "bg-primary/10"
  const strokeColor = isActive ? "white" : "var(--primary)"

  return (
    <div className="flex items-center gap-3">
      <div
        className={cn(
          "flex h-9.5 w-9.5 items-center justify-center rounded-full",
          bgColor
        )}
      >
        <Icon size={16} stroke={strokeColor} />
      </div>

      <div className="flex flex-col items-start">
        <span className="text-sm font-medium text-foreground">
          {primaryText}
        </span>
        <span className="text-base font-normal text-muted-foreground">
          {secondaryText}
        </span>
      </div>
    </div>
  )
}

export default FormStep;