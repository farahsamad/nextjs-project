import { connect } from "@/dbConfig/dbConfig";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    const findUSer = await User.findOne({ email });
    if (!findUSer) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }
    const valPassword = await bcryptjs.compare(password, findUSer.password);
    if (!valPassword) {
      return NextResponse.json(
        { error: "Incorrect password" },
        { status: 400 }
      );
    }
    const dataToken = {
      id: findUSer._id,
      username: findUSer.username,
      email: findUSer.email,
    };
    const token = await jwt.sign(dataToken, process.env.SECRET_TOKEN!, {
      expiresIn: "1h",
    });

    const response = NextResponse.json({
      message: "Login Successfully",
      success: true,
    });
    response.cookies.set("token", token, { httpOnly: true, path: "/" });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
