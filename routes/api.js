const express = require("express");
const apiRouter = express.Router();

//import and use auth router
const authRouter = require("./auth");
apiRouter.use("/auth", authRouter);

//import and use posts router
const postsRouter = require("./posts");
apiRouter.use("/posts", postsRouter);

//import and use users router
const usersRouter = require("./users");
apiRouter.use("/users", usersRouter);

module.exports = apiRouter;
