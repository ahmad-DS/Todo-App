const jwt = require("jsonwebtoken");
const authenticate = (req, res, next) => {
	console.log(req.headers);
	const token = req.headers.authorization.split(" ")[1];
	jwt.verify(token, 'passkey', function (err, decoded) {
		if (err) res.send("Please Login");
		else {
			req.body.userId = decoded.userId;
			next()
		}
	});


}
module.exports = authenticate