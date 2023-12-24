import { createApi } from 'unsplash-js'

import type { UnsplashImage, UnsplashImageJSON } from '@/types/unsplash'

export const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
  fetch: fetch,
})

export function serializeImage(image: UnsplashImage): string {
  const { id, urls, links, user } = image

  return JSON.stringify({
    id,
    urls: {
      thumb: urls.thumb,
      full: urls.full,
    },
    links: {
      html: links.html,
    },
    user: {
      name: user.name,
    },
  } satisfies UnsplashImageJSON)
}

export function parseImageString(value: string): UnsplashImageJSON {
  return JSON.parse(value) as UnsplashImageJSON
}
