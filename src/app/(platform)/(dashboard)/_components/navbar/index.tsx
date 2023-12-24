import { OrganizationSwitcher, UserButton } from '@clerk/nextjs'
import { PlusIcon } from 'lucide-react'

import { CreateBoardPopover } from '@/components/dashboard'
import { Logo } from '@/components/logo'
import { Button } from '@/components/ui'
import { frontend } from '@/lib/routes'

import { MobileSidebar } from '../mobile-sidebar'

export const Navbar = () => {
  return (
    <nav className="out fixed top-0 z-50 w-full border-b bg-background shadow-sm">
      <div className="container flex h-14 items-center gap-x-4">
        <MobileSidebar />
        <div className="hidden md:flex">
          <Logo />
        </div>
        <CreateBoardPopover align="start" side="bottom" sideOffset={10}>
          <Button size="xs" variant="brand" className="hidden md:block">
            Create
          </Button>
        </CreateBoardPopover>
        <CreateBoardPopover>
          <Button size="icon" variant="brand" className="inline-flex md:hidden">
            <PlusIcon />
          </Button>
        </CreateBoardPopover>
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
                  'bg-popover border shadow-md rounded-md',
              },
            }}
          />
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                userButtonTrigger: 'focus-ring focus:shadow-none',
                userButtonPopoverCard: 'bg-popover border shadow-md rounded-md',
              },
            }}
          />
        </div>
      </div>
    </nav>
  )
}
