'use client'

import { useOrganization } from '@clerk/nextjs'
import { CreditCardIcon } from 'lucide-react'
import Image from 'next/image'

import { Skeleton } from '@/components/ui'

type InfoProps = {}

export const OrganizationInfo = ({}: InfoProps) => {
  const { organization, isLoaded } = useOrganization()

  if (!isLoaded) {
    return <OrganizationInfo.Skeleton />
  }

  return (
    <div className="flex items-center gap-x-4">
      {organization?.imageUrl && (
        <div className="relative h-[60px] w-[60px]">
          <Image
            fill
            priority
            sizes="60px"
            src={organization.imageUrl}
            alt="Organization"
            className="rounded-md object-cover"
          />
        </div>
      )}
      <div className="space-y-1">
        <p className="text-xl font-semibold">{organization?.name}</p>
        <div className="flex items-center text-xs text-muted-foreground">
          <CreditCardIcon className="mr-1 h-3 w-3" />
          <span>Free plan</span>
        </div>
      </div>
    </div>
  )
}

OrganizationInfo.Skeleton = function OrganizationInfoSkeleton() {
  return (
    <div className="flex items-center gap-x-4">
      <div className="h-[60px] w-[60px]">
        <Skeleton className="h-full w-full rounded-md" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-6 w-40" />
        <div className="flex items-center">
          <Skeleton className="mr-1 h-3 w-3" />
          <Skeleton className="h-3 w-10" />
        </div>
      </div>
    </div>
  )
}
