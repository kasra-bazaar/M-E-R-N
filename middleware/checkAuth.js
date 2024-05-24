const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.headers.authorization.split("Bearer")[1];

    if (!token) {
      return res.status(401).json({ message: "TOKEN IS NOT VALID" });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);

    req.userData = { userId: decodedToken.userId };

    next();
  } catch (err) {
    return res.status(401).json({ message: "AUTHENTICATION FAILED" });
  }
};
