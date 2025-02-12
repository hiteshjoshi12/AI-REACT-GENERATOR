import userModel from "../model/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "2h" });
};

const registerUser = async (req, res) => {
  const { name, password, email } = req.body;
  try {
    const exist = await userModel.findOne({ email });
    if (exist) {
      return res.json({ success: false, message: "USER ALREADY EXIST." });
    }

    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email.",
      });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        messge: "Enter password gerate than 8 characters",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = createToken(user._id);
    res.json({ success: true, token, userId: user._id }); 
     
  } catch (error) {
    res.json({ success: false, message: error });
  }
};

const userlogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User Does Not Exist." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = createToken(user._id);
    res.json({ success: true, token, userId: user._id });
  } catch (error) {
    res.json({ success: false, message: "Error" });
  }
};

export {userlogin,registerUser};