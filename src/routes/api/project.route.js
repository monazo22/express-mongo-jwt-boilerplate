"use strict";
const express = require("express");
const router = express.Router();
const projectController = require("../../controllers/project.controller");
const auth = require("../../middlewares/authorization");

router.post("/", auth(), projectController.createProject);
router.get("/", auth(), projectController.getProjects);
router.get("/:id", auth(), projectController.getProjectById);
router.put("/:id", auth(), projectController.updateProject);
router.delete("/:id", auth(), projectController.deleteProject);

module.exports = router;
