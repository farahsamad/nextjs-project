import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("Connected Successfully");
    });
    connection.on("error", (err) => {
      console.log("Connection error: ", err);
      process.exit();
    });
  } catch (error) {
    console.log("Something goes wrong!: ", error);
  }
}
