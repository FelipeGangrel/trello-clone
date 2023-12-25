import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from 'sonner'

import { CardModalProvider, QueryProvider } from '@/components/providers'

type LayoutProps = {
  children: React.ReactNode
}

const PlatformLayout = ({ children }: LayoutProps) => {
  return (
    <ClerkProvider>
      <QueryProvider>
        <Toaster />
        <CardModalProvider />
        {children}
      </QueryProvider>
    </ClerkProvider>
  )
}

export default PlatformLayout
