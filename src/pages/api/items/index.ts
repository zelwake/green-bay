import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  //todo: GET to return all sellable items with name, photo url and price OR nothing if such item doesn't exists

  //todo: POST to buy an item
  res.status(200).json({ name: 'John Doe' })
}
