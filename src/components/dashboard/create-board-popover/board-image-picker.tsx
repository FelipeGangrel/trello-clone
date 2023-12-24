'use client'

import { CheckIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useFormStatus } from 'react-dom'

import { FormErrors } from '@/components/form'
import { Skeleton } from '@/components/ui'
import { FALLBACK_UNSPLASH_IMAGES } from '@/constants/images'
import { serializeImage, unsplash } from '@/lib/unsplash'
import { cn } from '@/lib/utils'
import { UnsplashImage } from '@/types/common'

type BoardImagePickerProps = {
  id: string
  errors?: Record<string, string[] | undefined>
}

const TRELLO_COLLECTION_ID = '317099'
const IMAGES_COUNT = 9

export const BoardImagePicker = ({ id, errors }: BoardImagePickerProps) => {
  const { pending } = useFormStatus()

  const [images, setImages] = useState<UnsplashImage[]>(
    FALLBACK_UNSPLASH_IMAGES
  )
  const [isLoading, setIsLoading] = useState(true)
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null)

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const result = await unsplash.photos.getRandom({
          collectionIds: [TRELLO_COLLECTION_ID],
          count: IMAGES_COUNT,
        })

        if (result.response) {
          const images = result.response as UnsplashImage[]
          setImages(images)
        } else {
          console.log('error', 'failed to fetch images from unsplash')
        }
      } catch (error) {
        setImages(FALLBACK_UNSPLASH_IMAGES)
      } finally {
        setIsLoading(false)
      }
    }

    fetchImages()
  }, [])

  if (isLoading) {
    return <BoardImagePicker.Skeleton />
  }

  return (
    <div className="relative">
      <div className="mb-2 grid grid-cols-3 gap-2">
        {images.map((image) => (
          <div
            key={image.id}
            className={cn(
              'group relative aspect-video cursor-pointer rounded-sm bg-muted transition hover:opacity-75',
              pending && 'cursor-auto opacity-50 hover:opacity-50'
            )}
            onClick={() => {
              if (pending) return
              setSelectedImageId(image.id)
            }}
          >
            <Image
              src={image.urls.thumb}
              alt={image.alt_description}
              fill
              className="rounded-sm object-cover"
              sizes={'auto'}
            />
            <input
              type="radio"
              id={`radio-${id}-${image.id}`}
              name={id}
              value={serializeImage(image)}
              checked={selectedImageId === image.id}
              disabled={pending}
              className="hidden"
              readOnly
            />
            {selectedImageId === image.id && (
              <div className="absolute inset-y-0 flex h-full w-full items-center justify-center rounded-sm bg-black/30">
                <CheckIcon className="h-4 w-4 text-white" />
              </div>
            )}
            <Link
              href={image.links.html}
              target="_blank"
              className="absolute bottom-0 w-full truncate bg-black/50 p-1 text-[10px] text-white opacity-0 hover:underline group-hover:opacity-100"
            >
              {image.user.name}
            </Link>
          </div>
        ))}
      </div>
      <FormErrors id={id} errors={errors} />
    </div>
  )
}

BoardImagePicker.Skeleton = function BoardImagePickerSkeleton() {
  return (
    <div className="relative">
      <div className="mb-2 grid grid-cols-3 gap-2">
        {[...Array(IMAGES_COUNT)].map((_, index) => (
          <Skeleton key={index} className="rounded-m aspect-video" />
        ))}
      </div>
    </div>
  )
}
