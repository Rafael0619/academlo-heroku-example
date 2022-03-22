const { fileterObj } = require("../util/filterObj");
const { Post } = require("../models/post.model");
const { User } = require("../models/user.model");
const { Comment } = require("../models/comment.model");
const { catchAsync } = require("../util/catchAsync");
const { AppError } = require("../util/appError");

exports.getAllPosts = catchAsync(async (req, res, next) => {
  const postsDB = await Post.findAll({
    where: { status: "Active" },
    include: [{ model: Comment }],
  });

  res.status(200).json({
    status: "success",
    data: {
      posts: postsDB,
    },
  });
});

exports.getPostById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const post = await Post.findOne({
    where: {
      id: id,
      status: "Active",
    },
  });

  if (!post) {
    return next(new AppError(404, "Post not found with the given id"));
  }
  res.status(200).json({
    status: "success",
    data: {
      post,
    },
  });
});

exports.createPost = catchAsync(async (req, res, next) => {
  const { title, content, userId } = req.body;

  if (!title || !content || !userId) {
    return next(
      new AppError(404, "Must provide valid title, content and userId")
    );
  }

  const newPost = await Post.create({
    title: title,
    content: content,
    userId: userId,
  });

  res.status(201).json({ status: "success", data: { newPost } });
});

exports.updatePostPut = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { title, content, userId } = req.body;

  if (
    !title ||
    !content ||
    !userId ||
    title.length === 0 ||
    content.length === 0 ||
    userId.length === 0
  ) {
    return next(
      new AppError(
        400,
        "Must provide title, content and author for this request"
      )
    );
  }

  const post = await Post.findOne({ where: { id: id, status: "Active" } });

  if (!post) {
    return next(new AppError(404, "no post found by the given id"));
  }

  await post.update({
    title: title,
    content: content,
    userId: userId,
  });

  res.status(204).json({ status: "success" });
});

exports.updatePostPatch = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const data = fileterObj(req.body, "title", "content", "author");

  const post = await Post.findOne({ where: { id: id, status: "Active" } });

  if (!post) {
    return next(new AppError(404, "Cant update post, invalid ID"));
  }

  await post.update({ ...data });

  res.status(204).json({ status: "success" });
});

exports.deletePost = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const post = await Post.findOne({ where: { id: id } });

  if (!post) {
    return next(new AppError(404, "No delete post, ID doesnot exist"));
  }
  // DELETE FROM posts WHERE id = 1;
  // await post.destroy();

  await post.update({ status: "Deleted" });

  res.status(204).json({ status: "success" });
});
