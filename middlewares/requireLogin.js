const requireLogin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({ error: "You must login" });
  }
  next();
}
module.exports = requireLogin;
