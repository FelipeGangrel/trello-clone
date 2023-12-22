import { ClerkProvider } from '@clerk/nextjs'

type LayoutProps = {
  children: React.ReactNode
}

const PlatformLayout = ({ children }: LayoutProps) => {
  return <ClerkProvider>{children}</ClerkProvider>
}

export default PlatformLayout
