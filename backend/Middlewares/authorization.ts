import UserModel from "../Models/user.model.js";

const authorization = (roles) => async (req, res, next) => {
  const { email } = req.body;
  const user = await UserModel.findOne({ email });

  if (!roles.includes(user.role)) {
    res.send("You are not authorized to perform this action!");
  } else {
    next();
  }
};

export default authorization;
