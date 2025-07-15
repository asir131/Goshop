import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  try {
    const authHeader = req.headers?.authorization;
    const tokenFromHeader = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
    const token = req.cookies?.accessToken || tokenFromHeader;

    if (!token) {
      return res.status(401).json({
        message: "Token not provided",
        error: true,
        success: false,
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY_ACCESS_TOKEN);

    req.userId = decoded.id;
    next();

  } catch (e) {
    return res.status(401).json({
      message: "Unauthorized: " + (e.message || e),
      error: true,
      success: false
    });
  }
};

export default auth;
