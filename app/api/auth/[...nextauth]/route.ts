import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth";
import { NextApiRequest, NextApiResponse } from "next";

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  return NextAuth(req, res, authConfig(req, res)); // Pass req, res to the authConfig
}

export { handler as GET, handler as POST };
