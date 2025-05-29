const connection = require("./Config/db");
const todosRouter = require("./Routes/todos.route");

// importing bcrypt and jwt library and cookie-parser
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");

const express = require("express");
const cors = require("cors");
const path = require("path");
const UserModel = require("./Models/user.model");
const authenticate = require("./Middlewares/authentication");

const app = express();
app.use(express.json());
app.use(cookieParser());

// console.log("working directory->", __dirname);
// console.log("environment variables-->", process.env);

app.use(cors({
  origin: "http://localhost:3000", // Your React frontend
  credentials: true
}));

//sign up request
app.post("/api/signup", async (req, res) => {
  const { password } = req.body;
  bcrypt
    .hash(password, 6)
    .then(async function (hash) {
      const new_user = new UserModel({ ...req.body, password: hash });
      await new_user.save();
      res.status(201).json({ msg: "sign up successful" });
    })
    .catch((err) => {
      res.send("something went wrong");
    });
});

app.post("/api/login", async (req, res) => {
  try {
    const expiresIn = 60 * 60; //1 hour
    const { email, password } = req.body;
    console.log("req body", req.body);
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(401).json({ msg: `${email} does not exist` });
    console.log("matching user from db", user);
    const hash = user.password;
    bcrypt.compare(password, hash, function (err, result) {
      console.log("err::", err, "result::", result)
      if (result) {
        const token = jwt.sign({ userId: user._id }, "passkey", {
          expiresIn,
        });
        console.log("generated token-->", token);
        res.cookie("todo_app_token", token, {
          httpOnly: true,
          sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
          secure: process.env.NODE_ENV === "production",
          maxAge: expiresIn * 1000,
        });
        return res.status(201).json({ msg: "login successfull", token: token });
      } else {
        console.log("login error message", err);
        return res.status(401).json({ msg: "Invalid Credentials" });
      }
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

// Authentication middleware
app.use(authenticate);

// notes routes connected to notes collection
app.use("/api/todos", todosRouter);

// Serving Frontend
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
    console.log(err);
  }
  console.log(`sever has started at port ${process.env.PORT}`);
});
