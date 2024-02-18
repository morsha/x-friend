import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request: NextRequest) {
    const body = await request.json();

    const hashPassword = await bcrypt.hash(body.password, 10);

    // map to User Model
    userService.save(user);

    return NextResponse.json(
        {success: true},
        {
            status: 200,
            headers: {
                "content-type": "application/json"
            },
        }
    )
}