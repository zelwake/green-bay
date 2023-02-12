import databaseQuery from '@/lib/db'
import checkToken from '@/scripts/checkToken'
import validateUrl from '@/scripts/validateUrl'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = await checkToken(req)
  if (!token) return res.status(401).json({ error: 'Unauthorized' })
  if (req.method === 'GET') {
    try {
      const items = await databaseQuery(
        'SELECT id, name, photo_url, price FROM items WHERE sellable = 1',
        ''
      )

      return res.status(200).json({ items })
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Internal server error' })
    }
  }

  if (req.method === 'POST') {
    const { name, description, photoUrl, price } = req.body

    if (!name || !description || !photoUrl || !price)
      return res.status(400).json({ error: 'Missing one or more information' })

    if (price <= 0 || price != Math.round(price))
      return res.status(400).json({ error: 'Price must be positive integer' })

    if (!validateUrl(photoUrl))
      return res.status(400).json({ error: 'Url must be valid' })

    try {
      const insert = await databaseQuery('INSERT INTO items SET ?', {
        name,
        description,
        photo_url: photoUrl,
        price: parseInt(price),
        seller: parseInt(token.userId),
      })

      return res.status(201).json({ item: insert.insertId })
    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Internal server error' })
    }
  }
  return res.status(405).json({ error: 'Method not allowed' })
}
