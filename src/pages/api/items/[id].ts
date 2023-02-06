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
  // only when logged user has enough green dollars
  // on successfully buying item, subtract amount from buyer's dollars, mark the item as sold and add buyer's name
  res.status(200).json({ name: 'John Doe' })
}
