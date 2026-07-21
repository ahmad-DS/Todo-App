import jwt from "jsonwebtoken";
const authenticate = (req, res, next) => {
    const todoAppToken = req.cookies.todo_app_token;
    jwt.verify(todoAppToken, "passkey", function (err, decoded) {
        console.error("error-->", err);
        if (err || !decoded || typeof decoded === "string") {
            res.status(401).send("Token not valid");
        }
        else {
            req.body.userId = decoded.userId;
            console.log("req body after autheyticate middleware", req.body);
            next();
        }
    });
};
export default authenticate;
