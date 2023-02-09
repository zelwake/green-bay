import { Session } from 'next-auth'
import { signIn, signOut } from 'next-auth/react'

export default function Component({
  user,
  session,
}: {
  user: { name: string; credit: number } | null
  session: Session | null
}) {
  if (session) {
    return (
      <div className="flex pl-8 gap-8 text-xl font-bold text-green-800">
        <p>Signed in as {session.user?.name}</p>
        <p>Current balance is {user?.credit}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    )
  }
  return (
    <div className="flex pl-8 gap-8 text-xl font-bold text-green-800">
      <button onClick={() => signIn()}>Sign in</button>
    </div>
  )
}
