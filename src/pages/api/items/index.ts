import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  //todo: GET to return all sellable items with name, photo url and price OR nothing if such item doesn't exists

  //todo: POST to add new item
  // needs name, description, photo url and price
  // price is positive integer
  // photo url is valid url
  // has all the information
  // save it to database and application shows newly created item
  res.status(200).json({ name: 'John Doe' })
}
