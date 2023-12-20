import { Medal } from 'lucide-react'

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <div className="mb-4 flex items-center rounded-full border bg-amber-100 p-4 uppercase text-amber-700 shadow-sm">
          <Medal size={24} className="mr-2" />
          <span>The best task manager</span>
        </div>
        <h1 className="mb-6 text-center text-3xl text-neutral-800 md:text-6xl">
          Taskify helps your team
        </h1>
        <div className="w-fit rounded-md bg-gradient-to-r from-fuchsia-600 to-pink-600 p-2 px-4 text-3xl text-white md:text-6xl">
          work forward.
        </div>
      </div>
      <div className="mx-auto mt-4 max-w-xs text-center text-sm text-neutral-400 md:max-w-2xl md:text-xl">
        Collaborate, manage projects, and reach new productivity peaks. From
        high rises to the home office, the way your team works is unique -
        accomplish it all with Taskify.
      </div>
    </div>
  )
}

export default LandingPage
