// import NextAuth from "next-auth"
// import GoogleProvider from "next-auth/providers/google";
// import { PrismaAdapter } from "@next-auth/prisma-adapter"
// import { prisma } from "@/prisma/client";


//const handler = NextAuth({
// export const authOptions = {
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//   ],
//   session: {strategy: "jwt",
// },  
// }

//export { handler as GET, handler as POST }
//export default NextAuth(authOptions)


import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "@/prisma/client"


export const authOptions: NextAuthOptions = {

  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  
  session: {
    strategy: "jwt",
  },
  // Opcjonalnie: integracja z bazą danych [2]
  // adapter: PrismaAdapter(prisma), 
};


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

