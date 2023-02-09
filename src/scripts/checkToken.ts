import { NextApiRequest } from 'next'
import { getToken, JWT } from 'next-auth/jwt'

const checkToken = async ({
  req,
}: {
  req: NextApiRequest
}): Promise<JWT | null> => {
  const secret = process.env.JWT_SECRET
  const token = await getToken({ req, secret })

  return token ? token : null
}

export default checkToken
