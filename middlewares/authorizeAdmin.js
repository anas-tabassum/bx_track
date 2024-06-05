const authorizeAdmin = (req, res, next) => {
  const user = req.user;
  if (!user || user.role !== "admin") {
    return res
      .status(403)
      .send({ error: "Forbidden: Only admins can access this resource" });
  }
  next();
};

module.exports = authorizeAdmin;
