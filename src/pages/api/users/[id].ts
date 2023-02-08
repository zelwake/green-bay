import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
  credit: number
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  //todo: GET to return single user information: name, credit

  res.status(200).json({ name: 'John Doe', credit: 50 })
}
