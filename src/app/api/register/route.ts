import { NextRequest, NextResponse } from "next/server";
import { SignJWT } from "jose";
import { getJwtSecretKey } from "@/app/libs/auth";
import { bodyToUser } from "../../../../utils/userMapper";
import { createUser } from "../../../../utils/prismaUtils";

export async function POST(request: NextRequest) {
  const body = await request.json();

  // map to User Model
  let user = await bodyToUser(body);
  user = await createUser(user);
  // const { evmAddress } = createWallet(user);
  const userPayload: UserPayload = {
    sub: user.id,
    name: user.name,
    email: user.email,
    address: user.evmAddress,
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
