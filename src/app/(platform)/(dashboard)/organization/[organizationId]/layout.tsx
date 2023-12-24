import { OrganizationWatcher } from './_components'

type LayoutProps = {
  children: React.ReactNode
}

const OrganizationIdLayout = ({ children }: LayoutProps) => {
  return (
    <>
      <OrganizationWatcher />
      {children}
    </>
  )
}

export default OrganizationIdLayout
