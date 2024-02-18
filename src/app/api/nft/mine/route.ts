import { decodeJwt } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { getTokenFromAuthHeader } from "../../../../../utils/helper";

export async function GET(request: NextRequest) {
    const token = getTokenFromAuthHeader(request.headers.get("authorization"));
    if (!token) {
        return NextResponse.json(
            { success: false, message: "Unauthorized" },
            { status: 401 }
        );
    }
    const userPayload: UserPayload = decodeJwt(token);

    userPayload.sub

    return NextResponse.json(
        { success: true, data: { userPayload, tx: mintTx.hash } },
        { status: 200 }
    );
}
