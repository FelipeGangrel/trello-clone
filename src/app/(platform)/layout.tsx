import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from 'sonner'

type LayoutProps = {
  children: React.ReactNode
}

const PlatformLayout = ({ children }: LayoutProps) => {
  return (
    <ClerkProvider>
      <Toaster />
      {children}
    </ClerkProvider>
  )
}

export default PlatformLayout
