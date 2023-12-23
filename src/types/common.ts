import { FALLBACK_UNSPLASH_IMAGES } from '@/constants/images'

export type Id = string | number

export type UnsplashImage = (typeof FALLBACK_UNSPLASH_IMAGES)[0]

export type UnsplashImageJSON = {
  id: string
  urls: {
    thumb: string
    full: string
  }
  links: {
    html: string
  }
  user: {
    name: string
  }
}
