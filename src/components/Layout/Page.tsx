import { useSession } from 'next-auth/react'
import { ReactElement, useCallback, useEffect, useState } from 'react'
import Login from '../Login'

const PageLayout = ({ children }: { children: ReactElement }) => {
  const { data: session } = useSession()

  const [user, setUser] = useState<{ name: string; credit: number } | null>(
    null
  )

  const fetchUser = useCallback(() => {
    if (session && session.user) {
      fetch(`/api/users/${session.user.id}`)
        .then((res) => {
          console.log(res)
          return res.json()
        })
        .then((data) => {
          console.log(data)
          setUser(data)
        })
        .catch((err) => console.log(err))
    }
  }, [session])

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  return (
    <>
      <Login user={user} session={session} />
      {children}
    </>
  )
}

export default PageLayout
