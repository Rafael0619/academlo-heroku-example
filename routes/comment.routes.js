const express = require("express");
const router = express.Router();

const {
  getAllComments,
  getCommentById,
  createNewComment,
} = require("../controllers/comment.controller");

router.get("/", getAllComments);

router.get("/:id", getCommentById);

router.post("/", createNewComment);

module.exports = { commentsRouter: router };
