import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    age: { type: Number, required: true },
    role: { type: String, default: "user" }
  },
  {
    versionKey: false,
  },
);

const UserModel = mongoose.model("user", userSchema);

export default UserModel;