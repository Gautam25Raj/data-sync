const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.postUser = async (req, res) => {
  const { email, username, password } = req.body;
  console.log(req.body);

  if (!email || !username || !password) {
    return res
      .status(400)
      .json({ message: "Email, username and password required" });
  }

  if (username.length < 3) {
    return res
      .status(400)
      .json({ message: "Username should be at least 3 characters long" });
  }

  if (!email.includes("@")) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password should be at least 6 characters long" });
  }

  try {
    const existingUserByEmail = await User.findOne({ email });
    const existingUserByUsername = await User.findOne({ username });

    if (existingUserByEmail)
      return res
        .status(400)
        .json({ message: "User with this email already exists" });

    if (existingUserByUsername)
      return res
        .status(400)
        .json({ message: "User with this username already exists" });

    const user = new User({ email, username, password });
    const savedUser = await user.save();

    const userObject = savedUser.toObject();
    delete userObject.password;

    res.status(201).json(userObject);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User does not exist" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      maxAge: 3600000,
    });

    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateUser = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    if (req.userData.id !== req.params.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    let user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    if (email) user.email = email;
    if (username) user.username = username;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 12);
      user.password = hashedPassword;
    }

    const updatedUser = await user.save();

    const userObject = updatedUser.toObject();
    delete userObject.password;

    res.status(200).json(userObject);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    if (req.userData.id !== req.params.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const result = await User.findByIdAndDelete(req.params.id);

    if (!result) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
