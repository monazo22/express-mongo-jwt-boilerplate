"use strict";
const express = require("express");
const router = express.Router();
const authRouter = require("./auth.route");
const taskRouter = require("./task.route");
const projectRouter = require("./project.route");
router.get("/status", (req, res) => {
  res.send({ status: "OK" });
}); // api status

router.use("/auth", authRouter); // mount auth paths
router.use("/task", taskRouter); // mount task paths
router.use("/project", projectRouter); // mount project paths
module.exports = router;
