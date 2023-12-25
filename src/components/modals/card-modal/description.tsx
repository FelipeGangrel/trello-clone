import { useQueryClient } from '@tanstack/react-query'
import { AlignLeftIcon } from 'lucide-react'
import { useParams } from 'next/navigation'
import type { ElementRef } from 'react'
import { useRef, useState } from 'react'
import { toast } from 'sonner'
import { useEventListener, useOnClickOutside } from 'usehooks-ts'

import { updateCard } from '@/actions/update-card'
import { FormTextarea, SubmitButton } from '@/components/form'
import { Button, Skeleton } from '@/components/ui'
import { useAction } from '@/hooks'
import type { CardWithList } from '@/types/db'

type DescriptionProps = {
  card: CardWithList
}

export const Description = ({ card }: DescriptionProps) => {
  const params = useParams<{ boardId: string }>()
  const queryClient = useQueryClient()

  const [isEditing, setIsEditing] = useState(false)

  const formRef = useRef<ElementRef<'form'>>(null)
  const textareaRef = useRef<ElementRef<'textarea'>>(null)

  const { execute, fieldErrors } = useAction(updateCard, {
    onSuccess: (card) => {
      queryClient.invalidateQueries({
        queryKey: ['card', card.id],
      })

      toast.success(`Card "${card.title}" updated`)
      disableEditing()
    },
    onError: (error) => {
      toast.error(error)
    },
  })

  const enableEditing = () => {
    setIsEditing(true)
    setTimeout(() => {
      textareaRef.current?.focus()
    })
  }

  const disableEditing = () => {
    setIsEditing(false)
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      disableEditing()
    }
  }

  useEventListener('keydown', onKeyDown)
  useOnClickOutside(formRef, disableEditing)

  const handleFormAction = (formData: FormData) => {
    const description = formData.get('description') as string

    execute({
      id: card.id,
      boardId: params.boardId,
      description,
    })
  }

  return (
    <div className="flex w-full items-start gap-x-3">
      <AlignLeftIcon className="mt-0.5 h-5 w-5 text-neutral-700" />
      <div className="w-full">
        <p className="mb-2 font-semibold text-neutral-700">Description</p>
        {isEditing ? (
          <form action={handleFormAction} ref={formRef} className="space-y-2">
            <FormTextarea
              id="description"
              className="mt-2 w-full"
              placeholder="Add a more detailed description"
              defaultValue={card.description || undefined}
              errors={fieldErrors}
              ref={textareaRef}
            />
            <div className="flex items-center gap-x-2">
              <SubmitButton>Save</SubmitButton>
              <Button
                type="button"
                onClick={disableEditing}
                size="sm"
                variant="ghost"
              >
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <div
            onClick={enableEditing}
            role="button"
            className="min-h-[78px] rounded-md bg-neutral-200 px-3.5 py-3 text-sm font-medium"
          >
            {card.description || 'Add a more detailed description...'}
          </div>
        )}
      </div>
    </div>
  )
}

Description.Skeleton = function DescriptionSkeleton() {
  return (
    <div className="flex w-full items-start gap-x-3">
      <Skeleton className="h-6 w-6 bg-neutral-200" />
      <div className="w-full">
        <Skeleton className="mb-2 h-6 w-24 bg-neutral-200" />
        <Skeleton className="h-[78px] w-full bg-neutral-200" />
      </div>
    </div>
  )
}
