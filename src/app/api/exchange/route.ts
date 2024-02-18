import { NextRequest, NextResponse } from "next/server";
import { getTokenFromAuthHeader } from "../../../../utils/helper";
import { decodeJwt } from "jose";
import { ethers } from "ethers";
import { getWalletFromMnemonic } from "../../../../utils/ethereum";

const contractABI = [
    "function swapFrom(address to, uint256 amount) public",
    "function swapTo(address to, uint256 amount) public"
];
export async function POST(request: NextRequest) {
  const body = await request.json();
  const token = getTokenFromAuthHeader(request.headers.get("authorization"));
  if (!token) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  const payload = decodeJwt(token);

  // 0: SwapFrom / 1: SwapTo
  const exchange = body.token;
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

  if (!process.env.ETHERS_PROVIDER_URL) {
    throw new Error("Provider url address is not defined")
  }

  const path = `m/44'/60'/0'/0/${payload.sub}`;
  const wallet = getWalletFromMnemonic(process.env.MNEMONIC, path);
  const provider = new ethers.JsonRpcProvider(process.env.ETHERS_PROVIDER_URL);
  const connectedWallet = wallet.connect(provider);
  let contract = new ethers.Contract(process.env.TOKEN_X_ADDRESS, contractABI, connectedWallet);
  const decimals = Number(await contract.decimals());

  if (exchange == 0) {
    const tx = await contract.swapFrom(process.env.TOKEN_USDT_ADDRESS, amount * Math.pow(10, decimals));
    await tx.wait();
  } else {
    const tx = await contract.swapTo(process.env.TOKEN_USDT_ADDRESS, amount * Math.pow(10, decimals));
    await tx.wait();
  }

  return NextResponse.json(
    { success: true },
    { status: 200 }
  );
}
