import { signIn, signOut } from 'next-auth/react'

export default function Component({
  user,
  session,
}: {
  user: { name: string; credit: number } | null
  session: any
}) {
  // const { data: session } = useSession()
  if (session) {
    return (
      <div className="flex gap-3">
        <p>Signed in as {session.user?.name}</p>
        <p>Current balance is {user?.credit}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    )
  }
  return (
    <>
      <p>Not signed in</p>
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}
