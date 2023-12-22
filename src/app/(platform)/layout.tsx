import { ClerkProvider } from '@clerk/nextjs'

type LayoutProps = {
  children: React.ReactNode
}

const PlatformLayout: React.FC<LayoutProps> = ({ children }) => {
  return <ClerkProvider>{children}</ClerkProvider>
}

export default PlatformLayout
