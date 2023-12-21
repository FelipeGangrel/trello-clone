import { Navbar } from './_components'

type LayoutProps = {
  children: React.ReactNode
}

const DashboardLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div>{children}</div>
    </div>
  )
}

export default DashboardLayout
