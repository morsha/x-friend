import { getJwtSecretKey } from "@/app/lib/auth";
import { SignJWT } from "jose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const body = await request.json();

    // get user by email
    const user = userService.getUserByEmail(body.email);

    if (user) {
        const token = await new SignJWT({
            email: body.email,
        })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("300s")
        .sign(getJwtSecretKey());

        const response = NextResponse.json(
            { success: true },
            { 
                status: 200, 
                headers: { 
                    "content-type": "application/json",
                    "authentication": `bearer ${token}`,
                } 
        });

        return response;
    }

    return NextResponse.json({success: false});
}