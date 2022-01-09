"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uuidv1 = require("uuid/v1");
const { taskSchema } = require("./task.model");

const projectSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  updated_at: {
    type: Date,
    default: Date.now(),
  },
  status: {
    type: String,
    default: "pending",
  },
  tasks: {
    type: [taskSchema],
    default: [],
  },
  id: {
    type: String,
  },
});
projectSchema.pre("save", async function save(next) {
  try {
    if (!this.id) {
      this.id = uuidv1();
    }
    this.updated_at = Date.now();
    return next();
  } catch (error) {
    return next(error);
  }
});
module.exports = mongoose.model("Project", projectSchema);
