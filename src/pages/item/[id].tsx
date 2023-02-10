import PageLayout from '@/components/Layout/Page'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

interface Item {
  name: string
  description: string
  photo_url: string
  price: number
  seller: string
  buyer: string | null
}

const Item = () => {
  //todo: show item with name, description, price, photo, who is seller and if bought, who was it
  const router = useRouter()
  const [item, setItem] = useState<Item | null>(null)

  useEffect(() => {
    fetch(`/api/items/${router.query.id}`)
      .then((res) => res.json())
      .then((data) => {
        setItem(data.item)
      })
  }, [router.query.id])

  const buyItem = (event: React.MouseEvent<HTMLLIElement>) => {
    event.preventDefault()
    console.log('Bought!')
  }

  if (item) {
    return (
      <PageLayout>
        <ul className="pl-8 pt-2">
          <li>Name: {item.name}</li>
          <li>Description: {item.description}</li>
          <li>
            Image: {item.photo_url}
            {/* <Image
              src={item.photo_url}
              alt="Item image"
              width={20}
              height={20}
            /> */}
          </li>
          <li>Price: {item.price}&nbsp;$G</li>
          <li>Seller: {item.seller}</li>
          {item.buyer ? (
            <li>Buyer: {item.buyer}</li>
          ) : (
            <li onClick={buyItem} className="cursor-pointer">
              Buy item
            </li>
          )}
        </ul>
      </PageLayout>
    )
  }

  return <p>No item</p>
}

export default Item
