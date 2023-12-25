const baseUrl = process.env.NEXT_PUBLIC_APP_URL

export const frontend = {
  signIn: () => process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
  signUp: () => process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL,
  selectOrganization: () => '/select-org',
  organization: (id: string) => `/organization/${id}`,
  organizationActivity: (id: string) => `/organization/${id}/activity`,
  organizationSettings: (id: string) => `/organization/${id}/settings`,
  organizationBilling: (id: string) => `/organization/${id}/billing`,
  board: (id: string) => `/board/${id}`,
}

export const prependAppUrl = (endpoint: string) => {
  return `${baseUrl}${endpoint}`
}

export const api = {
  fetchCard: (id: string) => `/api/cards/${id}`,
  fetchCardLogs: (id: string) => `/api/cards/${id}/logs`,
}
