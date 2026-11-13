import * as React from 'react'
import type { VariantProps } from 'class-variance-authority'
import { cn } from 'cn'
import { Slot } from 'radix-ui'
import { BUTTON_DEFAULTS, BUTTON_VARIANTS } from '@/constants/button'

function Button({
  className,
  variant = BUTTON_DEFAULTS.variant,
  size = BUTTON_DEFAULTS.size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof BUTTON_VARIANTS> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : 'button'

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(BUTTON_VARIANTS({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button }
