import { decodeJwt } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { getTokenFromAuthHeader } from "../../../../utils/helper";
import { createNFT } from "../../../../utils/prismaUtils";

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

  // TODO: buy and mint NFT

  const nft = await createNFT({
    tokenId: "1",
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
