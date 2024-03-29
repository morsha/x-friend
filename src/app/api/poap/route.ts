import { NextRequest, NextResponse } from "next/server";
import { decodeJwt } from "jose";
import { getTokenFromAuthHeader } from "../../../../utils/helper";
import { ethers } from "ethers";
import { getWalletFromMnemonic } from "../../../../utils/ethereum";
import {
  createPOAP,
  getNFTById,
  updateNFT,
} from "../../../../utils/prismaUtils";

const contractABI = ["function safeMint(address to) public"];

export async function POST(request: NextRequest) {
  const body = await request.json();
  const token = getTokenFromAuthHeader(request.headers.get("authorization"));
  if (!token) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }
  const userPayload: UserPayload = decodeJwt(token);

  // Add ethers code to mint token
  try {
    if (!process.env.MNEMONIC) {
      throw new Error("Mnemonic is not defined");
    }
    const userPayload: UserPayload = decodeJwt(token);

    if (!process.env.MNEMONIC) {
      throw new Error("Mnemonic is not defined");
    }
    if (!process.env.XPOAP_ADDRESS) {
      throw new Error("XPOAP contract address is not defined");
    }
    // Connect to the Ethereum network
    const providerUrl = process.env.PROVIDER_URL;
    const provider = new ethers.JsonRpcProvider(providerUrl);
    const wallet = getWalletFromMnemonic(process.env.MNEMONIC, "").connect(
      provider
    );
    const contract = new ethers.Contract(
      process.env.XPOAP_ADDRESS,
      contractABI,
      wallet
    );

    // Extract user address and amount from the request body or token payload
    const targetAddress = body.address; // Ensure your token payload contains the user's address
    const free_data = await provider.getFeeData();
    const gasPrice = free_data.gasPrice;
    const nonce = await provider.getTransactionCount(wallet.address);
    // Call the mint function of your contract
    const mintTx = await contract.safeMint(targetAddress, {
      gasPrice: gasPrice,
      gasLimit: 64000,
      nonce: nonce,
    });
    const receipt = await mintTx.wait(); // Wait for the transaction to be mined

    await updateNFT(body.nftId, { status: "COMPLETED" });
    const tokenId = Number(BigInt(receipt.logs[0].topics[3])).toString();
    const poap = await createPOAP({
      tokenId,
      nftId: body.nftId,
    });

    return NextResponse.json(
      {
        success: true,
        data: { userPayload, tx: receipt.hash, tokenId, poap },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Minting failed" },
      { status: 500 }
    );
  }
}
