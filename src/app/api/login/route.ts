import { getJwtSecretKey } from "@/app/libs/auth";
import { SignJWT } from "jose";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
    const body = await request.json();

    // get user by email
    const user = userService.getUserByEmail(body.email);

    const isPasswordCorrect = await bcrypt.compare(body.password, user.password);

    if (user && isPasswordCorrect) {
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