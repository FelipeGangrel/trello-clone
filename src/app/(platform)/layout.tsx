import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from 'sonner'

import { ModalProvider, QueryProvider } from '@/components/providers'

type LayoutProps = {
  children: React.ReactNode
}

const PlatformLayout = ({ children }: LayoutProps) => {
  return (
    <ClerkProvider>
      <QueryProvider>
        <Toaster />
        <ModalProvider />
        {children}
      </QueryProvider>
    </ClerkProvider>
  )
}

export default PlatformLayout
