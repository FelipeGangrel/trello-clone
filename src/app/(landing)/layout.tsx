import { Footer, Navbar } from './_components'

type LayoutProps = {
  children: React.ReactNode
}

const LandingLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="h-full bg-slate-100">
      <Navbar />
      <main className="pb-20 pt-40">{children}</main>
      <Footer />
    </div>
  )
}

export default LandingLayout
