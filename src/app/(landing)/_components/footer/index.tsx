import { Logo } from '@/components/logo'
import { Button } from '@/components/ui'

export const Footer = () => {
  return (
    <div className="fixed bottom-0 w-full border-t bg-slate-100">
      <div className="container flex items-center justify-between py-4">
        <Logo />
        <div className="flex w-full items-center justify-between space-x-4 md:block md:w-auto">
          <Button size="sm" variant="ghost">
            Privacy Policy
          </Button>
          <Button size="sm" variant="ghost">
            Terms of service
          </Button>
        </div>
      </div>
    </div>
  )
}
