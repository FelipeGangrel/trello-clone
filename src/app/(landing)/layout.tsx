import { Footer, Navbar } from './_components'

type LayoutProps = {
  readonly children: React.ReactNode
}

const LandingLayout = ({ children }: LayoutProps) => {
  return (
    <div className="h-full bg-slate-100">
      <Navbar />
      <main className="pb-20 pt-40">{children}</main>
      <Footer />
    </div>
  )
}

export default LandingLayout
