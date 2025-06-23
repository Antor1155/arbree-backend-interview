const jwt = require("jsonwebtoken");
const { getUser } = require("../helpers/user");

exports.userAuthorization = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await getUser({ email: decoded.email });

    req.user = user; // You can access this in next middleware/route

    return next();
  } catch (err) {
    console.log(err);
    const response = {
      code: 401,
      status: "failed",
      msg: err.message || "Unauthorized",
    };

    // For HTTP requests
    if (res?.status) {
      return res.status(401).json(response);
    }

    // For Socket.IO requests
    const socketError = new Error(JSON.stringify(response));
    socketError.data = response;
    return next(socketError);
  }
};
