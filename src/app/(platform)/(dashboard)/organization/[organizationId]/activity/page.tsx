import { ActivityIcon } from 'lucide-react'
import { Suspense } from 'react'

import { Separator } from '@/components/ui/separator'
import { checkSubscription } from '@/lib/subscription'

import { OrganizationInfo } from '../_components/organization-info'
import { ActivityList } from './_components/activity-list'

const ActivityPage = async () => {
  const isPro = await checkSubscription()

  return (
    <div className="w-full">
      <OrganizationInfo isPro={isPro} />
      <Separator className="my-4" />
      <div className="space-y-4">
        <div className="flex items-center text-lg font-semibold text-neutral-700">
          <ActivityIcon className="mr-2 h-6 w-6" />
          <span>Activity</span>
        </div>
        <Suspense fallback={<ActivityList.Skeleton />}>
          <ActivityList />
        </Suspense>
      </div>
    </div>
  )
}

export default ActivityPage
