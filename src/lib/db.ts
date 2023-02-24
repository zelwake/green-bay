import { createConnection } from 'mysql2'

const db = createConnection(process.env.DATABASE_URL)

db.connect((err) => {
  err
    ? console.log('Cannot connect to the database', err)
    : console.log('Connected to database')
})

async function databaseQuery(
  query: string,
  params:
    | string[]
    | string
    | number
    | { username: string; password: string; greenbay_dollars: number }
    | {
        name: string
        description: string
        photo_url: string
        price: number
        seller: number
      }
): Promise<any> {
  return new Promise((resolve, reject) => {
    db.query(query, params, (err, result) => {
      err ? reject(err) : resolve(result)
    })
  })
}

export default databaseQuery
