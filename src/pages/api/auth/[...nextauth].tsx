import dbQuery from '@/lib/db'
import validateCredentials from '@/scripts/validateCredentials'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export default NextAuth({
  providers: [
    CredentialsProvider({
      type: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const { username, password } = credentials as {
          username: string
          password: string
        }

        // validate user credentials
        if (!validateCredentials(username, password)) return null

        // check database if user exists
        const result = await dbQuery(
          'SELECT * FROM users WHERE username = ?',
          username
        )
          .then((data) => data)
          .catch((err) => console.log(err))

        if (!result || !(result as []).length) {
          const add = await dbQuery('INSERT INTO users SET ?', {
            username,
            password,
            greenbay_dollars: 300,
          })
          return {
            id: add.insertId,
            name: username,
          }
        }

        return {
          id: result[0].id,
          name: username,
        }
      },
    }),
  ],
  secret: process.env.NEXT_AUTH_SECRET,

  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userName = user?.name
        token.userId = user?.id
      }
      return token
    },
  },
  // Enable debug messages in the console if you are having problems
  debug: false,
})
