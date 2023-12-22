'use client'

import { useOrganization, useOrganizationList } from '@clerk/nextjs'
import { PlusIcon } from 'lucide-react'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import { useLocalStorage } from 'usehooks-ts'

import { Accordion, Button, Separator, Skeleton } from '@/components/ui'
import { localStorageKeys } from '@/config/local-storage-keys'
import { frontend } from '@/lib/routes'

import { NavItem, Organization } from './nav-item'

type SidebarProps = {
  storageKey?: string
}

type StorageState = Record<string, any>

const Sidebar: React.FC<SidebarProps> = ({
  storageKey = localStorageKeys.sidebarState,
}) => {
  const [expanded, setExpanded] = useLocalStorage<StorageState>(storageKey, {})

  const { organization: activeOrg, isLoaded: isOrgLoaded } = useOrganization()
  const { userMemberships, isLoaded: isOrgListLoaded } = useOrganizationList({
    userMemberships: {
      // for pagination purposes
      infinite: true,
    },
  })

  const defaultAccordionValue = useMemo((): string[] => {
    const value = Object.keys(expanded).reduce((acc: string[], key: string) => {
      if (expanded[key]) {
        acc.push(key)
      }

      return acc
    }, [])

    return value
  }, [expanded])

  const onExpand = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  if (!isOrgLoaded || !isOrgListLoaded || userMemberships.isLoading) {
    return <Skeleton />
  }

  return (
    <div className="flex w-full flex-col">
      <div className="mb-1 flex items-center text-xs font-medium">
        <span className="pl-4">Workspaces</span>
        <Button
          asChild
          type="button"
          size="icon"
          variant="ghost"
          className="ml-auto"
        >
          <Link href={frontend.selectOrganization()}>
            <PlusIcon size={16} />
          </Link>
        </Button>
      </div>
      <Accordion.Root
        type="multiple"
        defaultValue={defaultAccordionValue}
        className="space-y-2"
      >
        {userMemberships.data?.map(({ organization }) => (
          <NavItem
            key={organization.id}
            isActive={activeOrg?.id === organization.id}
            isExpanded={expanded[organization.id]}
            organization={organization as Organization}
            onExpand={onExpand}
          />
        ))}
      </Accordion.Root>
    </div>
  )
}

export { Sidebar }
