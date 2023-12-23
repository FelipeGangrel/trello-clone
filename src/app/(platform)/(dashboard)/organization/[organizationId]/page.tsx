import { Separator } from '@/components/ui'

import { BoardList, Info } from './_components'

const OrganizationPage = async () => {
  return (
    <div className="mb-20 w-full">
      <Info />
      <Separator className="my-4" />
      <div className="px-2 md:px-4">
        <BoardList />
      </div>
    </div>
  )
}

export default OrganizationPage
