import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//user registration
export const register = async (req, res) => {
  try {
    //hashing the password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      // password: req.body.password,
      password: hash, //after using hashing in password
      photo: req.body.photo,
    });
    await newUser.save();
    res.status(200).json({ success: true, message: "Sucesfully Created" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to create. Try again !! " });
  }
};

//user login

export const login = async (req, res) => {
  const email = req.body.email;
  try {
    const user = await User.findOne({ email });
    //if user doesnot exit
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    //if exits  i) check password  or compare password
    const checkCorrectPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    //if password is incorrect
    if (!checkCorrectPassword) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect password or email" });
    }
    const { password, role, ...rest } = user._doc;

    //creating jwt token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "15d " }
    );

    //set token in the browser cookies and send response to the client
    res
      .cookie("accessToken", token, {
        httpOnly: true,
        expires: token,
        expiresIn,
      })
      .status(200)
      .json({
        token,
        success: true,
        message: "Sucesfully login",
        data: { ...rest },
        role,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to login" });
  }
};
