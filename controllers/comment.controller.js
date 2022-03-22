const { Comment } = require("../models/comment.model");
const { User } = require("../models/user.model");

exports.getAllComments = async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: { status: "Active" },
      include: { model: User },
    });

    res.status(200).json({
      status: "Success",
      data: { comments },
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getCommentById = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findOne({
      where: { status: "Active", id },
      include: [{ model: User }],
    });

    if (!comment) {
      res.status(404).json({
        status: "error",
        message: "Comment not found with the given Id",
      });
      return;
    }

    res.status(200).json({
      status: "Succes",
      data: {
        comment,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

exports.createNewComment = async (req, res) => {
  try {
    const { text, postId, userId } = req.body;
    const newComment = await Comment.create({
      text: text,
      postId: postId,
      userId: userId,
    });

    res.status(201).json({
      status: "Success",
      data: {
        newComment,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
