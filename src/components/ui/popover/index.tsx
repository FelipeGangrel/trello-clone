'use client'

import * as PopoverPrimitive from '@radix-ui/react-popover'
import { XIcon } from 'lucide-react'
import * as React from 'react'

import { cn } from '@/lib/utils'

import { Button } from '..'

const PopoverRoot = PopoverPrimitive.Root

const PopoverTrigger = PopoverPrimitive.Trigger

const PopoverClose = PopoverPrimitive.Close

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = 'center', sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        'z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
))
PopoverContent.displayName = PopoverPrimitive.Content.displayName

const PopoverCloseButton = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Close>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Close>
>((props, ref) => (
  <PopoverPrimitive.Close
    ref={ref}
    className="absolute right-2 top-2 text-neutral-600"
    asChild
    {...props}
  >
    <Button variant="ghost" size="xs">
      <XIcon className="h-4 w-4" />
    </Button>
  </PopoverPrimitive.Close>
))
PopoverCloseButton.displayName = PopoverPrimitive.Close.displayName

export const Popover = {
  Root: PopoverRoot,
  Trigger: PopoverTrigger,
  Close: PopoverClose,
  CloseButton: PopoverCloseButton,
  Content: PopoverContent,
}
