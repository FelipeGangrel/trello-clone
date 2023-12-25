import { Suspense } from 'react'

import { Separator } from '@/components/ui'
import { checkSubscription } from '@/lib/subscription'

import { BoardList, OrganizationInfo } from './_components'

const OrganizationPage = async () => {
  const isPro = await checkSubscription()

  return (
    <div className="mb-20 w-full">
      <OrganizationInfo isPro={isPro} />
      <Separator className="my-4" />
      <div className="px-2 md:px-4">
        <Suspense fallback={<BoardList.Skeleton />}>
          <BoardList />
        </Suspense>
      </div>
    </div>
  )
}

export default OrganizationPage
