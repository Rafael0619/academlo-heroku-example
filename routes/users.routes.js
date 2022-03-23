const express = require("express");

const router = express.Router();

const {
  getAllUsers,
  getUserById,
  createNewUser,
  loginUser,
} = require("../controllers/users.controller");

const { validateSession } = require("../middlewares/auth.middleware");

router.get("/", validateSession, getAllUsers);

router.get("/:id", validateSession, getUserById);

router.post("/", createNewUser);

router.post("/login", loginUser);

module.exports = { usersRouter: router };
