'use client'

import { MenuIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Button, Sheet } from '@/components/ui'
import { localStorageKeys } from '@/config/local-storage-keys'
import { useMobileSidebar } from '@/hooks'

import { Sidebar } from '..'

const MobileSidebar = () => {
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
        <MenuIcon size={16} />
      </Button>
      <Sheet.Root open={isOpen} onOpenChange={onClose}>
        <Sheet.Content side="left" className="pb-2 pt-10">
          <Sidebar storageKey={localStorageKeys.mobileSidebarState} />
        </Sheet.Content>
      </Sheet.Root>
    </>
  )
}

export { MobileSidebar }
