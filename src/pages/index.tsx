import PageLayout from '@/components/Layout/Page'
import { useFetchItems } from '@/scripts/hooks/useFetchItems'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

const Home = () => {
  const items = useFetchItems()

  const { data: session } = useSession()

  return (
    <PageLayout>
      <div className="px-8 bg-gray-300">
        <h1 className="text-6xl bg-green-200 my-2 px-2 py-4 text-green-800 font-bold underline">
          Green Bay
        </h1>
        {session ? (
          <>
            <h2 className="text-3xl mb-2">List of items for sale:</h2>
            <ul className="text-xl font-medium grid grid-cols-2">
              {items.map((item) => (
                <li key={item.id} className="max-w-md">
                  <h5>
                    <Link href={`/item/${item.id}`}>{item.name}</Link>
                  </h5>
                  <p>{item.photo_url}</p>
                  <p>{item.price}</p>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <h2 className="text-3xl mb-2">
            You must be logged in to see items for sale
          </h2>
        )}
      </div>
    </PageLayout>
  )
}

export default Home
