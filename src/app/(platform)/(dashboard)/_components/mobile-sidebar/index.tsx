'use client'

import { MenuIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Button, Sheet } from '@/components/ui'
import { useMobileSidebar } from '@/hooks'
import { localStorageKeys } from '@/lib/local-storage'

import { Sidebar } from '..'

export const MobileSidebar = () => {
  const pathname = usePathname()
  const [isMounted, setIsMounted] = useState(false)

  const onOpen = useMobileSidebar((state) => state.onOpen)
  const onClose = useMobileSidebar((state) => state.onClose)
  const isOpen = useMobileSidebar((state) => state.isOpen)

  useEffect(() => {
    onClose()
  }, [onClose, pathname])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <>
      <Button
        onClick={onOpen}
        size="icon"
        variant="ghost"
        className="mr-2 flex md:hidden"
      >
        <MenuIcon className="h-4 w-4" />
      </Button>
      <Sheet.Root open={isOpen} onOpenChange={onClose}>
        <Sheet.Content side="left" className="pb-2 pt-10">
          <Sidebar storageKey={localStorageKeys.mobileSidebarState} />
        </Sheet.Content>
      </Sheet.Root>
    </>
  )
}
