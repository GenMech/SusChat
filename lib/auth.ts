import { executeQuery } from "./db";
import { NextAuthOptions, DefaultSession, AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";
import { RowDataPacket } from "mysql2";
import { User } from "./types/user";
import { v4 as uuidv4 } from "uuid";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export const authAdapter = {
  async getUserByEmail(email: string): Promise<User | null> {
    const query = "SELECT * FROM users WHERE email = ?";
    const result = (await executeQuery(query, [email])) as RowDataPacket[];

    console.log("result in authadapter:", result);

    return result.length > 0 ? (result[0] as User) : null;
  },

  async createUser(user: {
    id: string;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
  }): Promise<User | null> {
    const query =
      "INSERT INTO users (id, email, password, first_name, last_name) VALUES (?, ?, ?, ?, ?)";
    await executeQuery(query, [
      user.id,
      user.email,
      user.password,
      user.first_name,
      user.last_name,
    ]);

    return this.getUserByEmail(user.email);
  },

  async updateLoginTimestamp(id: string): Promise<void> {
    const query =
      "UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?";
    await executeQuery(query, [id]);
  },
};

export const authConfig: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        const { email, password } = credentials;
        const user = (await authAdapter.getUserByEmail(email)) as User | null;

        if (user && (await bcrypt.compare(password, user.password))) {
          await authAdapter.updateLoginTimestamp(user.id);
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account, profile }) {
      let dbUser;
      console.log("token:", token);

      // If sign in with google
      if (account?.provider === "google" && profile) {
        if (!token.email) {
          token.email = profile.email as string;
        }

        dbUser = await authAdapter.getUserByEmail(token.email as string);
        const googleProfile = profile as any;

        if (!dbUser) {
          dbUser = await authAdapter.createUser({
            id: uuidv4(),
            email: token.email as string,
            password: "",
            first_name: googleProfile.given_name || "",
            last_name: googleProfile.family_name || "",
          });
        }
      } else {
        dbUser = await authAdapter.getUserByEmail(token.email as string);
      }

      if (!dbUser) {
        throw new Error("No user with this email found");
      }

      await authAdapter.updateLoginTimestamp(dbUser.id);

      return {
        id: dbUser.id,
        name: dbUser.first_name,
        email: dbUser.email,
      };
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id as string,
          name: token.name as string,
          email: token.email as string,
        };
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
    newUser: "/auth/signup",
  },
};
