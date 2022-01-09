"use strict";

const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const config = require("../config");
const httpStatus = require("http-status");
const uuidv1 = require("uuid/v1");
const { getEmailFromToken } = require("../utils/utilsFns");
exports.register = async (req, res, next) => {
  try {
    const activationKey = uuidv1();
    const body = req.body;
    body.activationKey = activationKey;
    const user = new User(body);
    user.active = true;
    const savedUser = await user.save();
    res.status(httpStatus.CREATED);
    res.send(savedUser.transform());
  } catch (error) {
    return next(User.checkDuplicateEmailError(error));
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = await User.findAndGenerateToken(req.body);
    const payload = { sub: user.id, email: user.email };
    const token = jwt.sign(payload, config.secret, { expiresIn: "24h" });
    return res.json({ message: "OK", token: token });
  } catch (error) {
    next(error);
  }
};
const handleRefreshToken = (user) => {
  const payload = { sub: user.id, email: user.email };
  const token = jwt.sign(payload, config.secret, { expiresIn: "24h" });
  return { message: "OK", token: token };
};
exports.refreshToken = async (req, res, next) => {
  try {
    const email = getEmailFromToken(req);
    const user = await User.findOne({ email: email });
    const response = handleRefreshToken(user);
    return res.json(response);
  } catch (error) {
    next(error);
  }
};

exports.confirm = async (req, res, next) => {
  try {
    await User.findOneAndUpdate(
      { activationKey: req.query.key },
      { active: true }
    );
    return res.json({ message: "OK" });
  } catch (error) {
    next(error);
  }
};
