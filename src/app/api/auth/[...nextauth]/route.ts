import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google'

const AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user, account }: any) {
            // Persist the OAuth access_token and or the user id to the token right after signin
            if (account) {
                token.accessToken = account.id_token
                token.id = user.id
            }
            return token
        },
        async session({ session, token, user }: any) {
            // Send properties to the client, like an access_token and user id from a provider.
            session.user.accessToken = token.accessToken
            session.user.id = token.id

            return session
        }
    }
}
const handler = NextAuth(AuthOptions)

export { handler as GET, handler as POST }