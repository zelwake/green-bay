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
      authorize(credentials, req) {
        const { username, password } = credentials as {
          username: string
          password: string
        }

        // validate user credentials
        if (username != 'test' || password != 'test') {
          throw new Error('invalid credentials')
        }

        // create and return the token
        // const token = jwToken.sign(
        //   { sub: '1', username: 'test' },
        //   process.env.JWT_SECRET,
        //   {
        //     expiresIn: '30d',
        //   }
        // )
        return { id: '1', name: 'test' }
      },
    }),
  ],
  secret: process.env.NEXT_AUTH_SECRET,

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  callbacks: {
    async jwt({ token, account, profile, user, isNewUser }) {
      if (user) {
        token.name = user?.name
        token.id = user?.id
      }
      console.log(token)
      return token
    },
  },
  // Enable debug messages in the console if you are having problems
  debug: false,
})
