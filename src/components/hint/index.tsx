'use client'

import { Tooltip, TooltipProvider } from '../ui/tooltip'

export type HintProps = {
  children: React.ReactNode
  description: string
  side?: 'top' | 'right' | 'bottom' | 'left'
  sideOffset?: number
}

export const Hint = ({
  children,
  description,
  side,
  sideOffset,
}: HintProps) => {
  return (
    <TooltipProvider>
      <Tooltip.Root delayDuration={0}>
        <Tooltip.Trigger>{children}</Tooltip.Trigger>
        <Tooltip.Content
          sideOffset={sideOffset}
          side={side}
          className="max-w-[220px] break-words text-xs"
        >
          {description}
        </Tooltip.Content>
      </Tooltip.Root>
    </TooltipProvider>
  )
}
