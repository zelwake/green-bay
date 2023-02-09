import databaseQuery from '@/lib/db'
import checkToken from '@/scripts/checkToken'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //todo: GET to return all sellable items with name, photo url and price OR nothing if such item doesn't exists

  const token = await checkToken({ req })
  if (!token) return res.status(401).json({ error: 'Unauthorized' })
  //todo: POST to add new item
  if (req.method === 'POST') {
    const { name, description, photoUrl, price } = req.body
    // needs name, description, photo url and price
    if (!name || !description || !photoUrl || !price)
      return res.status(400).json({ error: 'Missing one or more information' })
    // price is positive integer
    if (price <= 0 || price != Math.round(price))
      return res.status(400).json({ error: 'Price must be positive integer' })
    // photo url is valid url
    // save it to database and application shows newly created item
    await databaseQuery('INSERT INTO items SET ?', {
      name,
      description,
      photo_url: photoUrl,
      price: parseInt(price),
      seller: parseInt(token.userId),
    })
      .then((insert) => {
        console.log(insert)
        res.status(201).json({ item: insert.insertId })
      })
      .catch((err) => {
        console.log(err)
        res.status(500).json({ error: 'Internal server error' })
      })
  }
  // res.status(200).json({ name: 'John Doe' })
}
