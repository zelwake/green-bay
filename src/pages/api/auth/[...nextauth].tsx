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

        return { id: '1', username: 'test' }
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
    async signIn({ user, account, profile, email, credentials }) {
      console.log('user')
      console.log(user)
      console.log('account')
      console.log(account)
      console.log('credentials')
      console.log(credentials)
      // save the user account to the database
      return true
    },
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
  },
  // Enable debug messages in the console if you are having problems
  debug: false,
})
