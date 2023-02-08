import Login from '@/components/Login'
import { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { useCallback, useEffect, useState } from 'react'

const Home: NextPage = () => {
  const { data: session } = useSession()
  function testToken() {
    // if (session) {
    fetch('/api/haveToken')
      .then((res) => res.json())
      .then((data) => console.log(data))
    // }
  }

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
    <div className="p-8 h-screen bg-gray-300">
      <Login user={user} />
      <h1 className="text-6xl bg-green-200 my-2 px-2 py-4 text-green-800 font-bold underline">
        Green Bay
      </h1>
      <p className="text-xl font-medium">Here you would see listed items</p>
      <button onClick={testToken}>Test Token</button>
    </div>
  )
}

export default Home
