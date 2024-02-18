import NextAuth from "next-auth";
import { UserRole} from "@prisma/client";
import { PrismaAdapter} from "@auth/prisma-adapter";

import { getUserById } from "@/data/user";
import { db } from "@/lib/db";
import authConfig from "@/auth.config";
import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  // para el caso de error de login con = cuenta de correo pero usado con otro provider
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      })
    }
  },
  callbacks: {
    async signIn({ user, account }) { 
      // Allow OAuth without email verification
      if (account?.type !== "credentials") return true;
      const id = user.id as string;
      const existingUser = await getUserById(id);

      //  Prevent login if email is not verified
      if (!existingUser?.emailVerified) return false;

      // Add 2FA check
      if (existingUser.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);

        if (!twoFactorConfirmation) return false;

        // Delete two factor confirmation for next sign in
        await db.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id }
        });
      }

      return true
    },
    async session({ session, token }) { 
      // console.log({
      //   sessionToken: token,
      // });
      if (token.sub && session.user) {
        session.user.id = token.sub;
      } 

      if (token.role && session.user) { }
      session.user.role = token.role as UserRole;

      if (session.user) { }
      session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;

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
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

      return token;
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
})