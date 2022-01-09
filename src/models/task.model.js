"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uuidv1 = require("uuid/v1");

const taskSchema = new Schema({
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
  id: {
    type: String,
    unique: true,
  },
  active: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: "pending",
  },
  project_id: {
    type: Schema.Types.ObjectId,
  },
});
taskSchema.pre("save", async function save(next) {
  try {
    this.id = uuidv1();

    return next();
  } catch (error) {
    return next(error);
  }
});
module.exports.taskSchema = taskSchema;
module.exports = mongoose.model("Task", taskSchema);
