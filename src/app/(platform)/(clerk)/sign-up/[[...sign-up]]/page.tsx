import { SignUp } from '@clerk/nextjs'

import { frontend } from '@/lib/routes'

const SignUpPage = () => {
  return <SignUp path={frontend.signUp()} routing="path" />
}

export default SignUpPage
