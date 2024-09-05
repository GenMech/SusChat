import { NextResponse } from "next/server";
import { authAdapter } from "@/lib/auth";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  const { email, password, first_name, last_name, stored_session_uuid } =
    await request.json();

  try {
    const existingUser = await authAdapter.getUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const userID = stored_session_uuid || uuidv4(); // If user signing up after chatting with bot, We might already have id in session_uuid

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: userID,
      email,
      password: hashedPassword,
      first_name,
      last_name,
    };

    const user = await authAdapter.createUser(newUser);
    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    console.error("Error signing up user:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
