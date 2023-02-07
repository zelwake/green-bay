import Login from '@/components/Login'
import { useSession } from 'next-auth/react'

export default function Home() {
  const { data: token, status } = useSession()
  // console.log(status)
  function testToken() {
    if (token) {
      fetch('/api/haveToken')
        .then((res) => {
          console.log(res)
          return res.json()
        })
        .then((data) => console.log(data))
    }
  }

  return (
    <div className="p-8 h-screen bg-gray-300">
      <Login />
      <h1 className="text-6xl bg-green-200 my-2 px-2 py-4 text-green-800 font-bold underline">
        Green Bay
      </h1>
      <p className="text-xl font-medium">Here you would see listed items</p>
      <button onClick={testToken}>Test Token</button>
    </div>
  )
}
