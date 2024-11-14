import { connect } from "@/dbConfig/dbConfig";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connect();
export async function POST(request: NextRequest) {
  try {
    console.log("User: ", User);
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    console.log(reqBody);
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const savedUser = await new User({
      username,
      email,
      password: hashedPassword,
    }).save();

    await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

    return NextResponse.json(
      { message: "Create account successfully", success: true, savedUser },
      { status: 201 }
    );

    console.log("savedUser: ", savedUser);
  } catch (error: any) {
    console.log("User: ", User);

    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
