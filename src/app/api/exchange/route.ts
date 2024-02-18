import { NextRequest, NextResponse } from "next/server";
import { getWalletFromMnemonic } from "../../../../utils/ethereum";

export async function POST(request: NextRequest) {
  const body = await request.json();

  // 0: X Token / 1: USDT
  const token = body.token;
  let tokenAddress;
  const amount = body.amount;

  if (!process.env.TOKEN_X_ADDRESS) {
    throw new Error("X Token contract address is not defined");
  }

  if (!process.env.TOKEN_USDT_ADDRESS) {
    throw new Error("USDT Token contract address is not defined");
  }

  if (!process.env.MNEMONIC) {
    throw new Error("Mnemonic is not defined");
  }

  if (token == 0) {
    tokenAddress = process.env.TOKEN_X_ADDRESS;
  } else {
    tokenAddress = process.env.TOKEN_USDT_ADDRESS;
  }

  
  getWalletFromMnemonic(process.env.MNEMONIC, )


  return NextResponse.json(
    { success: true, data: { authToken: token } },
    { status: 200 }
  );
}
