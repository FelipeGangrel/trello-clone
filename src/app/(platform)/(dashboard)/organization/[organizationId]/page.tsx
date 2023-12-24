import { Suspense } from 'react'

import { Separator } from '@/components/ui'

import { BoardList, OrganizationInfo } from './_components'

const OrganizationPage = async () => {
  return (
    <div className="mb-20 w-full">
      <OrganizationInfo />
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
