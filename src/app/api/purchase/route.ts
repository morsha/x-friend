import { decodeJwt } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { getTokenFromAuthHeader } from "../../../../utils/helper";
import { createNFT } from "../../../../utils/prismaUtils";
import {mintNFT} from "../../../../utils/ethereum";

export async function POST(request: NextRequest) {
  const token = getTokenFromAuthHeader(request.headers.get("authorization"));
  if (!token) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }
  const userPayload: UserPayload = decodeJwt(token);

  const data = await request.json();
  const serviceId = data.serviceId;
  const mnemonic = process.env.MNEMONIC;
  if (!mnemonic) {
    return NextResponse.json(
      { success: false, message: "Mnemonic is not defined" },
      { status: 500 }
    );
  }
  const contractAddress = process.env.XNFT_ADDRESS;
  if (!contractAddress) {
    return NextResponse.json(
      { success: false, message: "XNFT contract address is not defined" },
      { status: 500 }
    );
  }
  // TODO: buy and mint NFT
  const mint_nft = await mintNFT(mnemonic, "", userPayload.address, contractAddress);


  const nft = await createNFT({
    tokenId: mint_nft.token_id.toString(),
    metadataUrl: "metadataUrl",
    ownerId: "1",
    minterId: "",
    serviceId: data.serviceId,
  });

  return NextResponse.json(
    {
      success: true,
      data: {
        nft,
      },
    },
    { status: 200 }
  );
}
