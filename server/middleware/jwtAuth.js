const jwt = require('jsonwebtoken')

const jwtAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader;

    jwt.verify(token, process.env.SUPER_SECRET_ACCESS_TOKEN, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
}

module.exports = jwtAuth;