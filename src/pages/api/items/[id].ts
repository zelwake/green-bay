import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  //todo: GET to return single item information: name, description, photo url, price, sellers name and if bought also buyer's name

  //todo: POST to buy an item
  res.status(200).json({ name: 'John Doe' })
}
