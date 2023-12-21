import { OrganizationList } from '@clerk/nextjs'

import { frontend } from '@/lib/routes'

const SelectOrgPage = () => {
  return (
    <OrganizationList
      hidePersonal
      afterSelectOrganizationUrl={frontend.organization(':id')}
      afterCreateOrganizationUrl={frontend.organization(':id')}
    />
  )
}

export default SelectOrgPage
