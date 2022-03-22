const express = require("express");

const router = express.Router();

const {
  getAllUsers,
  getUserById,
  createNewUser,
  loginUser,
} = require("../controllers/users.controller");

router.get("/", getAllUsers);

router.get("/:id", getUserById);

router.post("/", createNewUser);

router.post("/login", loginUser);

module.exports = { usersRouter: router };
