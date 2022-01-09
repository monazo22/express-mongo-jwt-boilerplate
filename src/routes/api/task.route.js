"use strict";
const express = require("express");
const router = express.Router();
const taskController = require("../../controllers/task.controller");
const auth = require("../../middlewares/authorization");

router.post("/:project_id", auth(), taskController.createTask);
router.get("/:project_id", auth(), taskController.getTasks);
router.get("/:project_id/:task_id", auth(), taskController.getTaskById);
router.put("/:project_id/:task_id", auth(), taskController.updateTask);
router.delete("/:project_id/:task_id", auth(), taskController.deleteTask);

module.exports = router;
