import { useEffect, useState } from 'react'
import { ItemList } from 'types/interfaces'

export const useFetchItems = (): ItemList[] => {
  const [itemList, setItemList] = useState<ItemList[]>([])

  useEffect(() => {
    fetch(`/api/items`)
      .then((res) => {
        if (res.status === 401) throw new Error('Unauthorized')
        return res.json()
      })
      .then((data) => setItemList(data.items))
      .catch((err) => console.log(err))
  }, [])

  return itemList
}
