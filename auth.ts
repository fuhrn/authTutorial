import NextAuth from "next-auth";
import { UserRole} from "@prisma/client";
import { PrismaAdapter} from "@auth/prisma-adapter";

import { getUserById } from "@/data/user";
import { db } from "@/lib/db";
import authConfig from "@/auth.config";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    async session({ session, token }) { 
      // console.log({
      //   sessionToken: token,
      // });
      if (token.sub && session.user) {
        session.user.id = token.sub;
      } 

      if (token.role && session.user) { }
      session.user.role = token.role as UserRole;

      return session;
    },
    // genero el token de acceso para luego tenerlo disponible en el objeto Request
    // y de ahi ver si el user es admin o no
    async jwt({ token }) {
      // si no sub significa estoy logout
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.role = existingUser.role;

      return token;
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
})