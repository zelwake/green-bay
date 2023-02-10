import databaseQuery from '@/lib/db'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //todo: GET to return single item information: name, description, photo url, price, sellers name and if bought also buyer's name
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

  //todo: POST to buy an item
  // only when logged user has enough green dollars
  // on successfully buying item, subtract amount from buyer's dollars, mark the item as sold and add buyer's name
  res.status(200).json({ name: 'John Doe' })
}
