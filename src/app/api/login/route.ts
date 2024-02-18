import { getJwtSecretKey } from "@/app/libs/auth";
import { SignJWT } from "jose";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
  const body = await request.json();

  // get user by email
  // const user = userService.getUserByEmail(body.email);
  const user = {
    id: "test-user-id",
    name: "test user",
    email: body.email,
    passhash: await bcrypt.hash("password", 10),
  };

  const isPasswordCorrect = await bcrypt.compare(body.password, user.passhash);

  if (user && isPasswordCorrect) {
    const userPayload: UserPayload = {
      sub: user.id,
      name: user.name,
      email: user.email,
      address: "USER_ADDRESS",
    };
    const token = await new SignJWT(userPayload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("300s")
      .sign(getJwtSecretKey());

    const response = NextResponse.json(
      { success: true, data: { authToken: token } },
      { status: 200 }
    );

    return response;
  }

  return NextResponse.json(
    { success: false, data: { message: "Unauthorized" } },
    { status: 401 }
  );
}
