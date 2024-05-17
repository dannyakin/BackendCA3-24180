const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const Register = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, password } = req.body;

    const lowerCaseEmail = email.toLowerCase();

    const existingUser = await User.findOne({ email: lowerCaseEmail });
    if (existingUser) {
      return res.status(400).json("Email already belongs to an account");
    }

    const strippedPhoneNumber = phoneNumber.replace(/\D/g, "");

    const existingPhone = await User.findOne({
      phoneNumber: strippedPhoneNumber,
    });
    if (existingPhone) {
      return res.status(400).json("Phone number already belongs to an account");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      email: lowerCaseEmail,
      phoneNumber: strippedPhoneNumber,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, userType: newUser.userType },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    const userWithoutPassword = { ...newUser.toObject(), password: undefined };

    res.status(200).json({ token, user: userWithoutPassword });
  } catch (error) {
    console.log(error);
    res.status(500).send("Error creating user account");
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const lowerCaseEmail = email.toLowerCase();

    const user = await User.findOne({ email: lowerCaseEmail });
    if (!user) {
      return res.status(404).send("User not found");
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).send("Enter a valid password");
    }

    const token = jwt.sign(
      { id: user._id, userType: user.userType },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).send("Error logging in");
  }
};

module.exports = { Register, Login };
