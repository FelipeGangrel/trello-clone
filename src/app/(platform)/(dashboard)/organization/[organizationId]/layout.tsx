import { auth } from '@clerk/nextjs'
import { startCase } from 'lodash'

import { OrganizationWatcher } from './_components'

type LayoutProps = {
  children: React.ReactNode
}

export async function generateMetadata() {
  const { orgSlug } = auth()

  return {
    title: startCase(orgSlug || 'organization'),
  }
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
