import express from "express";
import cors from "cors";

// importing bcrypt and jwt library and cookie-parser
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";

import path from "path";
import { fileURLToPath } from "url";

import connection from "./Config/db.js";
import todosRouter from "./Routes/todos.route.js";
import UserModel from "./Models/user.model.js";
import authenticate from "./Middlewares/authentication.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

app.post("/api/signup", async (req, res) => {
  const { password } = req.body;
  bcrypt
    .hash(password, 6)
    .then(async function (hash) {
      const newUser = new UserModel({ ...req.body, password: hash });
      await newUser.save();
      res.status(201).json({ msg: "sign up successful" });
    })
    .catch(() => {
      res.send("something went wrong");
    });
});

app.post("/api/login", async (req, res) => {
  try {
    const expiresIn = 60 * 60; //se
    const { email, password } = req.body;
    console.log("req body", req.body);
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(401).json({ msg: `${email} does not exist` });
    console.log("matching user from db", user);
    const hash = user.password;
    bcrypt.compare(password, hash, function (err, result) {
      console.log("err::", err, "result::", result);
      if (result) {
        const token = jwt.sign({ userId: user._id }, "passkey", {
          expiresIn,
        });
        console.log("generated token-->", token);
        res.cookie("todo_app_token", token, {
          httpOnly: true,
          sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
          secure: process.env.NODE_ENV === "production",
          maxAge: expiresIn * 1000,
        });
        return res.status(201).json({ msg: "login successfull", token });
      }

      console.log("login error message", err);
      return res.status(401).json({ msg: "Invalid Credentials" });
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Something went wrong";
    res.status(500).json({ msg: message });
  }
});

app.use("/api/todos", authenticate, todosRouter);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
  });
}

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("connection is set with mongodb");
  } catch (err) {
    console.log("connection couldn't be set with mongodb");
    console.error("database error: ", err);
  }
  console.log(`sever has started at port ${process.env.PORT}`);
});
