import { OrgWatcher } from './_components'

type LayoutProps = {
  children: React.ReactNode
}

const OrganizationIdLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <OrgWatcher />
      {children}
    </>
  )
}

export default OrganizationIdLayout
