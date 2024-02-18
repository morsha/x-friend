import { getJwtSecretKey } from "@/app/libs/auth";
import { SignJWT } from "jose";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { getUserByEmail } from "../../../../utils/prismaUtils";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const user = await getUserByEmail(body.email);

  const isPasswordCorrect = await bcrypt.compare(body.password, user!.password);

  if (user && isPasswordCorrect) {
    const userPayload: UserPayload = {
      sub: user.id,
      name: user.name!,
      email: user.email,
      address: user.evmAddress!,
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
