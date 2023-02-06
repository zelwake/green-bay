import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'

type Data = {
  name: string
}

const secret = process.env.JWT_SECRET

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const token = await getToken({ req, secret })
  console.log(token)
  res.status(200).json({ name: 'John Doe' })
}
