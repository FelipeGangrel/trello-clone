import { AuditLog } from '@prisma/client'
import { format } from 'date-fns'

import { Avatar } from '@/components/ui'
import { generateLogMessage } from '@/lib/audit-log'

interface ActivityItemProps {
  log: AuditLog
}

export const ActivityItem = ({ log }: ActivityItemProps) => {
  return (
    <li className="flex items-center gap-x-2">
      <Avatar.Root className="h-8 w-8">
        <Avatar.Image src={log.userImage} />
      </Avatar.Root>
      <div className="flex flex-col space-y-0.5">
        <p className="text-sm text-muted-foreground">
          <span className="font-semibold text-neutral-700">{log.userName}</span>{' '}
          {generateLogMessage(log)}
        </p>
        <p className="text-xs text-muted-foreground">
          {format(new Date(log.createdAt), "MMM d, yyyy 'at' h:mm a")}
        </p>
      </div>
    </li>
  )
}
