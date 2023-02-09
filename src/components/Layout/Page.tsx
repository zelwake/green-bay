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
          return res.json()
        })
        .then((data) => {
          setUser(data)
        })
        .catch((err) => console.log(err))
    }
  }, [session])

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  return (
    <div className="py-3 px-2 min-h-screen bg-gray-300">
      <Login user={user} session={session} />
      {children}
    </div>
  )
}

export default PageLayout
