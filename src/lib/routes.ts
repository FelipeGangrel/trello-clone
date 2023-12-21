const frontend = {
  signIn: () => process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
  signUp: () => process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL,
  selectOrganization: () => '/select-org',
  organization: (id: string) => `/organization/${id}`,
}

export { frontend }
