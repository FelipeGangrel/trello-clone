type LayoutProps = {
  children: React.ReactNode
}

const ClerkLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-100">
      {children}
    </div>
  )
}

export default ClerkLayout
