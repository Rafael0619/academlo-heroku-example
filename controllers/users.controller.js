const req = require("express/lib/request");
const res = require("express/lib/response");
const { fileterObj } = require("../util/filterObj");
const { User } = require("../models/user.model");
const { Post } = require("../models/post.model");
const { Comment } = require("../models/comment.model");
const { catchAsync } = require("../util/catchAsync");
const { AppError } = require("../util/appError");

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll({
    where: { status: "Active" },
    include: [
      {
        model: Post,
        include: { model: Comment, include: [{ model: User }] },
      },
      { model: Comment, include: [{ model: Post }] },
    ],
  });
  res.status(200).json({
    status: "success",
    data: { users },
  });
});

exports.getUserById = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findOne({ where: { id: id } });

  if (!user) {
    return next(new AppError(404, "User not found"));
  }

  res.status(200).json({
    status: "success",
    data: { user },
  });
});

exports.createNewUser = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(
      new AppError(400, "Must provide a valid name, email and password")
    );
  }

  const newUser = await User.create({ name, email, password });

  res.status(201).json({
    status: "success",
    data: { newUser },
  });
});

exports.updateUser = (req, res) => {
  const { id } = req.params;
  const data = fileterObj(req.body, "name", "age");

  // const userIndex = users.findIndex((user) => user.id === +id);

  // if (!userIndex === -1) {
  //   res.status(404).json({
  //     status: "error",
  //     message: "User not found, Invalid ID",
  //   });
  //   return;
  // }

  // let updateUser = users[userIndex];

  // updateUser = { ...updateUser, ...data };

  // users[userIndex] = updateUser;

  res.status(204).json({
    status: "success",
  });
};

exports.deleteUser = (req, res) => {
  const { id } = req.params;

  // const userIndex = users.findIndex((user) => user.id === +id);

  // if (userIndex === -1) {
  //   res.status(404).json({
  //     status: "error",
  //     message: "couldnt delete user, invalid ID",
  //   });
  //   return;
  // }

  // users.splice(userIndex, 1);

  res.status(204).json({ status: "success" });
};
