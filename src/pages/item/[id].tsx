import PageLayout from '@/components/Layout/Page'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

interface ItemType {
  name: string
  description: string
  photo_url: string
  price: number
  seller: string
  buyer: string | null
}

const Item = () => {
  const router = useRouter()
  const currentId: string = router.query.id as string

  const item = useLoadItem(currentId)

  const [errorMessage, setErrorMessage] = useState<string>('')
  const buyItem = (event: React.MouseEvent<HTMLLIElement>) => {
    event.preventDefault()
    setErrorMessage('')
    fetch(`/api/items/${currentId}`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(item),
    })
      .then((res) => res.json())
      .then((data) => {
        const { error, message } = data
        if (message) {
          console.log('message: ' + message)
          router.reload()
        }
        if (error) {
          setErrorMessage(error)
        }
      })
      .catch((err) => console.log(err))
  }

  if (item) {
    return (
      <PageLayout>
        <ul className="ml-8 pt-2">
          <li>Name: {item.name}</li>
          <li>Description: {item.description}</li>
          <li>Image: {item.photo_url}</li>
          <li>Price: {item.price}&nbsp;$G</li>
          <li>Seller: {item.seller}</li>
          {item.buyer ? (
            <li>Buyer: {item.buyer}</li>
          ) : (
            <li onClick={buyItem} className="cursor-pointer">
              Buy item
            </li>
          )}
          {errorMessage && <p>{errorMessage}</p>}
        </ul>
      </PageLayout>
    )
  }

  return (
    <PageLayout>
      <p className="ml-8 pt-2">No item</p>
    </PageLayout>
  )
}

export default Item

function useLoadItem(id: string): ItemType | null {
  const [item, setItem] = useState<ItemType | null>(null)

  useEffect(() => {
    fetch(`/api/items/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setItem(data.item)
      })
      .catch((err) => console.log(err))
  }, [id])

  return item
}
