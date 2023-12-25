import { Sidebar } from '../_components'

type LayoutProps = {
  children: React.ReactNode
}

const OrganizationLayout = ({ children }: LayoutProps) => {
  return (
    <main className="container pt-20 md:pt-24">
      <div className="flex gap-x-7">
        <div
          id="sidebar-wrapper"
          className="sticky top-[96px] hidden w-64 shrink-0 self-start md:flex"
        >
          <Sidebar />
        </div>
        {children}
      </div>
    </main>
  )
}

export default OrganizationLayout
