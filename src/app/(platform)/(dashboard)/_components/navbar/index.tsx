import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'
import { Plus } from 'lucide-react'

import { Logo } from '@/components/logo'
import { Button } from '@/components/ui'
import { frontend } from '@/lib/routes'

const Navbar = () => {
  return (
    <nav className="out fixed top-0 z-50 w-full border-b bg-background shadow-sm">
      {/* TODO: Create mobile sidebar */}
      <div className="container flex h-14 items-center gap-x-4">
        <div className="hidden md:flex">
          <Logo />
        </div>
        <Button size="xs" className="hidden md:block">
          Create
        </Button>
        <Button className="block md:hidden">
          <Plus size={16} />
        </Button>
        <div className="ml-auto flex items-center gap-x-4">
          <OrganizationSwitcher
            hidePersonal
            afterSelectOrganizationUrl={frontend.organization(':id')}
            afterCreateOrganizationUrl={frontend.organization(':id')}
            afterLeaveOrganizationUrl={frontend.selectOrganization()}
            appearance={{
              elements: {
                rootBox: 'flex justify-center items-center',
                organizationSwitcherTrigger: 'focus-ring focus:shadow-none',
                organizationSwitcherPopoverCard:
                  'bg-background border shadow-md rounded-md',
              },
            }}
          />
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                userButtonTrigger: 'focus-ring focus:shadow-none',
                userButtonPopoverCard:
                  'bg-background border shadow-md rounded-md',
              },
            }}
          />
        </div>
      </div>
    </nav>
  )
}

export { Navbar }
