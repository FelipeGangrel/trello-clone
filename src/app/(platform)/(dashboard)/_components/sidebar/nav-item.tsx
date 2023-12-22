'use client'

import {
  ActivityIcon,
  CreditCardIcon,
  LayoutIcon,
  SettingsIcon,
} from 'lucide-react'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'

import { Accordion, Button, Skeleton } from '@/components/ui'
import { frontend } from '@/lib/routes'
import { cn } from '@/lib/utils'

type Organization = {
  id: string
  slug: string
  imageUrl: string
  name: string
}

type NavItemProps = {
  organization: Organization
  isActive: boolean
  isExpanded: boolean
  onExpand: (id: string) => void
}

const NavItem = ({
  organization,
  onExpand,
  isActive,
  isExpanded,
}: NavItemProps) => {
  const router = useRouter()
  const pathname = usePathname()

  const routes = [
    {
      label: 'Boards',
      icon: <LayoutIcon size={16} className="mr-2" />,
      href: frontend.organization(organization.id),
    },
    {
      label: 'Activity',
      icon: <ActivityIcon size={16} className="mr-2" />,
      href: frontend.organizationActivity(organization.id),
    },
    {
      label: 'Settings',
      icon: <SettingsIcon size={16} className="mr-2" />,
      href: frontend.organizationSettings(organization.id),
    },
    {
      label: 'Billing',
      icon: <CreditCardIcon size={16} className="mr-2" />,
      href: frontend.organizationBilling(organization.id),
    },
  ]

  const navigate = (href: string) => {
    router.push(href)
  }

  return (
    <Accordion.Item value={organization.id} className="border-none">
      <Accordion.Trigger
        onClick={() => onExpand(organization.id)}
        className={cn(
          'flex items-center gap-x-2 rounded-md p-2 text-start text-neutral-700 no-underline transition hover:bg-neutral-500/10 hover:no-underline',
          isActive && !isExpanded && 'bg-sky-500/10 text-sky-700'
        )}
      >
        <div className="flex items-center gap-x-2">
          <div className="relative h-7 w-7">
            <Image
              fill
              src={organization.imageUrl}
              alt="Organization"
              className="rounded-sm object-cover"
            />
          </div>
          <span className="text-sm font-medium">{organization.name}</span>
        </div>
      </Accordion.Trigger>
      <Accordion.Content className="pt-1 text-neutral-700">
        {routes.map((route) => (
          <Button
            key={route.href}
            size="sm"
            variant="ghost"
            onClick={() => navigate(route.href)}
            className={cn(
              'mb-1 w-full justify-start pl-10 font-normal',
              pathname === route.href && 'bg-sky-500/10 text-sky-700'
            )}
          >
            {route.icon}
            {route.label}
          </Button>
        ))}
      </Accordion.Content>
    </Accordion.Item>
  )
}

NavItem.Skeleton = function SkeletonNavItem() {
  return (
    <div className="flex items-center gap-x-2">
      <div className="relative h-10 w-10 shrink-0">
        <Skeleton className="absolute h-full w-full" />
      </div>
      <Skeleton className="h-10 w-full" />
    </div>
  )
}

export { NavItem }
export type { NavItemProps, Organization }
