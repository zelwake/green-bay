import Login from '@/components/Login'
import { useEffect, useState } from 'react'

export default function Home() {
  const [token, setToken] = useState('')

  useEffect(() => {
    const tokenFromLocalStorage = localStorage.getItem('token')
    console.log(tokenFromLocalStorage)
    setToken(tokenFromLocalStorage as string)
  }, [])

  function testToken() {
    fetch('/api/haveToken', {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
  }

  function handleTokenChange(newToken: string) {
    setToken(newToken)
    localStorage.setItem('token', newToken)
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
