"use strict";
const Project = require("../models/project.model");
const httpStatus = require("http-status");
const { getEmailFromToken } = require("../utils/utilsFns");
const APIError = require("../utils/APIError");
const ObjectId = require("mongoose").Types.ObjectId;

exports.createProject = async function (req, res, next) {
  try {
    const project = new Project({ ...req.body, _id: new ObjectId() });
    await project.save();
    res.status(httpStatus.CREATED);
    res.send(project);
  } catch (error) {
    next(error);
  }
};
exports.updateProject = async function (req, res, next) {
  try {
    let project = await Project.findOneAndUpdate(
      { id: req.params.id },
      req.body
    );
    if (!project) {
      const error = new APIError("El proyecto no existe", httpStatus.NOT_FOUND);
      res.status(httpStatus.NOT_FOUND).send(error);
    }
    await project.save();
    res.status(httpStatus.OK);
    res.send(project);
  } catch (error) {
    next(error);
  }
};
exports.deleteProject = async function (req, res, next) {
  try {
    await Project.findByIdAndRemove(req.params.id);
    res.status(httpStatus.OK);
    res.send({ message: "El proyecto ha sido eliminado" });
  } catch (error) {
    next(error);
  }
};
exports.getProjects = async function (req, res, next) {
  try {
    const email = getEmailFromToken(req);
    let projects = await Project.find({ user_id: email, active: true });
    if (!projects) {
      projects = [];
    }
    res.status(httpStatus.OK);
    res.send(projects);
  } catch (error) {
    next(error);
  }
};
exports.getProjectById = async function (req, res, next) {
  try {
    let project = await Project.findOne({ id: req.params.id });
    if (!project) {
      const error = new APIError("El proyecto no existe", httpStatus.NOT_FOUND);
      res.status(httpStatus.NOT_FOUND).send(error);
    }
    res.status(httpStatus.OK);
    res.send(project);
  } catch (error) {
    next(error);
  }
};
