import { createConnection } from 'mysql2'

const db = createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
})

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
    | { username: string; password: string; greenbay_dollars: number }
): Promise<any> {
  return new Promise((resolve, reject) => {
    db.query(query, params, (err, result) => {
      err ? reject(err) : resolve(result)
    })
  })
}

export default databaseQuery
