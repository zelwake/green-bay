import checkToken from '@/scripts/checkToken'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await checkToken(req)
  console.log(token)
  res.status(200).json({ token })
}
