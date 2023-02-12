import PageLayout from '@/components/Layout/Page'
import { NextPage } from 'next'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ItemList } from 'types/interfaces'

const Home: NextPage = () => {
  const items = useFetchItems()

  return (
    <PageLayout>
      <div className="px-8 bg-gray-300">
        <h1 className="text-6xl bg-green-200 my-2 px-2 py-4 text-green-800 font-bold underline">
          Green Bay
        </h1>
        <h2 className="text-3xl mb-2">List of items for sale:</h2>
        <div className="text-xl font-medium grid grid-cols-2">
          {items.map((item) => (
            <div key={item.id} className="max-w-md">
              <h5>
                <Link href={`/item/${item.id}`}>{item.name}</Link>
              </h5>
              <p>{item.photo_url}</p>
              <p>{item.price}</p>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  )
}

export default Home

export const useFetchItems = (): ItemList[] => {
  const [itemList, setItemList] = useState<ItemList[]>([])

  useEffect(() => {
    fetch(`/api/items`)
      .then((res) => res.json())
      .then((data) => setItemList(data.items))
      .catch((err) => console.log(err))
  }, [])

  return itemList
}
