const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const newToken = jwt.sign(
      { id: decoded.id, email: decoded.email, username: decoded.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", newToken, {
      httpOnly: true,
      secure: true,
      maxAge: 3600000,
    });

    req.token = newToken;

    next();
  } catch (err) {
    res.status(500).json({ message: "Error refreshing token" });
  }
};
