const connection = require("./Config/db");
const todosRouter = require("./Routes/todos.route");

// importing bcrypt and jwt library
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const express = require("express");
const cors = require("cors");
const path = require("path");
const UserModel = require("./Models/user.model");

const app = express();
app.use(express.json());

// Serving Frontend

console.log("working directory->", __dirname);
console.log("environment variables-->", process.env);

// app.get("/", (req, res) => {
//   res.send("welcome home");
// });
app.use(cors());
//sign up request
app.post("/api/signup", async (req, res) => {
  const { password } = req.body;
  bcrypt
    .hash(password, 6)
    .then(async function (hash) {
      const new_user = new UserModel({ ...req.body, password: hash });
      await new_user.save();
      res.json({ msg: "sign up successful" });
    })
    .catch((err) => {
      res.send("something went wrong");
    });
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  const hash = user.password;
  bcrypt.compare(password, hash, function (err, result) {
    if (result) {
      const token = jwt.sign({ userId: user._id }, "passkey");
      res.json({ msg: "login successfull", token: token });
    } else res.json({ msg: "Invalid Credentials" });
  });
});

// Authentication middleware

// app.use(authenticate)
// notes routes connected to notes collection
app.use("/api/todos", todosRouter);

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
