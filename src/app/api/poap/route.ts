import { NextRequest, NextResponse } from "next/server";
import jose from "jose";
import bcrypt from "bcrypt";
import { getTokenFromAuthHeader } from "../../../../utils/helper";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const token = getTokenFromAuthHeader(request.headers.get("authorization"));
  if (!token) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }
  const userPayload: UserPayload = jose.decodeJwt(token);
  return NextResponse.json(
    { success: true, data: { userPayload } },
    { status: 200 }
  );
}
