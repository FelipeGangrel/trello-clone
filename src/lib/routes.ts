import type { Id } from '@/types/common'

const frontend = {
  signIn: () => process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
  signUp: () => process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL,
  selectOrganization: () => '/select-org',
  organization: (id: Id) => `/organization/${id}`,
}

export { frontend }
