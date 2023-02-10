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
        FROM items 
        JOIN users AS sell ON seller = sell.id 
        LEFT JOIN users AS buy ON buyer = buy.id 
        WHERE items.id = ?`,
        id as string
      )
      return res.status(200).json({ item: response.at(0) })
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Internal server error' })
    }
  }

  const token = await checkToken(req)
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  if (req.method === 'POST') {
    try {
      const isSellable = (
        await databaseQuery(
          'SELECT sellable FROM items WHERE id = ?',
          id as string
        )
      ).at(0).sellable

      if (!isSellable) {
        return res.status(400).json({ error: 'Item is not for sale' })
      }

      const buyerFunds = (
        await databaseQuery(
          'SELECT greenbay_dollars FROM users WHERE id = ?',
          token.userId
        )
      ).at(0).greenbay_dollars

      if (buyerFunds < req.body.price) {
        return res.status(400).json({ error: 'Insufficient funds' })
      }

      await databaseQuery(
        'UPDATE items SET sellable = ?, buyer = ? WHERE id = ?',
        ['0', token.userId, id as string]
      )
      await databaseQuery(
        'UPDATE users SET greenbay_dollars = ? WHERE id = ?',
        [(buyerFunds - req.body.price).toString(), token.userId]
      )
      return res.status(200).json({ message: token.userName })
    } catch (error) {
      console.log(error)
      return res.status(500).json({ error: 'Internal server error' })
    }
  }
  // on successfully buying item, subtract amount from buyer's dollars, mark the item as sold and add buyer's name
  res.status(200).json({ name: 'John Doe' })
}
