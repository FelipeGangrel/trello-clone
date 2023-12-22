import { SignIn } from '@clerk/nextjs'

import { frontend } from '@/lib/routes'

const SignInPage = () => {
  return <SignIn path={frontend.signIn()} routing="path" />
}

export default SignInPage
