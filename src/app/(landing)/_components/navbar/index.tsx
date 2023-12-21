import Link from 'next/link'

import { Logo } from '@/components/logo'
import { Button } from '@/components/ui'
import { frontend } from '@/lib/routes'

const Navbar = () => {
  return (
    <div className="fixed top-0 w-full border-b bg-background shadow-sm">
      <div className="container flex h-14 items-center justify-between">
        <Logo />
        <div className="flex w-full items-center justify-between space-x-4 md:block md:w-auto">
          <Button size="sm" variant="outline" asChild>
            <Link href={frontend.signIn()}>Sign in</Link>
          </Button>
          <Button size="sm" asChild>
            <Link href={frontend.signUp()}>Get Taskify for free</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export { Navbar }
