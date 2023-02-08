import { signIn, signOut, useSession } from 'next-auth/react'

export default function Component({
  user,
}: {
  user: { name: string; credit: number } | null
}) {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        <p>Signed in as {session.user?.name}</p>
        <p>Current balance is {user?.credit}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      <p>Not signed in</p>
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}
