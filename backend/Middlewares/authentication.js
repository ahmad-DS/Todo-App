const jwt = require("jsonwebtoken");
const authenticate = (req, res, next) => {
	const todoAppToken = req.cookies.todo_app_token;
	jwt.verify(todoAppToken, 'passkey', function (err, decoded) {
		console.log("error", err)
		if (err) res.status(401).send("Please Login");
		else {
			req.body.userId = decoded.userId;
			next()
		}
	});


}
module.exports = authenticate