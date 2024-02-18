import { NextRequest, NextResponse } from "next/server";
import { ethers } from "ethers";
import { getWalletFromMnemonic } from "../../../../utils/ethereum";

const contractABI = ["function transfer(address to, uint256 amount) public"];
export async function POST(request: NextRequest) {
  const body = await request.json();
  const withdrawAddress = body.address;
  const amount = body.amount;

  if (!process.env.TOKEN_USDT_ADDRESS) {
    throw new Error("USDT Token contract address is not defined");
  }

  if (!process.env.MNEMONIC) {
    throw new Error("Mnemonic is not defined");
  }

  if (!process.env.ETHERS_PROVIDER_URL) {
    throw new Error("Provider url address is not defined")
  }

  const wallet = getWalletFromMnemonic(process.env.MNEMONIC, "");
  const provider = new ethers.providers.JsonRpcProvider(process.env.ETHERS_PROVIDER_URL);
  const connectedWallet = wallet.connect(provider);
  const contract = new ethers.Contract(process.env.TOKEN_USDT_ADDRESS, contractABI, connectedWallet);
  const decimals = Number(await contract.decimals());

  const tx = await contract.transfer(withdrawAddress, amount * Math.pow(10, decimals));
  await tx.wait();

  return NextResponse.json(
    { success: true },
    { status: 200 }
  );
}
