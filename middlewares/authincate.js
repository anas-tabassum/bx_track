const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");

const secret_key = "bx_track";

const authenticate = async (req, res, next) => {
  let token = "";
  if (req.header("Authorization")) {
    token = req.header("Authorization").replace("Bearer ", "");

    if (!token) {
      return res.status(401).send({ error: "Authentication required" });
    }
  }

  try {
    const decoded = jwt.verify(token, secret_key);
    const user = await UserModel.findById(decoded.id);
    if (!user) {
      throw new Error();
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Authentication failed" });
  }
};

module.exports = authenticate;
