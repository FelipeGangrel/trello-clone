import { Medal } from 'lucide-react'
import { Poppins } from 'next/font/google'
import Link from 'next/link'

import { Button } from '@/components/ui'
import { headingFont } from '@/fonts'
import { frontend } from '@/lib/routes'
import { cn } from '@/lib/utils'

const textFont = Poppins({
  subsets: ['latin'],
  weight: ['300'],
})

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div
        className={cn(
          'flex flex-col items-center justify-center',
          headingFont.className
        )}
      >
        <div className="mb-4 flex items-center rounded-full border bg-amber-100 p-4 uppercase text-amber-700 shadow-sm">
          <Medal size={24} className="mr-2" />
          <span>The best task manager</span>
        </div>
        <h1 className="mb-6 text-center text-3xl text-neutral-800 md:text-6xl">
          Taskify helps your team
        </h1>
        <div className="w-fit rounded-md bg-gradient-to-r from-fuchsia-600 to-pink-600 p-2 px-4 text-3xl text-white md:text-6xl">
          work forward.
        </div>
      </div>
      <div
        className={cn(
          'mx-auto mt-4 max-w-xs text-center text-sm text-neutral-400 md:max-w-2xl md:text-xl',
          textFont.className
        )}
      >
        Collaborate, manage projects, and reach new productivity peaks. From
        high rises to the home office, the way your team works is unique -
        accomplish it all with Taskify.
      </div>
      <Button asChild className="mt-6">
        <Link href={frontend.signUp()}>Get Taskify for free</Link>
      </Button>
    </div>
  )
}

export default LandingPage
