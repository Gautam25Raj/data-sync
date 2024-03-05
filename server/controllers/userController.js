const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) throw new Error("User not found.");

    res.status(200).json({ data: user });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching user.", error: err.message });
  }
};

exports.getUserByEmail = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email }).select(
      "-password"
    );

    if (!user) throw new Error("User not found.");

    res.status(200).json({ data: user });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching user.", error: err.message });
  }
};

exports.getUserByUsername = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }).select(
      "-password"
    );

    if (!user) throw new Error("User not found.");

    res.status(200).json({ data: user });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching user.", error: err.message });
  }
};

exports.postUser = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    if (!email || !username || !password) {
      throw new Error("Email or username or password not provided.");
    }

    if (username.length < 3) {
      throw new Error("Username should be at least 3 characters long.");
    }

    if (!email.includes("@")) {
      throw new Error("Invalid email format.");
    }

    if (password.length < 6) {
      throw new Error("Password should be at least 6 characters long.");
    }

    const existingUserByEmail = await User.findOne({ email });
    const existingUserByUsername = await User.findOne({ username });

    if (existingUserByEmail)
      throw new Error("User with this email already exists.");

    if (existingUserByUsername)
      throw new Error("User with this username already exists.");

    const user = new User({ email, username, password });
    const savedUser = await user.save();

    const token = jwt.sign(
      { id: user._id, email: user.email, username: user.username },
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

    savedUser.password = undefined;

    res.status(201).json({ token, data: savedUser });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error signing up. Check later.", error: err.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) throw new Error("User not found.");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials.");

    const token = jwt.sign(
      { id: user._id, email: user.email, username: user.username },
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

    user.password = undefined;

    res.status(200).json({ token, data: user });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error loging in user.", error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    if (req.userData.id !== req.params.id) {
      throw new Error("Not authorized.");
    }

    let user = await User.findById(req.params.id);

    if (!user) throw new Error("User not found.");

    if (email) user.email = email;
    if (username) user.username = username;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 12);
      user.password = hashedPassword;
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, username: user.username },
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

    const updatedUser = await user.save();

    updatedUser.password = undefined;

    res.status(200).json({ token: token, data: updatedUser });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating user.", error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    if (req.userData.id !== req.params.id) {
      throw new Error("Not authorized.");
    }

    const result = await User.findByIdAndDelete(req.params.id);

    if (!result) throw new Error("User not found.");

    res.status(200).json({ message: "User deleted successfully." });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleteing user.", error: err.message });
  }
};

exports.logoutUser = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out" });
};
