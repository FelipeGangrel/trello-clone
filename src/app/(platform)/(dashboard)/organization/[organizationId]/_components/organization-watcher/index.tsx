'use client'

import { useOrganizationList } from '@clerk/nextjs'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'

/**
 * @description this component updates the active organization when
 * the organizationId changes
 */
export const OrganizationWatcher = () => {
  const params = useParams()
  const { setActive } = useOrganizationList()

  useEffect(() => {
    if (!setActive) return

    setActive({
      organization: params.organizationId as string,
    })
  }, [params.organizationId, setActive])

  return null
}
