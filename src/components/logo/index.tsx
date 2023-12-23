import Image from 'next/image'
import Link from 'next/link'

import { headingFont } from '@/fonts'
import { cn } from '@/lib/utils'

export const Logo = () => {
  return (
    <div className="logo">
      <Link href="/" className="focus-ring inline-block rounded-sm">
        <div className="relative hidden items-center gap-x-2 transition hover:opacity-75 md:flex">
          <Image
            src="/images/logo.svg"
            width={0}
            height={0}
            className="h-auto w-[30px]"
            alt="logo"
          />
          <p
            className={cn(
              'pb-1 text-lg text-neutral-700',
              headingFont.className
            )}
          >
            Taskify
          </p>
        </div>
      </Link>
    </div>
  )
}
