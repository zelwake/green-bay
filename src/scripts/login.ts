import jwt from 'jsonwebtoken'
import { NextApiRequest } from 'next'

async function checkJwt(req: NextApiRequest) {
  const token = req.headers['authorization'] as string

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET)
    // The token is valid
    return decoded
  } catch (error) {
    // The token is invalid
    return error
  }
}

export { checkJwt }
