'use client'

import { useQueryClient } from '@tanstack/react-query'
import { LayoutIcon } from 'lucide-react'
import { useParams } from 'next/navigation'
import type { ElementRef } from 'react'
import { useRef, useState } from 'react'

import { FormField } from '@/components/form'
import { Skeleton } from '@/components/ui'
import type { CardWithList } from '@/types/db'

type HeaderProps = {
  card: CardWithList
}

export const Header = ({ card }: HeaderProps) => {
  const queryClient = useQueryClient()
  const params = useParams()

  const inputRef = useRef<ElementRef<'input'>>(null)

  const [title, setTitle] = useState(card.title)

  const onBlur = () => {
    inputRef.current?.form?.requestSubmit()
  }

  const handleFormAction = (formData: FormData) => {
    const title = formData.get('title') as string

    if (title === card.title) {
      return
    }
  }

  return (
    <div className="mb-6 flex w-full items-start gap-x-3">
      <LayoutIcon className="mt-1 h-5 w-5 text-neutral-700" />
      <div className="w-full">
        <form action={handleFormAction}>
          <FormField
            ref={inputRef}
            onBlur={onBlur}
            id="title"
            defaultValue={title}
            className="relative -left-1.5 mb-0.5 w-[95%] truncate border-transparent bg-transparent px-1 text-xl font-semibold text-neutral-700 focus-visible:border-input focus-visible:bg-white"
          />
        </form>
        <p className="text-sm text-muted-foreground">
          in list <span className="underline">{card.list.title}</span>
        </p>
      </div>
    </div>
  )
}

Header.Skeleton = function HeaderSkeleton() {
  return (
    <div className="mb-6 flex items-start gap-x-3">
      <Skeleton className="mt-1 h-6 w-6 bg-neutral-200" />
      <div>
        <Skeleton className="mb-1 h-6 w-24 bg-neutral-200" />
        <Skeleton className="h-4 w-12 bg-neutral-200" />
      </div>
    </div>
  )
}
