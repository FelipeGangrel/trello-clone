import type { Task } from '@prisma/client'
import { CheckSquareIcon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import { createTask } from '@/actions'
import { Progress, Skeleton } from '@/components/ui'
import { useAction } from '@/hooks'

type TasksProps = {
  tasks: Task[]
}

export const Tasks = ({ tasks }: TasksProps) => {
  const [currentTasks, setCurrentTasks] = useState(tasks)

  const { execute: executeCreate } = useAction(createTask, {
    onSuccess: (task) => {
      toast.success(`Task "${task.title}" created`)
      setCurrentTasks((prev) => [...prev, task])
    },
    onError: (error) => {
      toast.error(error)
    },
  })

  return (
    <>
      <div className="flex w-full items-start gap-x-3">
        <CheckSquareIcon className="mt-0.5 h-5 w-5 text-neutral-700" />
        <div className="w-full">
          <p className="mb-2 font-semibold text-neutral-700">Tasks</p>
          <Progress
            value={80}
            indicatorClassName="bg-slate-300"
            className="h-2 bg-slate-100"
          />
        </div>
      </div>
    </>
  )
}

Tasks.Skeleton = function TasksSkeleton() {
  return (
    <div className="flex w-full items-start gap-x-3">
      <Skeleton className="h-6 w-6" />
      <div className="w-full">
        <Skeleton className="mb-2 h-6 w-24" />
        <div className="mb-2">
          <Skeleton className="h-2 w-full" />
        </div>
        <div className="flex flex-col space-y-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex space-x-2">
              <Skeleton className="h-6 w-6" />
              <Skeleton className="h-6 w-40" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
