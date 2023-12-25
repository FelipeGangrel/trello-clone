import type { AuditLog } from '@prisma/client'
import { ActivityIcon } from 'lucide-react'

import { ActivityItem } from '@/components/activity-item'
import { Skeleton } from '@/components/ui'

type ActivityProps = {
  auditLogs: AuditLog[]
}

export const Activity = ({ auditLogs }: ActivityProps) => {
  return (
    <div className="flex w-full items-start gap-x-3">
      <ActivityIcon className="mt-0.5 h-5 w-5 text-neutral-700" />
      <div className="w-full">
        <p className="mb-2 font-semibold text-neutral-700">Activity</p>
        <ol className="mt-2 space-y-4">
          {auditLogs.map((log) => (
            <ActivityItem key={log.id} log={log} />
          ))}
        </ol>
      </div>
    </div>
  )
}

Activity.Skeleton = function ActivitySkeleton() {
  return (
    <div className="flex w-full items-start gap-x-3">
      <Skeleton className="w- h-6" />
      <div className="w-full">
        <Skeleton className="mb-2 h-6 w-2" />
        <Skeleton className="w-ful h-10" />
      </div>
    </div>
  )
}
