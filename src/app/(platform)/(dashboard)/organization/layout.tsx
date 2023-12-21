type LayoutProps = {
  children: React.ReactNode
}

const OrganizationLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <main className="container pt-20 md:pt-24">
      <div className="flex gap-x-7">
        <div className="hidden w-64 shrink-0 md:flex">{/* Sidebar */}</div>
        {children}
      </div>
    </main>
  )
}

export default OrganizationLayout
