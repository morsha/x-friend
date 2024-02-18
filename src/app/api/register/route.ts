import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { SignJWT } from "jose";
import { getJwtSecretKey } from "@/app/libs/auth";
import { getWalletFromMnemonic } from "../../../../utils/ethereum";

export async function POST(request: NextRequest) {
  const body = await request.json();

  // map to User Model
  // userService.save(user);

  const user = {
    id: '1',
    name: body.name,
    email: body.email,
    passhash: await bcrypt.hash(body.password, 10),
  };

  if (!process.env.MNEMONIC) throw new Error("Mnemonic is not defined");

  const path = `m/44'/60'/0'/0/${user.id}`;
  const address = await getWalletFromMnemonic(process.env.MNEMONIC, path).getAddress();

  const userPayload: UserPayload = {
    sub: user.id,
    name: user.name,
    email: user.email,
    address,
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
