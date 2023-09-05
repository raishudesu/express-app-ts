import UserModel from "../models/userModel";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { Request, Response } from "express";

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });

    if (user) return res.json({ message: "User already exists" });

    const hashedPwd = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({ username, password: hashedPwd });

    res.json({ message: "User registered successfully", userDetails: newUser });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });

    if (!user)
      return res.json({ success: false, message: "User doesn't exist" });

    const isPwdValid = await bcrypt.compare(password, user.password);

    if (!isPwdValid)
      return res.json({
        success: false,
        message: "Username or password is incorrect",
      });

    const token = jwt.sign(
      { success: true, id: user._id, username },
      "jwtPrivateKey",
      {
        expiresIn: "15m",
      }
    ); // ADD {expiresIn: "15m"} for adding token expiration

    res
      .cookie("token", token) // set a cookie for user session
      .json({
        success: true,
        token,
        userId: user._id,
        username: user.username,
      });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const updateUserPwd = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { password, newPwd } = req.body;

    const user = await UserModel.findOne({ _id: id });

    if (!user) return res.json({ message: "User doesn't exist" });

    const isPwdValid = await bcrypt.compare(password, user.password);

    if (!isPwdValid)
      return res.json({ message: "Username or password is incorrect" });

    const hashedPwd = await bcrypt.hash(newPwd, 10);

    const updatePwd = await UserModel.findOneAndUpdate(
      { _id: id },
      { password: hashedPwd }
    );

    res.json({ message: "Password updated", updatePwd });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getUser = (req: Request, res: Response) => {
  try {
    const { token } = req.cookies;
    token
      ? jwt.verify(token, "jwtPrivateKey", {}, (err, info) => {
          if (err) throw err;
          const session = { ...(info as object), token };
          console.log(session);
          res.json(session);
        })
      : null;
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const logoutUser = (req: Request, res: Response) => {
  try {
    res.cookie("token", "").json({ message: "User logged out" });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
