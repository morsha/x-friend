import { decodeJwt } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { getTokenFromAuthHeader } from "../../../../utils/helper";
import { createService } from "../../../../utils/prismaUtils";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const token = getTokenFromAuthHeader(request.headers.get("authorization"));

  if (!token) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  if (!body.title || !body.description || !body.price || !body.status) {
    return NextResponse.json(
      { success: false, data: { message: "Invalid Request" } },
      { status: 400 }
    );
  }

  const userPayload: UserPayload = decodeJwt(token);

  const service = await createService({
    title: body.title,
    description: body.description,
    price: body.price,
    providerId: userPayload.sub,
    status: body.status,
  });

  if (service) {
    const response = NextResponse.json(
      { success: true, data: { service } },
      { status: 200 }
    );

    return response;
  }

  return NextResponse.json(
    { success: false, data: { message: "Unauthorized" } },
    { status: 401 }
  );
}