import { OrganizationProfile } from '@clerk/nextjs'

const SettingsPage = () => {
  return (
    <div className="w-full">
      <OrganizationProfile
        appearance={{
          elements: {
            rootBox: 'w-full',
            card: 'w-full shadow-none border border-slate-100',
            navbar: 'border-slate-100',
          },
        }}
      />
    </div>
  )
}

export default SettingsPage
