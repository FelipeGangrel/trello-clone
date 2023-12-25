import { User2Icon } from 'lucide-react'
import { Suspense } from 'react'

import { OrganizationInfo } from '@/components/dashboard'
import { Separator } from '@/components/ui'
import { checkSubscription } from '@/lib/subscription'

import { BoardList } from './_components'

const OrganizationPage = async () => {
  const isPro = await checkSubscription()

  return (
    <div className="mb-20 w-full">
      <OrganizationInfo isPro={isPro} />
      <Separator className="my-4" />
      <div className="space-y-4">
        <div className="flex items-center text-lg font-semibold text-neutral-700">
          <User2Icon className="mr-2 h-6 w-6" />
          <span>Your boards</span>
        </div>
        <Suspense fallback={<BoardList.Skeleton />}>
          <BoardList />
        </Suspense>
      </div>
    </div>
  )
}

export default OrganizationPage
