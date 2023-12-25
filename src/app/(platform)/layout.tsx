import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from 'sonner'

import { CardModalProvider } from '@/components/providers/card-modal-provider'

type LayoutProps = {
  children: React.ReactNode
}

const PlatformLayout = ({ children }: LayoutProps) => {
  return (
    <ClerkProvider>
      <Toaster />
      <CardModalProvider />
      {children}
    </ClerkProvider>
  )
}

export default PlatformLayout
