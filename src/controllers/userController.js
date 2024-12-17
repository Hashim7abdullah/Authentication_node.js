import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userList.js";

//register
const register = async (req, res) => {
  try {
    const { email, name, password, role } = req.body;

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exist",
      });
    }

    const existingName = await userModel.findOne({ name });
    if (existingName) {
      return res.status(400).json({
        success: false,
        message: "Username already exist",
      });
    }
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must have more than 8 characters",
      });
    }

    const hashedpassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      name,
      email,
      password: hashedpassword,
      role,
    });

    const user = await newUser.save();

    return res
      .status(201)
      .json({ success: true, message: "User created succesfully" });
    user: {
      id: user._id;
      name: user.name;
      email: user.email;
      password: user.password;
    }
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//login

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User is not registered" });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    const token = jwt.sign(
      { id: user._id, role: user.role }, 
      process.env.JWT_SECRET,
      {
        expiresIn: "2h",
      }
    );
    res.cookie("token", token, { httpOnly: true, maxAge: 360000 });
    return res.status(201).json({
      success: true,
      message: "Login successfull",
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export { register, login };
