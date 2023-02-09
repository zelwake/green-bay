import PageLayout from '@/components/Layout/Page'
import { NextPage } from 'next'

const Home: NextPage = () => {
  function testToken() {
    fetch('/api/haveToken')
      .then((res) => res.json())
      .then((data) => console.log(data))
  }

  return (
    <PageLayout>
      <div className="p-8 bg-gray-300">
        {/* <Login user={user} /> */}
        <h1 className="text-6xl bg-green-200 my-2 px-2 py-4 text-green-800 font-bold underline">
          Green Bay
        </h1>
        <p className="text-xl font-medium">Here you would see listed items</p>
        <button onClick={testToken}>Test Token</button>
      </div>
    </PageLayout>
  )
}

export default Home
