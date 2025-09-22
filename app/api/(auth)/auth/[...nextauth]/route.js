import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import dbConnect from "@/config/dbConnect";
import User from "@/model/User";
import bcrypt from "bcrypt";
import clientPromise from "@/config/clientPromise";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      profile(profile) {
        console.log("GoogleProfile", profile);
        return {
          name: profile.name,
          image: profile.picture,
          email: profile.email,
          id: profile.sub,
          role: "user",
        };
      },
    }),
    Credentials({
      name: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials;
        try {
          await dbConnect();
          const user = await User.findOne({ email }).select("+password");
          if (!user) {
            return { error: "Invalid Email or Password" };
          }
          if (!user.password) {
            return { error: "Invalid Email or Password" };
          }
          const isValid = await bcrypt.compare(password, user.password);
          if (!isValid) {
            return { error: "Invalid Email or Password" };
          }
          return { ...user._doc, password: undefined, id: user._id };
        } catch (error) {
          console.log(error);
          return { error: error.message };
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log(user);
      if (account.provider === "credentials" && user?.error) {
        throw new Error(user.error);
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.name = user.name;
        token.image = user.image;
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.name = token.name;
        session.user.image = token.image;
        session.user.role = token.role;
        session.user.id = token.id;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
