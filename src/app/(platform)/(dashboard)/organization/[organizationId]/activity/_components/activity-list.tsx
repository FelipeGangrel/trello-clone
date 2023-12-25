import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

import { ActivityItem } from '@/components/activity-item'
import { Skeleton } from '@/components/ui'
import { db } from '@/lib/db'
import { frontend } from '@/lib/routes'

export const ActivityList = async () => {
  const { orgId } = auth()

  if (!orgId) {
    redirect(frontend.selectOrganization())
  }

  const auditLogs = await db.auditLog.findMany({
    where: { orgId },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <ol className="mt-4 space-y-4">
      <p className="hidden text-center text-xs text-muted-foreground last:block">
        No activity found inside this organization
      </p>
      {auditLogs.map((log) => (
        <ActivityItem key={log.id} log={log} />
      ))}
    </ol>
  )
}

ActivityList.Skeleton = function ActivityListSkeleton() {
  return (
    <ol className="mt-4 space-y-4">
      <Skeleton className="h-14 w-[80%]" />
      <Skeleton className="h-14 w-[50%]" />
      <Skeleton className="h-14 w-[70%]" />
      <Skeleton className="h-14 w-[80%]" />
      <Skeleton className="h-14 w-[75%]" />
    </ol>
  )
}
