import { Navbar } from './_components'

type LayoutProps = {
  children: React.ReactNode
}

const DashboardLayout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div>{children}</div>
    </div>
  )
}

export default DashboardLayout
