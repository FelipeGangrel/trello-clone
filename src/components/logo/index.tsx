import Image from 'next/image'
import Link from 'next/link'

import { headingFont } from '@/fonts'
import { cn } from '@/lib/utils'

const Logo = () => {
  return (
    <div className="logo">
      <Link href="/">
        <div className="hidden items-center transition hover:opacity-75 md:flex">
          <Image src="/images/logo.png" width={30} height={30} alt="logo" />
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

export { Logo }
