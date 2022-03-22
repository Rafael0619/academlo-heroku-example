const express = require("express");
const router = express.Router();

const {
  getAllPosts,
  getPostById,
  createPost,
  updatePostPut,
  updatePostPatch,
  deletePost,
} = require("../controllers/posts.controller");

router.get("/", getAllPosts);

router.get("/:id", getPostById);

router.post("/", createPost);

router.put("/:id", updatePostPut);

router.patch("/:id", updatePostPatch);

router.delete("/:id", deletePost);

module.exports = { postRouter: router };
