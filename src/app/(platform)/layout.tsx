import { ClerkProvider } from '@clerk/nextjs'

type LayoutProps = {
  readonly children: React.ReactNode
}

const PlatformLayout = ({ children }: LayoutProps) => {
  return <ClerkProvider>{children}</ClerkProvider>
}

export default PlatformLayout
