const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const { fileterObj } = require("../util/filterObj");

const { User } = require("../models/user.model");
const { Post } = require("../models/post.model");
const { Comment } = require("../models/comment.model");
const { AppError } = require("../util/appError");

const { catchAsync } = require("../util/catchAsync");

dotenv.config({ path: "./config.env" });

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll({
    where: { status: "Active" },
    attributes: { exclude: ["password"] },
    include: [
      {
        model: Post,
        include: {
          model: Comment,
          include: [{ model: User, attributes: { exclude: ["password"] } }],
        },
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

  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({ name, email, password: hashedPassword });

  newUser.password = undefined;

  res.status(201).json({
    status: "success",
    data: { newUser },
  });
});

exports.loginUser = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email, status: "Active" } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError(404, "Credentials are invalid"));
  }

  const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRESIN,
  });

  res.status(200).json({
    status: "success",
    data: {
      token,
    },
  });
});

// const isPasswordValid = await bcrypt.compare(password, user.password);

// if (!isPasswordValid) {
//   return next(new AppError(400, "Credentials are invalid"));
// }
