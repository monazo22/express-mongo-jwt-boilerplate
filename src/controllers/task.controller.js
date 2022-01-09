"use strict";
const Task = require("../models/task.model");
const httpStatus = require("http-status");
const Project = require("../models/project.model");

exports.createTask = async function (req, res, next) {
  try {
    const task = new Task(req.body);
    const project = await Project.findOne({ id: req.params.project_id });
    if (!project) {
      res.status(httpStatus.NOT_FOUND);
      res.send({ message: "El proyecto no existe" });
    }
    project.tasks.push(task);
    await project.save();
    res.status(httpStatus.CREATED);
    res.send(task);
  } catch (error) {
    next(error);
  }
};
exports.updateTask = async function (req, res, next) {
  try {
    const { project_id, task_id } = req.params;
    const project = await Project.findOne({ id: project_id });
    if (!project) {
      res.status(httpStatus.NOT_FOUND);
      res.send({ message: "El proyecto no existe" });
    }
    project.task.map((t) => {
      if (t._id.toString() === task_id) {
        t = req.body;
      }
      return t;
    });
    await project.save();
    res.status(httpStatus.OK);
    res.send(task);
  } catch (error) {
    next(error);
  }
};
exports.deleteTask = async function (req, res, next) {
  try {
    const { project_id, task_id } = req.params;
    const project = await Project.findOne({ id: project_id });
    if (!project) {
      res.status(httpStatus.NOT_FOUND);
      res.send({ message: "El proyecto no existe" });
    }
    project.tasks.filter((t) => t._id.toString() !== task_id);
    await project.save();
    res.status(httpStatus.OK);
    res.send(task);
  } catch (error) {
    next(error);
  }
};
exports.getTasks = async function (req, res, next) {
  try {
    const { project_id } = req.params;
    const project = await Project.findOne({ id: project_id });
    if (!project) {
      res.status(httpStatus.NOT_FOUND);
      res.send({ message: "El proyecto no existe" });
    }
    res.status(httpStatus.OK);
    res.send(project.tasks);
  } catch (error) {
    next(error);
  }
};
exports.getTaskById = async function (req, res, next) {
  try {
    const { project_id, task_id } = req.params;
    const project = await Project.findOne({ id: project_id });
    if (!project) {
      res.status(httpStatus.NOT_FOUND);
      res.send({ message: "El proyecto no existe" });
    }
    const task = project.tasks.find((t) => t._id.toString() === task_id);
    if (!task) {
      res.status(httpStatus.NOT_FOUND);
      res.send({ message: "La tarea no existe" });
    }
    res.status(httpStatus.OK);
    res.send(task);
  } catch (error) {
    next(error);
  }
};
