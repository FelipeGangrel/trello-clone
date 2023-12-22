import { OrgWatcher } from './_components'

type LayoutProps = {
  children: React.ReactNode
}

const OrganizationIdLayout = ({ children }: LayoutProps) => {
  return (
    <>
      <OrgWatcher />
      {children}
    </>
  )
}

export default OrganizationIdLayout
