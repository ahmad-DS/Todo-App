const connection = require("./Config/db");
const todosRouter = require("./Routes/todos.route")


// importing bcrypt and jwt library
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const express = require("express");
const cors=require("cors")
const UserModel = require("./Models/user.model");

const app = express();
app.use(express.json());

// Serving Frontend
// const path = require("path");

// app.use(express.static(path.join(__dirname, "../client/build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../client/build", "index.html"));
// });



app.get("/", (req, res) => {
	res.send("welcome home")
})
app.use(cors())
//sign up request
app.post("/signup", async (req, res) => {
	const { password } = req.body;
	bcrypt.hash(password, 6).then(async function (hash) {
		const new_user = new UserModel({ ...req.body, password: hash })
		await new_user.save();
		res.json({msg:"sign up successful"})
	})
		.catch(err => {
			res.send("something went wrong")
		})


})

app.post("/login", async (req, res) => {
	const { email, password } = req.body;
	const user = await UserModel.findOne({ email });
	const hash = user.password;
	bcrypt.compare(password, hash, function (err, result) {
		if (result) {
			const token = jwt.sign({ userId:user._id }, "passkey");
			res.json({msg:"login successfull",token:token})

		} else res.json({msg:"Invalid Credentials"})

	})

})

// Authentication middleware


// app.use(authenticate)
// notes routes connected to notes collection
app.use("/todos",todosRouter)

app.listen(process.env.PORT, async () => {
	try {
		await connection;
		console.log("connection is set with mongodb")
	}
	catch (err) {
		console.log("connection couldn't be set with mongodb");
		console.log(err)
	}
	console.log(`sever has started at port ${process.env.PORT}`)
})