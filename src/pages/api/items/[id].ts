import databaseQuery from '@/lib/db'
import checkToken from '@/scripts/checkToken'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query
  if (req.method === 'GET') {
    try {
      const response = await databaseQuery(
        `SELECT name, description, photo_url, price, sell.username as seller, buy.username as buyer 
        FROM Items 
        JOIN Users AS sell ON seller = sell.id 
        LEFT JOIN Users AS buy ON buyer = buy.id 
        WHERE Items.id = ?`,
        id as string
      )
      return res.status(200).json({ item: response.at(0) })
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Internal server error' })
    }
  }

  const token = await checkToken(req)
  if (!token) return res.status(401).json({ error: 'Unauthorized' })

  if (req.method === 'POST') {
    try {
      const findItem = await databaseQuery(
        'SELECT sellable FROM Items WHERE id = ?',
        id as string
      )

      if (!findItem.length)
        return res.status(400).json({ error: 'Item not found' })

      const isSellable = findItem.at(0).sellable

      if (!isSellable)
        return res.status(400).json({ error: 'Item is not for sale' })

      const buyerFunds = (
        await databaseQuery(
          'SELECT greenbay_dollars FROM Users WHERE id = ?',
          token.userId
        )
      ).at(0).greenbay_dollars

      if (buyerFunds < req.body.price)
        return res.status(400).json({ error: 'Insufficient funds' })

      await databaseQuery(
        'UPDATE Items SET sellable = ?, buyer = ? WHERE id = ?',
        ['0', token.userId, id as string]
      )
      await databaseQuery(
        'UPDATE Users SET greenbay_dollars = ? WHERE id = ?',
        [(buyerFunds - req.body.price).toString(), token.userId]
      )
      return res.status(200).json({ message: 'Success' })
    } catch (error) {
      console.log(error)
      return res.status(500).json({ error: 'Internal server error' })
    }
  }
  res.status(405).json({ error: 'Method not allowed' })
}
