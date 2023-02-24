import databaseQuery from '@/lib/db'
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
        const result = await databaseQuery(
          'SELECT * FROM Users WHERE username = ?',
          username
        )
          .then((data) => data)
          .catch((err) => console.log(err))

        if ((result as []).length) {
          return result[0].password === password
            ? {
                id: result[0].id,
                name: username,
              }
            : null
        } else {
          try {
            const add = await databaseQuery('INSERT INTO Users SET ?', {
              username,
              password,
              greenbay_dollars: 300,
            })
            return {
              id: add.insertId,
              name: username,
            }
          } catch (error) {
            console.log(error)
            return null
          }
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
      if (user && user.name) {
        token.userName = user.name
        token.userId = user.id
      }
      return token
    },
    async session({ token, session }) {
      session.user.id = token.userId
      return session
    },
  },
  // Enable debug messages in the console if you are having problems
  debug: false,
})
