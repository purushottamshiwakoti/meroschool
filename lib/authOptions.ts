import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prismadb from "./prismadb";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { signJwtAccessToken } from "@/lib/jwt";
import { exit } from "process";



export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email", placeholder: "abc@gmail.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials:any,req: any):Promise<any> {
        try {
          const findUser = await prismadb.user.findFirst({
            where: {
              email: credentials?.email
            }
          });

          if (!findUser) {
            exit();
          }


          const comparePassword = await bcrypt.compare(
            credentials?.password,
            findUser.password
          );

          if (comparePassword) {
            const accessToken = signJwtAccessToken(findUser);
            const userData={findUser,accessToken};
            return userData;
          } else {
            return null; // Incorrect password
          }
        } catch (error) {
          console.error("Error during authorization:", error);
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user; // Add user information to the token
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.user) {
        session.user = token.user;
      }
      return session;
    }
  }
};
