export interface ItemList {
  id: number
  name: string
  photo_url: string
  price: number
}

export interface SingleItem {
  name: string
  description: string
  photo_url: string
  price: number
  seller: string
  buyer: string | null
}
