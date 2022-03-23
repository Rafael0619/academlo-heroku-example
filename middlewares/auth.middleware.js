const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { promisify } = require("util");
const { AppError } = require("../util/appError");
const { User } = require("../models/user.model");
const { catchAsync } = require("../util/catchAsync");

dotenv.config({ path: "./config.env" });

exports.validateSession = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // Bearer idbfwienfioqefm0(token)

    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new AppError(401, "Invalid Session"));
  }

  //verifying token
  const decodedToken = await promisify(jwt.verify)(
    token,
    process.env.JWT_SECRET
  );

  const user = await User.findOne({
    where: { id: decodedToken.id, status: "Active" },
    attributes: { exclude: ["password"] },
  });

  if (!user) {
    return next(new AppError(401, "This user is not longer available"));
  }

  console.log(user);

  next();
});
