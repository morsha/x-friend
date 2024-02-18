import { NextRequest, NextResponse } from "next/server";
import { getTokenFromAuthHeader } from "../../../../utils/helper";
import { getAllServices } from "../../../../utils/prismaUtils";

export async function GET(request: NextRequest) {
  const token = getTokenFromAuthHeader(request.headers.get("authorization"));
  if (!token) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  // Add ethers code to mint token
  try {
    const services = await getAllServices();

    return NextResponse.json(
      { success: true, data: { services } },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Query failed" },
      { status: 500 }
    );
  }
}
