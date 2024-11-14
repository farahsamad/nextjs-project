import { NextRequest, NextResponse } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/model/userModel";

connect();

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();
    console.log("requestBody is :", requestBody);
    const { token } = requestBody;
    console.log("token is: ", token);
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });
    if (!user) {
      return NextResponse.json(
        {
          error: "Invalid token",
        },
        { status: 400 }
      );
    }
    console.log(user);

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();
    return NextResponse.json({
      message: "Email verified",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}
