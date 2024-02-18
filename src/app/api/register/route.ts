import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { SignJWT } from "jose";
import { getJwtSecretKey } from "@/app/libs/auth";

export async function POST(request: NextRequest) {
  const body = await request.json();

  // map to User Model
  // userService.save(user);

  const user = {
    id: new Date().getTime().toString(),
    name: body.name,
    email: body.email,
    passhash: await bcrypt.hash(body.password, 10),
  };

  // TODO: generate wallet address
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

  return NextResponse.json(
    { success: true, data: { authToken: token } },
    { status: 200 }
  );
}
