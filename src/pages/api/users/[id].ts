import databaseQuery from '@/lib/db'
import type { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'

const secret = process.env.JWT_SECRET

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await getToken({ req, secret })

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  //todo: GET to return single user information: name, credit
  // console.log(req.query)
  const userId = req.query.id as string
  // console.log(userId)
  switch (req.method) {
    case 'GET':
      const user = await databaseQuery(
        'SELECT username, greenbay_dollars FROM users WHERE id = ?',
        userId
      )
      console.log(user)
      if (!user.length) {
        return res.status(500).json({ message: 'Internal server error' })
      }
      return res
        .status(200)
        .json({ name: user[0].username, credit: user[0].greenbay_dollars })
  }
}
