import { Request, Response, NextFunction } from "express";
import UserModel from "../Models/user.model.js";

const authorization = (roles: string[]) => async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) {
    res.status(404).json({ error: "User does not exist"});
    return;
  }

  if (!roles.includes(user.role)) {
    res.send("You are not authorized to perform this action!");
  } else {
    next();
  }
};

export default authorization;
