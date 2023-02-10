import databaseQuery from '@/lib/db'
import checkToken from '@/scripts/checkToken'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await checkToken(req)

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const userId = req.query.id as string
  switch (req.method) {
    case 'GET':
      const user = await databaseQuery(
        'SELECT username, greenbay_dollars FROM users WHERE id = ?',
        userId
      )
      if (!user.length) {
        return res.status(500).json({ message: 'Internal server error' })
      }
      return res
        .status(200)
        .json({ name: user[0].username, credit: user[0].greenbay_dollars })
  }
}
