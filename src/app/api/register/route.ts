import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const body = await request.json();

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