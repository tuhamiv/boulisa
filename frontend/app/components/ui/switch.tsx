import * as React from "react"
import { Switch as SwitchPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Switch({
  className,
  size = "default",
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & {
  size?: "sm" | "default"
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        "peer group/switch relative inline-flex shrink-0 items-center rounded-full border border-transparent transition-all outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
        "data-[size=default]:h-5 data-[size=default]:w-9",
        "data-[size=sm]:h-3.5 data-[size=sm]:w-6",
        "bg-muted data-[state=checked]:bg-primary",
        "data-disabled:cursor-not-allowed data-disabled:opacity-50",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block rounded-full bg-background shadow-sm ring-0 transition-transform",
          // Thumb Sizes
          "group-data-[size=default]/switch:size-4 group-data-[size=sm]/switch:size-3",
          "translate-x-0.5 data-[state=checked]:group-data-[size=default]/switch:translate-x-4.5",
          "data-[state=checked]:group-data-[size=sm]/switch:translate-x-2.5",
          "dark:bg-foreground"
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch };
